import { createFeatureSelector, createSelector } from "@ngrx/store"
import { ProductState } from "../reducers/products.reducer"

export const selectProductState = createFeatureSelector<ProductState>('products')

export const selectProducts = createSelector(
    selectProductState,
    state => state.products
)

export const selectProductLoading = createSelector(
    selectProductState,
    state => state.loading
)

