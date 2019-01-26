import Vue from 'vue';
import Vuex from 'vuex';
import Firebase from 'firebase/app';
import 'firebase/database';

import VuexPersistence from 'vuex-persist';
import * as CONST from "../appConstants";
import * as MUTATION from "./typesMutations";
import * as ACTION from "./typesActions";
import FIREBASE_SECRETS from "../../SECRETS";



Vue.use(Vuex);

// initialize plugin for Vuex local storage:
const vuexLocalStorage = new VuexPersistence({
    // name (key) of local storage:
    key: 'vuexFilterSettings',
    storage: window.localStorage,
    // we persist only user filters:
    reducer: (state) => {
        return {
            listFilterCostLowerBound: state.listFilterCostLowerBound,
            listFilterCostUpperBound: state.listFilterCostUpperBound,
            listFilterCarModel: state.listFilterCarModel,
            listFilterLocation: state.listFilterLocation
        };
    }
});


// ==================== exports: ====================
// We have both named exports and default exports in order to properly mock Vuex for unit testing. See Vuex docs.

export const plugins = [vuexLocalStorage.plugin];


export const getters = {};


export const state = {
    limitResultsTo: CONST.FIREBASE.LIMIT_RESULTS_TO_DEFAULT_NUMBER, // TODO: currently `limitResultsTo` is unused; delete property?
    fbInstance: null,
    tableListItems: [],

    // ---------- filter states: ----------
    listFilterCostLowerBound: CONST.LIST_FILTER.COST_LOWER_BOUND_DEFAULT_VALUE,
    listFilterCostUpperBound: CONST.LIST_FILTER.COST_UPPER_BOUND_DEFAULT_VALUE,
    listFilterCarModel: '',
    listFilterLocation: '',
    // TODO: add sort direction
    // TODO: add rows-per-page
};


export const mutations = {
    // ---------- filter related mutations: ----------
    [MUTATION.SET_LIST_FILTER_COST_LOWER_BOUND_VALUE](state, val) {
        // if user input is a number, set state; otherwise, do nothing:
        if ( isNaN(parseFloat(val)) === false){
            state.listFilterCostLowerBound = val;
        }
    },

    [MUTATION.SET_LIST_FILTER_COST_UPPER_BOUND_VALUE](state, val) {
        // if user input is a number, set state; otherwise, set to default:
        if ( isNaN(parseFloat(val)) === false) {
            state.listFilterCostUpperBound = val;
        }
        // TODO: this is causing issues when field is cleared; perhaps need to do this check in the input update handler instead:
        else if (val.toString().trim() === '') {
            state.listFilterCostUpperBound = CONST.LIST_FILTER.COST_UPPER_BOUND_DEFAULT_VALUE;
        }
    },

    [MUTATION.SET_LIST_FILTER_CAR_MODEL_VALUE](state, val) {
        // only set state if user input is not an empty string:
        let trimmedValue = val.trim();

        if (trimmedValue !== '') {
            state.listFilterCarModel = val;
        }
    },

    [MUTATION.SET_LIST_FILTER_LOCATION_VALUE](state, val) {
        // only set state if user input is not an empty string:
        let trimmedValue = val.trim();

        if (trimmedValue !== '') {
            state.listFilterLocation = val;
        }
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
    }
};


export const actions = {
    /**
     * Creates a new Firebase instance and saves into Vuex store.
     *
     * @param commit
     */
    [ACTION.INSTANTIATE_FIREBASE]({commit}) {
        let fb = Firebase.initializeApp({
            apiKey:             FIREBASE_SECRETS.apiKey,
            authDomain:         FIREBASE_SECRETS.authDomain,
            databaseURL:        FIREBASE_SECRETS.databaseURL,
            projectId:          FIREBASE_SECRETS.projectId,
            storageBucket:      FIREBASE_SECRETS.storageBucket,
            messagingSenderId:  FIREBASE_SECRETS.messagingSenderId
        }).database();

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
            // we don't need to limit results for initial data, but if we did, it would be placed here:
            // .limitToFirst(state.limitResultsTo)
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
    },

    /**
     * Sorts and retrieves db entries by given column and ascending/descending option.
     *
     * @param commit
     * @param state
     * @param options {Object}: options.direction {String}: 'ASC' || 'DESC' for ascending or descending sort order.
     *                          options.columnName {String}: Name of data-table column to sort.
     */
    [ACTION.SORT_BY_COLUMN]({ commit, state }, options) {
        // set default direction:
        if (!options.direction) {
            options.direction = CONST.FIREBASE.SORT_ASCENDING;
        }

        let results = [];

        state.fbInstance
            .ref(CONST.FIREBASE.REFERENCE_NODE)
            .orderByChild(options.columnName)
            .once('value')
            .then( (snapshot) => {

                snapshot.forEach( (child) => {
                    results.push(child.val());
                });

                if (options.direction.toUpperCase() === CONST.FIREBASE.SORT_ASCENDING) {
                    commit(MUTATION.UPDATE_TABLE_DATA, [...results]);
                }
                else {
                    commit(MUTATION.UPDATE_TABLE_DATA, [...results].reverse());
                }
            })
            .catch( (error) => {
                // TODO: gracefully handle error; early return
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
