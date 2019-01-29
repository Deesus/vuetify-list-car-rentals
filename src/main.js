import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';

// import styles directly into JS:
import './styles/filter-panel.scss';
import './styles/vuetify-overrides.scss';

Vue.config.productionTip = false;


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
