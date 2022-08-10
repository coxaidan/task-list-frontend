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
import UserPreferences from "../components/UserPreferences.vue";

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
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/account',
            component: AccountSettings,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/preferences',
            component: UserPreferences,
            meta: {
                requiresAuth: true
            }
        },
    ],
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isLoggedIn) {
            if (from.path == '/register') {
                next()
            } else {
                next({ path: '/login' })
            }
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router;
