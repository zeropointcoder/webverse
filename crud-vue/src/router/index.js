import EmployeeView from '@/components/EmployeeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {path: '/', component: EmployeeView },
    {path: '/:pathMatch(.*)*', redirect: '/'}
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router