<script setup>
import { defineProps } from 'vue'
import { useCartStore } from '@/store/cartStore'
import { useToast } from 'vue-toastification'

const props = defineProps({
    item: Object
})

const cartStore = useCartStore()
const toast = useToast()

const increase = () => {
    cartStore.increaseQuantity(props.item.id)
}

const decrease = () => {
    cartStore.decreaseQuantity(props.item.id)
}

const remove = () => {
    cartStore.removeFromCart(props.item.id)

    toast.info(`${props.item.name} removed from cart`)
}

</script>

<template>
    <tr>
        <th scope="row">{{item.id}}</th>
        <td>
            <img :src="item.image" class="" alt="item.name" width="100" height="100" />
        </td>
        <td>{{item.name}}</td>
        <td>{{item.price}}</td>
        <td>
            <button @click="decrease" type="button" class="btn btn-sm btn-outline-info">➖</button>

            <span class="mx-3">{{item.quantity}}</span>

            <button @click="increase" type="button" class="btn btn-sm btn-outline-info">➕</button>
        </td>
        <td>£{{ (item.price * item.quantity).toFixed(2) }}</td>
        <td>
            <button @click="remove" type="button" class="btn btn-sm btn-outline-danger">🗑️</button>
        </td>
    </tr>
</template>