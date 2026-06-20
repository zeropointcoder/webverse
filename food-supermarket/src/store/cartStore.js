import { computed, ref } from "vue"
import { defineStore } from "pinia"

export const useCartStore = defineStore("cart", () => {
    const cartItems = ref([])

    const addToCart = (product) => {
        const existingItem = cartItems.value.find((item) => item.id === product.id)

        if(existingItem) {
            existingItem.quantity += 1
        } else {
            cartItems.value.push({
                ...product,
                quantity: 1
            })
        }
    }

    const totalItems = computed(() => 
        cartItems.value.reduce((total, item) => total + item.quantity, 0)
    )

    return {
        cartItems,
        addToCart,
        totalItems
    }
})