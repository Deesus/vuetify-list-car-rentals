import Vue from 'vue';
import Vuetify, { VLayout, VContainer, VFlex, VImg }  from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
    iconfont: 'md',
    components: {
        VLayout,
        VContainer,
        VFlex,
        VImg
    }
});
