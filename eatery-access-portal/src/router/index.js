import { createRouter, createWebHistory } from "vue-router"
import RegisterView from "@/views/RegisterView.vue"
import LoginView from "@/views/LoginView.vue"
import DashboardView from "@/views/DashboardView.vue"

const routes = [
    {path: '/', redirect: '/login'},
    {path: '/login', component: LoginView},
    {path: '/register', component: RegisterView},
    {
        path: '/dashboard', 
        component: DashboardView,
        meta: {
            requiresAuth: true
        },
    },
    {path: '/:pathMatch(.*)*', redirect: '/'}
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach((to) => {
    const user = JSON.parse(localStorage.getItem('currentUser'))

    // protect /dashboard
    if(to.meta.requiresAuth && !user) {
        return '/login'
    } 
    
    // redirect authenticated users to /dashboard
    if(user && (to.path === '/' || to.path === '/login' || to.path === '/register')) {
        return '/dashboard'
    }

    return true
})

export default router