import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import * as CONST from "../src/appConstants";
import * as ACTION from "../src/store/typesActions";
import * as MUTATION from "../src/store/typesMutations";
import * as store from "../src/store";
import { cloneDeep } from "lodash";



describe('Vuex Store', () => {
    // ==================== setup: ====================
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
    it('example', () => {
        expect(1).toBe(1);
    });
});
