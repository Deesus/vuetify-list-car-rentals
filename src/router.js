import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/ListView.vue';

Vue.use(Router);


export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/detail/:id',
            name: 'detail',
            props: true,
            // route level code-splitting; this generates a separate chunk (detail.[hash].js) for this route
            component: () => import('./views/DetailView.vue')
        },
        // default route:
        {
            path: '*',
            redirect: { name: 'home' }
        }
    ]
});
