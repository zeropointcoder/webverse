import { createRouter, createWebHistory } from "vue-router"
import ProductsView from "@/views/ProductsView.vue"
import CartView from "@/views/CartView.vue"
import CheckoutView from "@/views/CheckoutView.vue"
import OrderSuccessView from "@/views/OrderSuccessView.vue"
import OrderFailureView from "@/views/OrderFailureView.vue"

const routes = [
    {path: '/', component: ProductsView},
    {path: '/products', redirect: '/'},
    {path: '/cart', component: CartView},
    {path: '/checkout', component: CheckoutView},
    {path: '/orders/success', component: OrderSuccessView},
    {path: '/orders/failure', component: OrderFailureView},
    {path: '/:pathMatch(.*)*', redirect: '/'}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router