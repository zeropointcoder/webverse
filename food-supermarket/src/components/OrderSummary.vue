<script setup>
import { useCartStore } from '@/store/cartStore'

const cartStore = useCartStore()

const subtotal = cartStore.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

const tax = subtotal * 0.1 // @ 10%

const total = subtotal + tax

</script>

<template>
    <h3>Order summary</h3>
    
    <div class="table-responsive">
        <table class="table table-success">
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">title</th>
                    <th scope="col">price</th>
                    <th scope="col">quantity</th>
                    <th scope="col">subtotal</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in cartStore.cartItems" :key="item.id">
                    <th scope="row">{{item.id}}</th>
                    <td>{{item.title}}</td>
                    <td>£{{item.price}}</td>
                    <td>{{item.quantity}}</td>
                    <td>£{{(item.price * item.quantity).toFixed(2)}}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <ul class="list-group mb-2">
        <li class="list-group-item fw-bold">Subtotal</li>
        <li class="list-group-item">£{{ subtotal.toFixed(2) }}</li>
        <li class="list-group-item fw-bold">Tax (@ 10%)</li>
        <li class="list-group-item">£{{ tax.toFixed(2) }}</li>
        <li class="list-group-item fw-bold text-uppercase">Total</li>
        <li class="list-group-item">£{{ total.toFixed(2) }}</li>
    </ul>
</template>