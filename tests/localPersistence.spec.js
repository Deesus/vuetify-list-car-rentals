import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import * as CONST from "../src/appConstants";
import * as ACTION from "../src/store/typesActions";
import { __createMocks as createStoreMocks } from "../src/store";
import * as store from "../src/store";



describe('Local Persistence', () => {
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
    beforeEach( () => {
        const localVue = createLocalVue();
        localVue.use(Vuex);
    });


    // ==================== tests: ====================
    it('example', () => {
        expect(1).toBe(1);
    });
});
