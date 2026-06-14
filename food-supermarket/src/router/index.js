import { createRouter, createWebHistory } from "vue-router"
import ShopView from "@/views/ShopView.vue"

const routes = [
    {path: '/', component: ShopView},
    {path: '/:pathMatch(.*)*', redirect: '/'}
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router