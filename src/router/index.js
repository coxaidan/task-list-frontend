import {
    createRouter,
    createWebHistory,
} from 'vue-router'
import store from '@/store/index.js';
import { mapGetters } from 'vuex';

import HomePage from '../home/HomePage.vue';
import SignIn from '../components/SignIn.vue';
import SignUp from '../components/SignUp.vue';
import TaskList from '../components/TaskList.vue';
import AccountSettings from '../components/AccountSettings.vue';

const router = createRouter({
    history: createWebHistory(),
    computed: { ...mapGetters(["isLoggedIn"]) },
    routes: [
        {
            path: '/',
            component: HomePage
        },
        {
            path: '/login',
            component: SignIn
        },
        {
            path: '/register',
            component: SignUp
        },
        {
            path: '/todolist',
            component: TaskList,
        },
        {
            path: '/account',
            component: AccountSettings
        },
    ],
})


router.beforeEach((to, from) => {
    console.log(`Store in router: ${JSON.stringify(store)}`)
    if (!localStorage.auth_token) {
        console.log("Requires login")
        // router.push("/");
    }
})


export default router;
