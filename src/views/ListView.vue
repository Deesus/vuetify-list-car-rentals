<template>
    <v-container>

        <v-layout row wrap>
            <v-flex xs12 sm6 md3>
                <v-text-field label="Car Model"
                              box
                              append-icon="search"
                              v-model="$store.state.listFilterCarModel"
                              @input="handleSearchFilterCarModelChanged"
                ></v-text-field>

                <v-text-field label="Location (City)"
                              box
                              append-icon="search"
                              v-model="$store.state.listFilterLocation"
                              @input="handleSearchFilterCarLocationChanged"
                ></v-text-field>

                <v-text-field label="Min Cost"
                              box
                              v-model="$store.state.listFilterCostLowerBound"
                              @input="handleFilterCarCostLowerBoundChanged"
                ></v-text-field>

                <v-text-field label="Max Cost"
                              box
                              v-model="$store.state.listFilterCostUpperBound"
                              @input="handleFilterCarCostUpperBoundChanged"
                ></v-text-field>
            </v-flex>
        </v-layout>


        <v-layout row nowrap>
            <v-data-table
                    v-bind:pagination.sync="pagination"
                    @update:pagination="handlePaginationUpdate"
                    class="elevation-2"
                    :headers="headers"
                    :items="$store.state.tableListItems"
                    :search="filters"
                    :custom-filter="customFilters"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.car_model }}</td>
                    <td>{{ props.item.car_model_year }}</td>
                    <td>{{ props.item.car_color }}</td>
                    <td>{{ props.item.location_city }}</td>
                    <td>{{ props.item.cost }}</td>
                </template>
            </v-data-table>
        </v-layout>

    </v-container>
</template>


<script>
    import * as CONST from '../appConstants';
    import * as ACTION from '../store/typesActions';
    import * as MUTATION from '../store/typesMutations';
    import MultiFilters from '../utils/MultiFilters';
    import { searchFilterFindByKeyword, inputIsValidNumber } from '../utils/functions';


    export default {
        data() {
            return {
                pagination: {
                    [CONST.PAGINATION_PROPERTY_NAME.SORT_BY]:                 this.$store.state.paginationSortBy,
                    [CONST.PAGINATION_PROPERTY_NAME.SHOULD_SORT_DESCENDING]:  this.$store.state.paginationShouldSortDescending,
                    [CONST.PAGINATION_PROPERTY_NAME.ROWS_PER_PAGE]:           this.$store.state.paginationRowsPerPage
                },

                filters: {
                    // TODO: map Vuex state to getters/computed properties:
                    [CONST.LIST_FILTER.FILTER_CAR_MODEL]:        this.$store.state.listFilterCarModel,
                    [CONST.LIST_FILTER.FILTER_CAR_MODEL_YEAR]:   '',
                    [CONST.LIST_FILTER.FILTER_CAR_COLOR]:        '',
                    [CONST.LIST_FILTER.FILTER_LOCATION]:         this.$store.state.listFilterLocation,
                    [CONST.LIST_FILTER.FILTER_COST_LOWER_BOUND]: this.$store.state.listFilterCostLowerBound,
                    [CONST.LIST_FILTER.FILTER_COST_UPPER_BOUND]: this.$store.state.listFilterCostUpperBound
                },

                headers: [
                    {
                        value: CONST.DATA_ITEM_PROPERTY.CAR_MODEL,
                        text: 'Car Model',
                        align: 'left',
                        sortable: true
                    },
                    {
                        value: CONST.DATA_ITEM_PROPERTY.CAR_MODEL_YEAR,
                        text: 'Model Year',
                        align: 'left',
                        sortable: true
                    },
                    {
                        value: CONST.DATA_ITEM_PROPERTY.CAR_COLOR,
                        text: 'Color',
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

                cf.registerFilter(CONST.LIST_FILTER.FILTER_COST_LOWER_BOUND, (lowerBound, items) => {
                    // TODO: prevent non number input values

                    return items.filter( (item) => {
                        return lowerBound <= item.cost;
                    });
                });

                cf.registerFilter(CONST.LIST_FILTER.FILTER_COST_UPPER_BOUND, (userInputUpperBound, items) => {
                    // if user input is a number, then filter list:
                    if (inputIsValidNumber(userInputUpperBound) === true) {
                        items = items.filter( (item) => {
                            return userInputUpperBound >= item.cost;
                        });
                    }

                    return items;
                });

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
             * Handler for Data Table's pagination onChange; stores sort, sort-direction, and rows-per-page in local store;
             */
            handlePaginationUpdate(paginationObject) {
                this.$store.commit(MUTATION.UPDATE_PAGINATION_SETTINGS, paginationObject);
            }
        },

        mounted() {
            // ---------- fetch data: ----------
            this.$store
                // establish Firebase connection:
                .dispatch(ACTION.INSTANTIATE_FIREBASE)

                // get initial data:
                .then( () => {
                    this.$store.dispatch(ACTION.GET_INITIAL_DATA);
                });
        }
    }
</script>
