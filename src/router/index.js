import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/index.vue'
// import resume from "@/views/resume";
import mobileIndex from "@/views/mobileIndex.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/mobileIndex',
        name: 'mobileIndex',
        component: mobileIndex
    },
    // {
    //   path: '/resume',
    //   name: 'resume',
    //   component: resume
    // },
]
const router = new VueRouter({
    mode: "hash",
    base: "/",
    routes: routes
});

export default router
