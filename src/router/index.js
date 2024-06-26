import {createRouter, createWebHistory} from 'vue-router'
import CalculatorView from "@/views/CalculatorView.vue";

const routes = [
    {
        path: '/',
        name: 'calculatorview',
        component: CalculatorView
    },
    {
        path: '/style_guide.html',
        name: 'style_guide.html',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/StyleGuideView.vue')
    },
    {
        path: '/styleguide',
        name: 'styleguide',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/StyleGuideView.vue')
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/DataVisualisationsView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
