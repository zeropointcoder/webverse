import { createReducer, on } from "@ngrx/store"
import { Product } from "../../models/product.model"
import { loadProducts, loadProductsFailure, loadProductsSuccess } from "../actions/products.actions"

export interface ProductState {
    products: Product[]
    loading: boolean
    error: string | null
}

export const initialState: ProductState = {
    products: [],
    loading: false,
    error: null
}

export const productsReducer = createReducer(
    initialState,
    on(loadProducts, (state) => ({
        ...state,
        loading: true 
    })),
    on(loadProductsSuccess, (state, {products}) => ({
        ...state,
        products,
        loading: false
    })),
    on(loadProductsFailure, (state, {error}) => ({
        ...state,
        error,
        loading: false
    }))
)