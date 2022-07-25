import {
    createRouter,
    createWebHistory,
} from 'vue-router'
import store from '@/store/index.js';

import HomePage from '../home/HomePage.vue';
import SignIn from '../components/SignIn.vue';
import SignUp from '../components/SignUp.vue';
import TaskList from '../components/TaskList.vue';
import AccountSettings from '../components/AccountSettings.vue';

// const routes = [
//     { path: '/', component: HomePage }, 
//     { path: '/login', component: SignIn }, 
//     { path: '/register', component: SignUp }, 
//     { path: '/todolist', component: TaskList, }, 
//     { path: '/account', component: AccountSettings },
// ];

// const router = createRouter({
//     history: createWebHistory(),
//     routes,
// });

// router.beforeEach(() => {
//     console.log(store)
// });

// export default router;

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
        path: '/',
        component: HomePage
        }, {
        path: '/login',
        component: SignIn
        }, {
        path: '/register',
        component: SignUp
        }, {
        path: '/todolist',
        component: TaskList,
        }, {
        path: '/account',
        component: AccountSettings
        },
    ],
})
