<script setup>
import EmptyCart from '@/components/EmptyCart.vue'
import CartItem from '@/components/CartItem.vue'

</script>

<template>
    <h2 class="mb-3">Shopping Cart 🛒 (0 items)</h2>

    <empty-cart></empty-cart>

    <div class="row">
        <div class="col-9">
            <div class="table-responsive">
                <table class="table table-success">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">img</th>
                            <th scope="col">title</th>
                            <th scope="col">quantity</th>
                            <th scope="col">price</th>
                            <th scope="col">➖</th>
                            <th scope="col">➕</th>
                            <th scope="col">subtotal</th>
                            <th scope="col">🗑️</th>
                        </tr>
                    </thead>
                    <tbody>
                        <cart-item v-for="(item, index) in [1,1,1,1]" :key="index"></cart-item>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="col-3">
            <h2 class="mb-3">Order summary 🛒</h2>
            <h3 class="mb-3">Total: £0</h3>

            <div class="d-flex justify-content-between">
                <router-link to="/checkout" class="btn btn-sm btn-info">Proceed to checkout</router-link>

                <button type="button" class="btn btn-sm btn-secondary">Clear cart</button>
            </div>
        </div>
    </div>
    
</template>