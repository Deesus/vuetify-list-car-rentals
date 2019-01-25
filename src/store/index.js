import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import userPreferences from './modules/userPreferences';
import database from './modules/database';


Vue.use(Vuex);

// initialize plugin for Vuex local storage:
const vuexLocalStorage = new VuexPersistence({
    key: 'vuexFilterSettings',      // name (key) of local storage
    storage: window.localStorage,
    modules: ['userPreferences']    // we persist only the `userPreferences` module
});



export default new Vuex.Store({

    // ==================== plugins: ====================
    plugins: [vuexLocalStorage.plugin],

    // ==================== modules: ====================
    modules: {
        userPreferences,
        database
    },

    // ==================== state: ====================
    state: {

    },

    // ==================== getters: ====================
    getters: {

    },

    // ==================== mutations: ====================
    mutations: {

    },

    // ==================== actions: ====================
    actions: {

    }
});
