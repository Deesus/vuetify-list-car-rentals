import Vuex from "vuex";
import Firebase from "firebase/app";
import "firebase/database";
import FIREBASE_SECRETS from "../SECRETS";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import * as CONST from "../src/appConstants";
import * as ACTION from "../src/store/typesActions";
import * as MUTATION from "../src/store/typesMutations";
import * as store from "../src/store";
import { cloneDeep } from "lodash";
import { actions } from "../src/store";


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

    // ---------- input filter mutations: ----------
    it("sets the 'Min Cost' list filter value to the user's value when the cost filter (lower bound) is committed", () => {
        expect(localStore.state.listFilterCostLowerBound).toBe(CONST.LIST_FILTER.COST_LOWER_BOUND_DEFAULT_VALUE);

        const NEW_VALUE = 500;
        localStore.commit(MUTATION.SET_LIST_FILTER_COST_LOWER_BOUND_VALUE, NEW_VALUE);
        expect(localStore.state.listFilterCostLowerBound).toBe(NEW_VALUE);
    });

    it("sets the 'Max Cost' list filter value to the user's value when the cost filter (upper bound) is committed", () => {
        expect(localStore.state.listFilterCostUpperBound).toBe(CONST.LIST_FILTER.COST_UPPER_BOUND_DEFAULT_VALUE);

        const NEW_VALUE = 1000;
        localStore.commit(MUTATION.SET_LIST_FILTER_COST_UPPER_BOUND_VALUE, NEW_VALUE);
        expect(localStore.state.listFilterCostUpperBound).toBe(NEW_VALUE);
    });

    it("sets the 'Car Model' list filter value to the user's value when the 'Car Model' filter is committed", () => {
        expect(localStore.state.listFilterCarModel).toBe('');

        const NEW_VALUE = 'Prius';
        localStore.commit(MUTATION.SET_LIST_FILTER_CAR_MODEL_VALUE, NEW_VALUE);
        expect(localStore.state.listFilterCarModel).toBe(NEW_VALUE);
    });

    it("sets the 'Location' list filter to the user's value when the 'Location' filter is committed", () => {
        expect(localStore.state.listFilterLocation).toBe('');

        const NEW_VALUE = 'Bangalore';
        localStore.commit(MUTATION.SET_LIST_FILTER_LOCATION_VALUE, NEW_VALUE);
        expect(localStore.state.listFilterLocation).toBe(NEW_VALUE);
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
});
