import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


import VuexPersistence from 'vuex-persist';
import * as CONST from "../../appConstants";
import * as MUTATION from ".././typesMutations";
import * as ACTION from "../typesActions";


// the actual Firebase instance returns an object and creates a websocket connection (requires an internet connection);
// since we don't want to rely on internet connections, for our mock, we'll return a mock object
const fbInstance = {
    apiKey:             'my-api-key',
    authDomain:         'auth-123',
    databaseURL:        'https://mockurl',
    projectId:          'id-abc',
    storageBucket:      'bucket-1',
    messagingSenderId:  'sender-id-dee'
};

const tableListItems = [
    {id: "362dfbf0-ab4a-4827-bd1c-c2455f484ee3", car_model: "Grand Prix Turbo", car_model_year: "1990", car_color: "Turquoise", location_city: "Georgetown", cost: "1646.93"},
    {id: "de56aa7f-011c-4f96-8da5-e84f3770d27e", car_model: "Freelander", car_model_year: "2008", car_color: "Violet", location_city: "Tigre", cost: "1245.52"},
    {id: "da8a3366-aa1f-43d3-9225-2152dbd8067e", car_model: "S6", car_model_year: "2007", car_color: "Puce", location_city: "Australia Square", cost: "1269.54"},
    {id: "85507de4-ebf6-49b4-9db9-5cbdf331a0f7", car_model: "F150", car_model_year: "2001", car_color: "Goldenrod", location_city: "Liufang", cost: "1441.51"},
    {id: "4ecc0939-3d05-479e-88c6-c53672859b65", car_model: "Venture", car_model_year: "1997", car_color: "Turquoise", location_city: "Tawangrejo", cost: "117.86"}
];


// ==================== exports: ====================
export const getters = {};


export const mutations = {
    [MUTATION.SET_LIST_FILTER_COST_LOWER_BOUND_VALUE]: jest.fn(),
    [MUTATION.SET_LIST_FILTER_COST_UPPER_BOUND_VALUE]: jest.fn(),
    [MUTATION.SET_LIST_FILTER_CAR_MODEL_VALUE]: jest.fn(),
    [MUTATION.SET_LIST_FILTER_LOCATION_VALUE]: jest.fn(),
    [MUTATION.INSTANTIATE_FIREBASE]: jest.fn(),
    [MUTATION.UPDATE_TABLE_DATA]: jest.fn()
};


export const actions = {
    [ACTION.INSTANTIATE_FIREBASE]: jest.fn(),
    [ACTION.GET_INITIAL_DATA]: jest.fn()
};


export const state = {
    fbInstance: null,
    tableListItems: [],
    selectedItem:   tableListItems[0],
    listFilterCostLowerBound: CONST.LIST_FILTER.COST_LOWER_BOUND_DEFAULT_VALUE,
    listFilterCostUpperBound: CONST.LIST_FILTER.COST_UPPER_BOUND_DEFAULT_VALUE,
    listFilterCarModel: '',
    listFilterLocation: '',
    limitResultsTo: 25
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
