import { createAction, props } from "@ngrx/store"
import { Order } from "../../models/order.model"

export const checkout = createAction(
    '[Checkout] submit',
    props<{order: Order}>()
)

export const checkoutSuccess = createAction(
    '[Checkout] success',
    props<{order: Order}>()
)

export const checkoutFailure = createAction(
    '[Checkout] failure',
    props<{error: string}>()
)