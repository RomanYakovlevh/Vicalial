//import { createApp } from 'vue'
//import App from './App.vue'
import * as VueRouter from 'vue-router';
import * as Vue from 'vue';
import HelloSimple from './components/HelloSimple.vue'


const router = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHashHistory(),
    routes: [
        { path: '/', component: HelloSimple },
        ] // short for `routes: routes`
})
const app = Vue.createApp({})
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router)

app.mount('#app')

