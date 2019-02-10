import Vuex from "vuex";
import Firebase from "firebase/app";
import "firebase/database";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import * as CONST from "../../src/appConstants";
import * as ACTION from "../../src/store/typesActions";
import * as MUTATION from "../../src/store/typesMutations";
import * as store from "../../src/store";
import { cloneDeep } from "lodash";
import { actions } from "../../src/store";


describe('Vuex Store', () => {

    // ==================== setup: ====================
    const mockFirebaseInstance = {
        apiKey:      'my-api-key',
        authDomain:  'auth-123',
        databaseURL: 'https://mockurl',
    };
    let localStore;
    const storeConfig = {
        plugins:    store.plugins,
        getters:    store.getters,
        state:      store.state,
        mutations:  store.mutations,
        actions:    store.actions
    };


    // create Vue instance before each test:
    beforeEach( ()=> {
        const localVue = createLocalVue();
        localVue.use(Vuex);

        localStore = new Vuex.Store(cloneDeep(storeConfig));
    });


    // ==================== tests: ====================

    // ---------- pagination mutations: ----------
    it("sets the table's pagination values when user interacts with the table's controls", () => {
        const originalPaginationState = {
            paginationRowsPerPage:          localStore.state.paginationRowsPerPage,
            paginationSortBy:               localStore.state.paginationShouldSortDescending,
            paginationShouldSortDescending: localStore.state.paginationSortBy,
        };

        const updatedPaginationObj = {
            [CONST.PAGINATION_PROPERTY_NAME.ROWS_PER_PAGE]:             33,
            [CONST.PAGINATION_PROPERTY_NAME.SORT_BY]:                   'foobar',
            [CONST.PAGINATION_PROPERTY_NAME.SHOULD_SORT_DESCENDING]:    true,
        };

        localStore.commit(MUTATION.UPDATE_PAGINATION_SETTINGS, updatedPaginationObj);

        expect(localStore.state.paginationRowsPerPage)
            .toBe(updatedPaginationObj[CONST.PAGINATION_PROPERTY_NAME.ROWS_PER_PAGE]);

        expect(localStore.state.paginationSortBy)
            .toBe(updatedPaginationObj[CONST.PAGINATION_PROPERTY_NAME.SORT_BY]);

        expect(localStore.state.paginationShouldSortDescending)
            .toBe(updatedPaginationObj[CONST.PAGINATION_PROPERTY_NAME.SHOULD_SORT_DESCENDING]);

        expect(localStore.state.paginationRowsPerPage)
            .not.toBe(originalPaginationState.paginationRowsPerPage);

        expect(localStore.state.paginationShouldSortDescending)
            .not.toBe(originalPaginationState.paginationShouldSortDescending);

        expect(localStore.state.paginationSortBy)
            .not.toBe(originalPaginationState.paginationSortBy);
    });

    // ---------- input filter mutations: ----------
    it("sets the 'Min Cost' list filter value to the user's value when the cost filter (lower bound) is committed", () => {
        expect(localStore.state.listFilterCostLowerBound).toBe(CONST.LIST_FILTER.COST_LOWER_BOUND_DEFAULT_VALUE);

        const newValue = 500;
        localStore.commit(MUTATION.SET_LIST_FILTER_COST_LOWER_BOUND_VALUE, newValue);
        expect(localStore.state.listFilterCostLowerBound).toBe(newValue);
    });

    it("sets the 'Max Cost' list filter value to the user's value when the cost filter (upper bound) is committed", () => {
        expect(localStore.state.listFilterCostUpperBound).toBe(CONST.LIST_FILTER.COST_UPPER_BOUND_DEFAULT_VALUE);

        const newValue = 1000;
        localStore.commit(MUTATION.SET_LIST_FILTER_COST_UPPER_BOUND_VALUE, newValue);
        expect(localStore.state.listFilterCostUpperBound).toBe(newValue);
    });

    it("sets the 'Car Model' list filter value to the user's value when the 'Car Model' filter is committed", () => {
        expect(localStore.state.listFilterCarModel).toBe('');

        const newValue = 'Prius';
        localStore.commit(MUTATION.SET_LIST_FILTER_CAR_MODEL_VALUE, newValue);
        expect(localStore.state.listFilterCarModel).toBe(newValue);
    });

    it("sets the 'Location' list filter to the user's value when the 'Location' filter is committed", () => {
        expect(localStore.state.listFilterLocation).toBe('');

        const newValue = 'Bangalore';
        localStore.commit(MUTATION.SET_LIST_FILTER_LOCATION_VALUE, newValue);
        expect(localStore.state.listFilterLocation).toBe(newValue);
    });

    // ---------- database mutations: ----------
    // TODO: add test for INSTANTIATE_FIREBASE mutation

    it("updates the Data Table's list items when a list of data is committed", () => {
        expect(localStore.state.tableListItems).toEqual([]);

        const mockList = [
                {
                    "id": "362dfbf0-ab4a-4827-bd1c-c2455f484ee3",
                    "car_model": "Grand Prix Turbo",
                    "car_model_year": 1990.0,
                    "car_color": "Turquoise",
                    "location_city": "Georgetown",
                    "cost": 1646.93
                },
                {
                    "id": "de56aa7f-011c-4f96-8da5-e84f3770d27e",
                    "car_model": "Freelander",
                    "car_model_year": 2008.0,
                    "car_color": "Violet",
                    "location_city": "Tigre",
                    "cost": 1245.52
                },
                {
                    "id": "4ecc0939-3d05-479e-88c6-c53672859b65",
                    "car_model": "Venture",
                    "car_model_year": 1997.0,
                    "car_color": "Turquoise",
                    "location_city": "Tawangrejo",
                    "cost": 117.86
                }
        ];

        localStore.commit(MUTATION.UPDATE_TABLE_DATA, mockList);
        expect(localStore.state.tableListItems).toEqual(mockList);
    });

    it("initializes a new Firebase instance when new instance is committed", () => {
        localStore.commit(MUTATION.INSTANTIATE_FIREBASE, mockFirebaseInstance);
        expect(localStore.state.fbInstance).toEqual(mockFirebaseInstance);
    });

    it("should asynchronously commit a new Firebase instance", async () => {
        // n.b. if action `INSTANTIATE_FIREBASE` is dispatched, then the mutation `INSTANTIATE_FIREBASE` will be called as well
        const commit = jest.fn();

        await actions[ACTION.INSTANTIATE_FIREBASE]({ commit });
        expect(commit).toBeCalled();
    });

    // ---------- database mutations: ----------
    it("sets the selected item to store when committed", () => {
        const newValue = { car_model: 'Bronco', car_color: 'red', location_city: 'Omsk' };

        expect(localStore.state.selectedItem).toBe(null);
        localStore.commit(MUTATION.SET_SELECTED_ITEM, newValue);
        expect(localStore.state.selectedItem).toEqual(newValue);
    });
});
