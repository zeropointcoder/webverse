import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    items: [],
    loading: false,
    error: null,
    order: null
}

export const processOrder = createAsyncThunk(
    "cart/processOrder",
    async (orderData, thunkApi) => {
        //orderData = {customer: formData, items}
        await new Promise(resolve => 
            setTimeout(resolve, 2000)
        )

        const success = Math.random() > 0.3

        if(!success) {
            return thunkApi.rejectWithValue("Payment processing failed.")
        }

        return {
            //orderData = {customer: formData, items}
            orderId: "ORD-" + Math.floor(Math.random() * 1000000),
            customer: orderData.customer,
            items: orderData.items,
            total: orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
            status: "CONFIRMED"
        }
    }
)

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id)

            if(existingItem) {
                existingItem.quantity += 1
            } else {
                state.items.push({
                    ...action.payload,
                    quantity: 1
                })
            }
        },

        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload)
        },

        increaseQuantity: (state, action) => {
            const item = state.items.find(
                item => item.id === action.payload
            )

            if(item) {
                item.quantity += 1
            }
        },

        decreaseQuantity: (state, action) => {
            const item = state.items.find(
                item => item.id === action.payload
            )

            if(!item) 
                return

            if(item.quantity === 1) {
                state.items = state.items.filter(product => product.id !== action.payload)
            } else {
                item.quantity -= 1
            }
        },

        clearCart: (state) => {
            state.items = []
        },

        resetOrder: (state) => {
            state.order = null
            state.error = null
        }
    },
    extraReducers: builder => {
        builder
            .addCase(processOrder.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(processOrder.fulfilled, (state, action) => {
                state.loading = false
                state.order = action.payload
                state.items = []
            })
            .addCase(processOrder.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || "Something went wrong."
            })
    }
})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, resetOrder } = cartSlice.actions

export default cartSlice.reducer