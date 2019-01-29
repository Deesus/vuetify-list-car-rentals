import Vuetify from 'vuetify';
import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import * as CONST from '../../src/appConstants';
import DetailView from "../../src/views/DetailView.vue";


// suppress a console error of a known Vuetify bug; see <https://github.com/vuetifyjs/vuetify/issues/4068>:
// n.b. this needs to be called before `.use(Vuetify)`:
import vuetifyConsoleBugSuppressor from '../__helpers__/_vuetifyConsoleBugSuppressor';
vuetifyConsoleBugSuppressor();

const localVue = createLocalVue();
localVue.use(Vuetify);



describe('DetailView.vue', () => {

    // ==================== Setup: ====================
    const wrapperSettings = {
        propsData: {
            id: 'entry-id'
        },
        data() {
            return {};
        },
        localVue
    };

    const shallowWrapper = shallowMount(DetailView, wrapperSettings);
    const wrapper = mount(DetailView, wrapperSettings);

    // ==================== tests: ====================
    it('should render a Vuetify "card" component', () => {
        expect(shallowWrapper.html()).toContain('v-card');
    });

    it('should render a card title', () => {
        expect(shallowWrapper.html()).toContain('v-card-title');
    });

    it('should have a "back" button to return to the list view', () => {
        expect(shallowWrapper.html()).toContain('v-card-actions');
        expect(wrapper.find('button').exists()).toBeTruthy();
        expect(wrapper.find('button').html().toLowerCase()).toContain('back');
    });
});
