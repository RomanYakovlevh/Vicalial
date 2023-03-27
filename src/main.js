//import { createApp } from 'vue'
//import App from './App.vue'
import * as VueRouter from 'vue-router';
import * as Vue from 'vue';
//import HelloSimple from './components/HelloSimple.vue'
import App from "@/App.vue";
import StatementComponent from "@/components/StatementComponent.vue";
import router from './router'
import store from './store'


const routes = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHashHistory(),
    routes: [
        { path: '/', component: App },
        { path: '/cv', component: StatementComponent}
        ] // short for `routes: routes`
})
const app = Vue.createApp(App).use(store).use(router)
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(routes)

app.mount('#app')

