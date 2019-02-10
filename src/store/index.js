import Vue from 'vue';
import Vuex from 'vuex';
import Firebase from 'firebase/app';
import 'firebase/database';
import { inputIsValidNumber } from "../utils/utils";
import VuexPersistence from 'vuex-persist';
import * as CONST from "../appConstants";
import * as MUTATION from "./typesMutations";
import * as ACTION from "./typesActions";



Vue.use(Vuex);

// initialize plugin for Vuex local storage:
const vuexLocalStorage = new VuexPersistence({
    // name (key) of local storage:
    key: 'vuexFilterSettings',
    storage: window.localStorage,
    // we persist filters, pagination settings, and the selected item (but not entire table list or Firebase instance):
    reducer: (state) => {
        return {
            listFilterCostLowerBound:       state.listFilterCostLowerBound,
            listFilterCostUpperBound:       state.listFilterCostUpperBound,
            listFilterCarModel:             state.listFilterCarModel,
            listFilterLocation:             state.listFilterLocation,

            paginationRowsPerPage:          state.paginationRowsPerPage,
            paginationShouldSortDescending: state.paginationShouldSortDescending,
            paginationSortBy:               state.paginationSortBy,

            selectedItem:                   state.selectedItem
        };
    }
});


// We have both named exports and default exports in order to properly mock Vuex for unit testing. See Vuex docs.

export const plugins = [vuexLocalStorage.plugin];


export const getters = {
    getFilters(state) {
        return {
            listFilterCostLowerBound:   state.listFilterCostLowerBound,
            listFilterCostUpperBound:   state.listFilterCostUpperBound,
            listFilterCarModel:         state.listFilterCarModel,
            listFilterLocation:         state.listFilterLocation
        };
    }
};


export const state = {
    fbInstance:     null,   // Firebase instance
    tableListItems: [],     // database list of items/cars
    selectedItem:   null,   // selected item/car

    // ---------- filter states: ----------
    listFilterCostLowerBound: CONST.LIST_FILTER.COST_LOWER_BOUND_DEFAULT_VALUE,
    listFilterCostUpperBound: CONST.LIST_FILTER.COST_UPPER_BOUND_DEFAULT_VALUE,
    listFilterCarModel: '',
    listFilterLocation: '',

    // ---------- pagination states: ----------
    paginationRowsPerPage:          25,
    paginationShouldSortDescending: false,
    paginationSortBy:               CONST.DATA_ITEM_PROPERTY.CAR_MODEL
};


export const mutations = {
    // ---------- filter related mutations: ----------
    [MUTATION.SET_LIST_FILTER_COST_LOWER_BOUND_VALUE](state, val) {
        // if user input is a number, set state; otherwise, do nothing:
        if (inputIsValidNumber(val) === true){
            state.listFilterCostLowerBound = val;
        }
        else {
            state.listFilterCostLowerBound = "";
        }
    },

    [MUTATION.SET_LIST_FILTER_COST_UPPER_BOUND_VALUE](state, val) {
        // if user input is a number, set state; otherwise, do nothing:
        if (inputIsValidNumber(val) === true) {
            state.listFilterCostUpperBound = val;
        }
        else {
            state.listFilterCostUpperBound = "";
        }
    },

    [MUTATION.SET_LIST_FILTER_CAR_MODEL_VALUE](state, val) {
        // only set state if user input is not an empty string:
        const trimmedValue = val.trim();

        if (trimmedValue !== '') {
            state.listFilterCarModel = val;
        }
        else {
            state.listFilterCarModel = "";
        }
    },

    [MUTATION.SET_LIST_FILTER_LOCATION_VALUE](state, val) {
        // only set state if user input is not an empty string:
        const trimmedValue = val.trim();

        if (trimmedValue !== '') {
            state.listFilterLocation = val;
        }
        else {
            state.listFilterLocation = "";
        }
    },

    /**
     * Saves data-table's pagination state; stores sort, sort-direction, and rows-per-page in local store.
     * This mutation is typically used as a event callback.
     *
     * @param state
     * @param paginationObject {Object}
     */
    [MUTATION.UPDATE_PAGINATION_SETTINGS](state, paginationObject) {
        // update only the properties we care about:
        state.paginationRowsPerPage             = paginationObject[CONST.PAGINATION_PROPERTY_NAME.ROWS_PER_PAGE];
        state.paginationShouldSortDescending    = paginationObject[CONST.PAGINATION_PROPERTY_NAME.SHOULD_SORT_DESCENDING];
        state.paginationSortBy                  = paginationObject[CONST.PAGINATION_PROPERTY_NAME.SORT_BY];
    },

    // ---------- database mutations: ----------
    /**
     * Opens a new Firebase connection and sets instance to Vuex state.
     *
     * @param state
     * @param firebaseInstance {Object}: a new Firebase instance.
     */
    [MUTATION.INSTANTIATE_FIREBASE](state, firebaseInstance) {
        state.fbInstance = firebaseInstance;
    },

    /**
     *
     *
     * @param state
     * @param tableData {Array};
     */
    [MUTATION.UPDATE_TABLE_DATA](state, tableData) {
        state.tableListItems = tableData;
    },

    // ---------- misc. mutations: ----------
    [MUTATION.SET_SELECTED_ITEM](state, val) {
        state.selectedItem = val;
    }
};


export const actions = {
    /**
     * Creates a new Firebase instance and saves into Vuex store.
     *
     * @param commit
     */
    [ACTION.INSTANTIATE_FIREBASE]({commit}) {
        // TODO: do check for if fbInstance already exists
        const fb = Firebase.initializeApp(CONST.FIREBASE.API_KEY).database();

        commit(MUTATION.INSTANTIATE_FIREBASE, fb);
    },

    /**
     * Gets initial data from Firebase db and saves into Vuex store.
     *
     * @param commit
     * @param state
     */
    [ACTION.GET_INITIAL_DATA]({commit, state}) {
        state.fbInstance
            .ref(CONST.FIREBASE.REFERENCE_NODE)
            .once('value')
            .then((snapshot) => {
                let tableDataJSON = snapshot.val();

                // convert data to array of entries (removing the redundant, top-level id/key from resulting array):
                let arr = [];
                for (const [key, val] of Object.entries(tableDataJSON)) {
                    arr.push(val);
                }

                commit(MUTATION.UPDATE_TABLE_DATA, arr);
            })
            .catch((error) => {
                // TODO: gracefully handle error
            });
    }
};


export default new Vuex.Store({
    plugins,
    getters,
    state,
    mutations,
    actions
});
