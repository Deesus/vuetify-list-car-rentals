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
                                      v-model="filters.listFilterCarModel"
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
                                      v-model="filters.listFilterLocation"
                                      @input="handleSearchFilterCarLocationChanged">
                        </v-text-field>

                        <v-spacer/>

                        <v-text-field label="Min Cost"
                                      solo
                                      flat
                                      dark
                                      color="white"
                                      background-color="red lighten-1"
                                      v-model="filters.listFilterCostLowerBound"
                                      @input="handleFilterCarCostLowerBoundChanged">
                        </v-text-field>

                        <v-spacer/>

                        <v-text-field label="Max Cost"
                                      solo
                                      flat
                                      dark
                                      color="white"
                                      background-color="red lighten-1"
                                      v-model="filters.listFilterCostUpperBound"
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
                        :items="filteredItems">

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
    import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';


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
            ...mapMutations({
                handleSearchFilterCarModelChanged:    MUTATION.SET_LIST_FILTER_CAR_MODEL_VALUE,
                handleSearchFilterCarLocationChanged: MUTATION.SET_LIST_FILTER_LOCATION_VALUE,
                handleFilterCarCostLowerBoundChanged: MUTATION.SET_LIST_FILTER_COST_LOWER_BOUND_VALUE,
                handleFilterCarCostUpperBoundChanged: MUTATION.SET_LIST_FILTER_COST_UPPER_BOUND_VALUE,
                handlePaginationUpdate:               MUTATION.UPDATE_PAGINATION_SETTINGS
            }),

            ...mapActions({
                initializeFirebase: ACTION.INSTANTIATE_FIREBASE,
                getInitialData:     ACTION.GET_INITIAL_DATA
            }),

            /**
             * Handler for when user clicks a row/entry on the table; route to details page.
             */
            handleListRowClick(item) {
                this.$store.commit(MUTATION.SET_SELECTED_ITEM, item);
                this.$router.push({
                    name: 'detail',
                    params: { id: item.id }
                });
            }
        },


        computed: {
            ...mapGetters({
                filters: 'getFilters',      // text field input filters' default values
            }),

            ...mapState([
                'fbInstance',
                'tableListItems'
            ]),

            /**
             * Filters the data-table's list by the input input filters.
             */
            filteredItems() {
                const filterCostLowerBound  = this.filters.listFilterCostLowerBound;
                const filterCostUpperBound  = this.filters.listFilterCostUpperBound;
                const filterCarModel        = this.filters.listFilterCarModel;
                const filterLocation        = this.filters.listFilterLocation;

                return this.tableListItems
                    .filter( (item) => {
                        // compare item's cost to lower cost bound; if lower cost bound is empty string always return true:
                        const shouldFilterItemByLowerBoundCost = (filterCostLowerBound === '') ||
                                                                 (item.cost >= parseFloat(filterCostLowerBound));

                        // compare item's cost to upper cost bound; if upper cost bound is empty string always return true:
                        const shouldFilterItemByUpperBoundCost = (filterCostUpperBound === '') ||
                                                                 (item.cost <= parseFloat(filterCostUpperBound));

                        // set to true if search term is found in item:
                        const shouldFilterItemByCarModel = item.car_model
                                                               .toLowerCase()
                                                               .indexOf(filterCarModel.toLowerCase()) !== -1;

                        // set to true if search term is found in item:
                        const shouldFilterItemByLocation = item.location_city
                                                               .toLowerCase()
                                                               .indexOf(filterLocation.toLowerCase()) !== -1;


                        // combine and return the boolean values for the `.filter()` method:
                        return shouldFilterItemByLowerBoundCost && shouldFilterItemByUpperBoundCost && shouldFilterItemByCarModel && shouldFilterItemByLocation;
                    });
            },
        },


        mounted() {
            // ---------- fetch data: ----------
            // establish Firebase connection then get initial data:
            //
            // we can't have more than one connection Firebase's server;
            // thus, only fetch data if a Firebase instance doesn't already exist:
            if (!this.fbInstance) {
                this.initializeFirebase()
                .then( () => {
                    this.getInitialData();
                });
            }

        }
    }
</script>
