import { createEffect } from "@ngrx/effects"
import { Order } from "../../models/order.model"
import { createReducer, on } from "@ngrx/store"
import { checkout, checkoutFailure, checkoutSuccess } from "../actions/checkout.actions"

export interface CheckoutState {
    loading: boolean
    order: Order | null
    error: string | null
}

export const initialState: CheckoutState = {
    loading: false,
    order: null,
    error: null
}

export const checkoutReducer = createReducer(
    initialState,

    on(checkout, (state) => ({
        ...state,
        loading: true
    })),

    on(checkoutSuccess, (state, {order}) => ({
        loading: false,
        order,
        error: null
    })),

    on(checkoutFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error
    }))
)