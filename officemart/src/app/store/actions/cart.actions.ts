import { createAction, props } from "@ngrx/store"
import { Product } from "../../models/product.model"

export const addToCart = createAction(
    '[Cart] add',
    props<{product: Product}>()
)

export const removeFromCart = createAction(
    '[Cart] remove',
    props<{productId: number}>()
)

export const clearCart = createAction(
    '[Cart] clear'
)