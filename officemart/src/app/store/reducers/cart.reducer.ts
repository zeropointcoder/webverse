import { createReducer, on } from "@ngrx/store"
import { CartItem } from "../../models/cart-item.model"
import { addToCart, clearCart, removeFromCart } from "../actions/cart.actions"

export interface CartState {
    items: CartItem[]
}

export const initialState: CartState = {
    items: []
}

export const cartReducer = createReducer(
    initialState,

    on(addToCart, (state, {product}) => {
        const existing = state.items.find(x => x.product.id === product.id)

        if(existing) {
            return {
                ...state,
                items: state.items.map(item => 
                    item.product.id === product.id
                    ? {...item, quantity: item.quantity + 1} 
                    : item
                )
            }
        }

        return {
            ...state,
            items: [
                ...state.items,
                {
                    product,
                    quantity: 1
                }
            ]
        }
    }),

    on(removeFromCart, (state, {productId}) => ({
        ...state,
        items: state.items.filter(item => item.product.id !== productId)
    })),

    on(clearCart, () => ({
        items: []
    })),
)