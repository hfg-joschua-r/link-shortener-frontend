import { createRouter, createWebHistory } from 'vue-router';
//import Home from '../views/Home.vue'
import UrlShortener from '../components/UrlShortener.vue';
import resolveLink from '../views/router.vue';
import NotFound from '../views/notFound.vue';
import adminLink from '../views/adminLink.vue';
import adminDashboard from '../views/adminDashboard';

const routes = [{
        path: '/',
        name: 'UrlShortener',
        component: UrlShortener
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/link/:id',
        name: 'resolveLink',
        component: resolveLink
    },
    {
        path: '/admin/:code',
        name: 'adminLink',
        component: adminLink
    },
    {
        path: '/adminDashboard',
        name: 'adminDashboard',
        component: adminDashboard
    },
    {
        path: "/:catchAll(.*)",
        component: NotFound,
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;