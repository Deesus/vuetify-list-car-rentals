import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import Firebase from 'firebase/app';
import 'firebase/database';

import VuexPersistence from 'vuex-persist';
import * as CONST from "../../appConstants";
import * as MUTATION from ".././typesMutations";
import * as ACTION from "../typesActions";
import FIREBASE_SECRETS from "../../../SECRETS";


// mock Firebase instance (same as actual instance):
let fbInstance = Firebase.initializeApp({
    apiKey:             FIREBASE_SECRETS.apiKey,
    authDomain:         FIREBASE_SECRETS.authDomain,
    databaseURL:        FIREBASE_SECRETS.databaseURL,
    projectId:          FIREBASE_SECRETS.projectId,
    storageBucket:      FIREBASE_SECRETS.storageBucket,
    messagingSenderId:  FIREBASE_SECRETS.messagingSenderId
}).database();



// ==================== exports: ====================
export const getters = {};


export const mutations = {
    [MUTATION.SET_LIST_FILTER_COST_LOWER_BOUND]: jest.fn(),
    [MUTATION.SET_LIST_INPUT_COST_UPPER_BOUND]: jest.fn(),
    [MUTATION.SET_LIST_INPUT_FILTER_CAR_MODEL]: jest.fn(),
    [MUTATION.SET_LIST_FILTER_LOCATION]: jest.fn(),
    [MUTATION.INSTANTIATE_FIREBASE]: jest.fn(),
    [MUTATION.UPDATE_TABLE_DATA]: jest.fn()
};


export const actions = {
    [ACTION.INSTANTIATE_FIREBASE]: jest.fn(),
    [ACTION.GET_INITIAL_DATA]: jest.fn(),
    [ACTION.SORT_BY_COLUMN]: jest.fn()
};


export const state = {
    limitResultsTo: CONST.FIREBASE.LIMIT_RESULTS_TO_DEFAULT_NUMBER,
    fbInstance: fbInstance,
    tableListItems: [
        {"id": "362dfbf0-ab4a-4827-bd1c-c2455f484ee3", "car_model": "Grand Prix Turbo", "car_model_year": 1990.0, "car_color": "Turquoise", "location_city": "Georgetown", "cost": 1646.93},
        {"id": "de56aa7f-011c-4f96-8da5-e84f3770d27e", "car_model": "Freelander", "car_model_year": 2008.0, "car_color": "Violet", "location_city": "Tigre", "cost": 1245.52},
        {"id": "da8a3366-aa1f-43d3-9225-2152dbd8067e", "car_model": "S6", "car_model_year": 2007.0, "car_color": "Puce", "location_city": "Australia Square", "cost": 1269.54},
        {"id": "85507de4-ebf6-49b4-9db9-5cbdf331a0f7", "car_model": "F150", "car_model_year": 2001.0, "car_color": "Goldenrod", "location_city": "Liufang", "cost": 1441.51},
        {"id": "4ecc0939-3d05-479e-88c6-c53672859b65", "car_model": "Venture", "car_model_year": 1997.0, "car_color": "Turquoise", "location_city": "Tawangrejo", "cost": 117.86}
    ],
    listFilterCostLowerBound: CONST.LIST_FILTER.COST_LOWER_BOUND_DEFAULT_VALUE,
    listFilterCostUpperBound: CONST.LIST_FILTER.COST_UPPER_BOUND_DEFAULT_VALUE,
    listFilterCarModel: '',
    listFilterLocation: ''
};


export function __createMocks(custom =
                                  {
                                      getters: {},
                                      mutations: {},
                                      actions: {},
                                      state: {}
                                  }) {
    const mockGetters = Object.assign({}, getters, custom.getters);
    const mockMutations = Object.assign({}, mutations, custom.mutations);
    const mockActions = Object.assign({}, actions, custom.actions);
    const mockState = Object.assign({}, state, custom.state);

    return {
        getters: mockGetters,
        mutations: mockMutations,
        actions: mockActions,
        state: mockState,
        store: new Vuex.Store({
            getters: mockGetters,
            mutations: mockMutations,
            actions: mockActions,
            state: mockState,
        }),
    };
}

export const store = __createMocks().store;
