import { createFeatureSelector, createSelector } from "@ngrx/store"
import { CheckoutState } from "../reducers/checkout.reducer"

export const selectCheckoutState = createFeatureSelector<CheckoutState>('checkout')

export const selectCheckoutLoading = createSelector(selectCheckoutState, state => state.loading)

export const selectCheckoutError = createSelector(
    selectCheckoutState, state => state.error
)

export const selectCurrentOrder = createSelector(
    selectCheckoutState, state => state.order
)