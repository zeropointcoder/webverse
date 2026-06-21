import { computed, ref } from "vue"
import { defineStore } from "pinia"

export const useCartStore = defineStore("cart", () => {
    const cartItems = ref([])
    const isSubmittingOrder = ref(false)
    const orderError = ref(null)
    const lastOrder = ref(null)

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

    const removeFromCart = (productId) => {
        cartItems.value = cartItems.value.filter(item => item.id !== productId)
    }

    const increaseQuantity = (productId) => {
        const itemFound = cartItems.value.find((i) => i.id === productId)

        if(itemFound) {
            itemFound.quantity ++
        }
    }

    const decreaseQuantity = (productId) => {
        const itemFound = cartItems.value.find((i) => i.id === productId)

        if(!itemFound) {
            return
        }

        itemFound.quantity--

        if(itemFound.quantity <= 0) {
            removeFromCart(productId)
        }
    }

    const clearCart = () => {
        cartItems.value = []
    }

    const submitOrder = async (customerDetails) => {
        isSubmittingOrder.value = true
        orderError.value = null // clears any prev set values

        try {
            await new Promise(resolve => setTimeout(resolve, 2000))

            const success = Math.random() > 0.3

            if(!success) {
                throw new Error('Transaction could not be completed.')
            }

            lastOrder.value = {
                id: Date.now(),
                customer: customerDetails,
                items: cartItems.value.map(item => ({
                    ...item
                })),
                total: totalPrice.value,
                status: 'CONFIRMED',
                createdAt: new Date().toISOString()
            }

            clearCart()

            return {
                success: true
            }

        } catch (error) {
            orderError.value = error.message

            return {
                success: false,
                message: error.message
            }
        } finally {
            isSubmittingOrder.value = false
        }
        
    }

    const totalItems = computed(() => 
        cartItems.value.reduce((total, item) => total + item.quantity, 0)
    )

    const totalPrice = computed(() => 
        cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
    )

    return {
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalItems,
        totalPrice,

        submitOrder,
        isSubmittingOrder,
        orderError,
        lastOrder,
    }
})