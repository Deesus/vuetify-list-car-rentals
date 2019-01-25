import Firebase from 'firebase/app';
import 'firebase/database';

import FIREBASE_SECRETS from '../../../SECRETS';
import * as CONST from '../../appConstants';
import * as ACTION from '../typesActions';
import * as MUTATION from '../typesMutations';



export default {

    // ==================== state: ====================
    state: {
        limitResultsTo: CONST.FIREBASE.LIMIT_RESULTS_TO_DEFAULT_NUMBER, // TODO: currently `limitResultsTo` is unused; delete property?
        fbInstance: null,
        tableListItems: [],
    },

    // ==================== getters: ====================
    getters: {

    },

    // ==================== mutations: ====================
    mutations: {
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
    },

    // ==================== actions: ====================
    actions: {
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
    }
}
