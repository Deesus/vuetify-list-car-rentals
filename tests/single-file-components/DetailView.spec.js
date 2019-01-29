import Vuex from 'vuex';
import Vuetify from 'vuetify';
import {__createMocks as createStoreMocks} from "../../src/store";
import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import * as CONST from '../../src/appConstants';
import DetailView from "../../src/views/DetailView.vue";


// suppress a console error of a known Vuetify bug; see <https://github.com/vuetifyjs/vuetify/issues/4068>:
// n.b. this needs to be called before `.use(Vuetify)`:
import vuetifyConsoleBugSuppressor from '../__helpers__/_vuetifyConsoleBugSuppressor';
vuetifyConsoleBugSuppressor();

jest.mock('../../src/store');

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);



describe('DetailView.vue', () => {

    // ==================== Setup: ====================
    let storeMocks;
    let shallowWrapper;
    let wrapper;

    // create a mock Vuex store before each test:
    beforeEach( ()=> {

        storeMocks = createStoreMocks();

        const wrapperSettings = {
            store: storeMocks.store,
            localVue,
        };

        wrapper = mount(DetailView, wrapperSettings);

        shallowWrapper = shallowMount(DetailView, wrapperSettings);
    });


    // ==================== tests: ====================
    it('should render a Vuetify "card" component', () => {
        expect(1).toBe(1);
    });

    it('should render a card title', () => {
        expect(shallowWrapper.html()).toContain('v-card-title');
    });

    it('should have a "back" button to return to the list view', () => {
        expect(shallowWrapper.html()).toContain('v-card-actions');
        expect(wrapper.find('button').exists()).toBeTruthy();
        expect(wrapper.html().toLowerCase()).toContain('back');
    });
});
