<template>
    <v-container sm12 class="pt-0">

        <!-- ==================== splash image: ==================== -->
        <v-img :src="backgroundImgPath" height="280" />


        <!-- ==================== filter panel: ==================== -->
        <v-layout justify-center>
            <v-flex sm11>
                <div class="filter-panel pa-4 red darken-1">
                    <v-layout row>
                        <v-text-field label="Car Model"
                                      solo
                                      flat
                                      dark
                                      color="white"
                                      background-color="red lighten-1"
                                      append-icon="search"
                                      v-model="$store.state.listFilterCarModel"
                                      @input="handleSearchFilterCarModelChanged">
                        </v-text-field>

                        <v-spacer/>

                        <v-text-field label="Location (City)"
                                      solo
                                      flat
                                      dark
                                      color="white"
                                      background-color="red lighten-1"
                                      append-icon="search"
                                      v-model="$store.state.listFilterLocation"
                                      @input="handleSearchFilterCarLocationChanged">
                        </v-text-field>

                        <v-spacer/>

                        <v-text-field label="Min Cost"
                                      solo
                                      flat
                                      dark
                                      color="white"
                                      background-color="red lighten-1"
                                      v-model="$store.state.listFilterCostLowerBound"
                                      @input="handleFilterCarCostLowerBoundChanged">
                        </v-text-field>

                        <v-spacer/>

                        <v-text-field label="Max Cost"
                                      solo
                                      flat
                                      dark
                                      color="white"
                                      background-color="red lighten-1"
                                      v-model="$store.state.listFilterCostUpperBound"
                                      @input="handleFilterCarCostUpperBoundChanged">
                        </v-text-field>
                    </v-layout>
                </div>
            </v-flex>
        </v-layout>


        <!-- ==================== data table: ==================== -->
        <v-layout row nowrap>
            <v-flex sm12>
                <v-data-table
                        v-bind:pagination.sync="pagination"
                        @update:pagination="handlePaginationUpdate"
                        class="elevation-2"
                        :headers="headers"
                        :items="$store.state.tableListItems"
                        :search="filters"
                        :custom-filter="customFilters">

                    <!-- ---------- each row in table: ---------- -->
                    <template class="table-row" slot="items" slot-scope="props">
                        <td @click="handleListRowClick(props.item)">
                            {{ props.item.car_model }}
                        </td>
                        <td @click="handleListRowClick(props.item)">
                            {{ props.item.car_model_year }}
                        </td>
                        <td @click="handleListRowClick(props.item)">
                            {{ props.item.location_city }}
                        </td>
                        <td @click="handleListRowClick(props.item)">
                            ${{ props.item.cost }}
                        </td>
                    </template>

                </v-data-table>
            </v-flex>
        </v-layout>


    </v-container>
</template>


<script>
    import * as CONST from '../appConstants';
    import * as ACTION from '../store/typesActions';
    import * as MUTATION from '../store/typesMutations';
    import MultiFilters from '../utils/MultiFilters';
    import { searchFilterFindByKeyword } from '../utils/utils';
    import { filterCostByUpperBound, filterCostByLowerBound } from '../utils/filterFunctions';


    export default {
        data() {
            return {
                // n.b. we can't directly set the splash image path on the img tag without encountering an error, so we set image path as a state:
                backgroundImgPath: CONST.IMG_PATH.SPLASH_BACKGROUND,

                // table's pagination settings' default values:
                pagination: {
                    [CONST.PAGINATION_PROPERTY_NAME.SORT_BY]:                 this.$store.state.paginationSortBy,
                    [CONST.PAGINATION_PROPERTY_NAME.SHOULD_SORT_DESCENDING]:  this.$store.state.paginationShouldSortDescending,
                    [CONST.PAGINATION_PROPERTY_NAME.ROWS_PER_PAGE]:           this.$store.state.paginationRowsPerPage
                },

                // text field input filters' default values:
                filters: {
                    // TODO: map Vuex state to getters/computed properties:
                    [CONST.LIST_FILTER.FILTER_CAR_MODEL]:        this.$store.state.listFilterCarModel,
                    [CONST.LIST_FILTER.FILTER_CAR_MODEL_YEAR]:   '',
                    [CONST.LIST_FILTER.FILTER_LOCATION]:         this.$store.state.listFilterLocation,
                    [CONST.LIST_FILTER.FILTER_COST_LOWER_BOUND]: this.$store.state.listFilterCostLowerBound,
                    [CONST.LIST_FILTER.FILTER_COST_UPPER_BOUND]: this.$store.state.listFilterCostUpperBound
                },

                // table header settings:
                headers: [
                    {
                        value: CONST.DATA_ITEM_PROPERTY.CAR_MODEL,
                        text: 'Car Model',
                        align: 'left',
                        sortable: true,
                        class: 'list-table-header'
                    },
                    {
                        value: CONST.DATA_ITEM_PROPERTY.CAR_MODEL_YEAR,
                        text: 'Model Year',
                        align: 'left',
                        sortable: true
                    },
                    {
                        value: CONST.DATA_ITEM_PROPERTY.LOCATION,
                        text: 'Location (City)',
                        align: 'left',
                        sortable: true
                    },
                    {
                        value: CONST.DATA_ITEM_PROPERTY.COST,
                        text: 'Cost',
                        align: 'left',
                        sortable: true
                    }
                ]
            };
        },


        methods: {
            /**
             * Defines how custom search filters for the data tables work.
             * See <https://vuetifyjs.com/en/components/data-tables>
             */
            customFilters(items, filters, filter, headers) {

                // ---------- instantiate MultiFilter class: ----------
                const cf = new MultiFilters(items, filters, filter, headers);

                // ---------- register filters: ----------
                cf.registerFilter(CONST.LIST_FILTER.FILTER_CAR_MODEL,
                    (searchTerm, items) => searchFilterFindByKeyword(searchTerm, items, CONST.DATA_ITEM_PROPERTY.CAR_MODEL)
                );

                cf.registerFilter(CONST.LIST_FILTER.FILTER_LOCATION,
                    (searchTerm, items) => searchFilterFindByKeyword(searchTerm, items, CONST.DATA_ITEM_PROPERTY.LOCATION)
                );

                cf.registerFilter(CONST.LIST_FILTER.FILTER_COST_LOWER_BOUND, filterCostByLowerBound);

                cf.registerFilter(CONST.LIST_FILTER.FILTER_COST_UPPER_BOUND, filterCostByUpperBound);

                // ---------- execute filters: ----------
                // execute all filters in the order they were defined:
                return cf.runFilters();
            },

            /**
             * Search filter callback for car Model field.
             */
            handleSearchFilterCarModelChanged(val) {
                this.$store.commit(MUTATION.SET_LIST_FILTER_CAR_MODEL_VALUE, val);
                this.filters = MultiFilters.updateFilters(this.filters, { [CONST.LIST_FILTER.FILTER_CAR_MODEL]: val });
            },

            /**
             * Search filter callback for car Location field.
             */
            handleSearchFilterCarLocationChanged(val) {
                this.$store.commit(MUTATION.SET_LIST_FILTER_LOCATION_VALUE, val);
                this.filters = MultiFilters.updateFilters(this.filters, { [CONST.LIST_FILTER.FILTER_LOCATION]: val });
            },

            /**
             * Handler for filtering for min-cost (i.e. lower-bound) for the car Cost field.
             */
            handleFilterCarCostLowerBoundChanged(val) {
                this.$store.commit(MUTATION.SET_LIST_FILTER_COST_LOWER_BOUND_VALUE, val);
                this.filters = MultiFilters.updateFilters(this.filters, { [CONST.LIST_FILTER.FILTER_COST_LOWER_BOUND]: val });
            },

            /**
             * Handler for filtering for max-cost (i.e. upper-bound) for the car Cost field.
             */
            handleFilterCarCostUpperBoundChanged(val) {
                this.$store.commit(MUTATION.SET_LIST_FILTER_COST_UPPER_BOUND_VALUE, val);
                this.filters = MultiFilters.updateFilters(this.filters, { [CONST.LIST_FILTER.FILTER_COST_UPPER_BOUND]: val });
            },


            /**
             * Handler for when user clicks a row/entry on the table; route to details page.
             */
            handleListRowClick(item) {
                this.$store.commit(MUTATION.SET_SELECTED_ITEM, item);
                this.$router.push({
                    name: 'detail',
                    params: { id: item.id }
                });
            },

            /**
             * Handler for Data Table's pagination onChange; stores sort, sort-direction, and rows-per-page in local store.
             */
            handlePaginationUpdate(paginationObject) {
                this.$store.commit(MUTATION.UPDATE_PAGINATION_SETTINGS, paginationObject);
            }
        },


        mounted() {
            // ---------- fetch data: ----------

            // we can't have more than one connection Firebase's server;
            // thus, only fetch data if a Firebase instance doesn't already exist:
            if (!this.$store.state.fbInstance) {

                this.$store
                // establish Firebase connection:
                    .dispatch(ACTION.INSTANTIATE_FIREBASE)

                    // get initial data:
                    .then( () => {
                        this.$store.dispatch(ACTION.GET_INITIAL_DATA);
                    });
            }
        }
    }
</script>
