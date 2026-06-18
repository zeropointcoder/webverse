import { Routes } from '@angular/router'
import { Products } from './components/products/products'
import { Checkout } from './components/checkout/checkout'
import { Cart } from './components/cart/cart'
import { OrderSuccess } from './components/order-success/order-success'
import { OrderFailure } from './components/order-failure/order-failure'

export const routes: Routes = [
    {path: '', component: Products, pathMatch: 'full'},
    {path: 'products', component: Products},
    {path: 'cart', component: Cart},
    {path: 'checkout', component: Checkout},
    {path: 'orders/success', component: OrderSuccess},
    {path: 'orders/failure', component: OrderFailure},
    {path: '**', redirectTo: ''}
]
