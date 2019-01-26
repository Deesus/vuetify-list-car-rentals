import Vuex from 'vuex';
import Vuetify from 'vuetify';
import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import { __createMocks as createStoreMocks } from "../src/store";
import * as CONST from "../src/appConstants";
import * as ACTION from "../src/store/typesActions";
import ListView from "../src/views/ListView.vue";


// suppress a console error of a known Vuetify bug; see <https://github.com/vuetifyjs/vuetify/issues/4068>:
// n.b. this needs to be called before `.use(Vuetify)`:
import vuetifyConsoleBugSuppressor from './__helpers__/_vuetifyConsoleBugSuppressor';
vuetifyConsoleBugSuppressor();

jest.mock('../src/store');

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);



describe('ListView.vue', () => {
    // ==================== setup: ====================
    let storeMocks;
    let wrapper;

    // create a mock Vuex store before each test:
    beforeEach( ()=> {
        storeMocks = createStoreMocks();
        wrapper = shallowMount(ListView, {
            store: storeMocks.store,
            localVue
        });
    });


    // ==================== tests: ====================
    it("should render a Vuetify Data Table", () => {
        expect(wrapper.html())
        .toContain('v-data-table');
    });

    it("should make calls to fetch data when page is loaded", () => {
        expect(storeMocks.actions[ACTION.GET_INITIAL_DATA])
        .toBeCalled();

        expect(storeMocks.actions[ACTION.INSTANTIATE_FIREBASE])
        .toBeCalled();
    });
});
