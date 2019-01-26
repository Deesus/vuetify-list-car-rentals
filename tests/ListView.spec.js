import { shallowMount } from "@vue/test-utils";
import { createLocalVue } from "@vue/test-utils";
import ListView from "@/views/ListView.vue";

// we need to import vue and vuetify to prevent console warnings <https://github.com/vuetifyjs/vuetify/issues/243#issuecomment-288467099>:
import Vue from 'vue';
import Vuetify from 'vuetify';
Vue.use(Vuetify);

import Vuex from 'vuex';
import { store } from '../src/store/index';



describe('ListView.vue', () => {

    it('test mutations', () => {
        createLocalVue().use(Vuex);
    });

    // it('renders props.msg when passed', () => {
    //     const msg = 'new message';
    //     const wrapper = shallowMount(ListView, {
    //         propsData: {msg}
    //     });
    //     expect(wrapper.text()).not.toBeUndefined()
    // });
});
