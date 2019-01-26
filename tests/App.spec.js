import Vuex from 'vuex';
import Vuetify from 'vuetify';
import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import { __createMocks as createStoreMocks } from "../src/store";
import * as CONST from '../src/appConstants';
import * as ACTION from "../src/store/typesActions";
import App from "../src/App.vue";
import router from "../src/router";


// suppress a console error of a known Vuetify bug; see <https://github.com/vuetifyjs/vuetify/issues/4068>:
// n.b. this needs to be called before `.use(Vuetify)`:
import vuetifyConsoleBugSuppressor from './__helpers__/_vuetifyConsoleBugSuppressor';
vuetifyConsoleBugSuppressor();

jest.mock('../src/store');

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);



describe('App.vue', () => {
    // ==================== setup: ====================
    let storeMocks;
    let wrapper;

    // create a mock Vuex store before each test:
    beforeEach( ()=> {
        storeMocks = createStoreMocks();
        wrapper = shallowMount(App, {
            store: storeMocks.store,
            router,
            localVue,
        });
    });


    // ==================== tests: ====================
    it('vm should exist', () => {
        expect(wrapper).not.toBeUndefined();
    });
});
