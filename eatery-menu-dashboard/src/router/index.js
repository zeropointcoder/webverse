import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/components/menu/DashboardView.vue'

const routes = [
    {path: '/', component: DashboardView},
    {path: '/:pathMatch(.*)*', redirect: '/'}
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router