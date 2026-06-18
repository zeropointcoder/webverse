import {createAction, props} from '@ngrx/store'
import { Product } from '../../models/product.model'

export const loadProducts = createAction(
    '[Products] load'
)

export const loadProductsSuccess = createAction(
    '[Products] load success',
    props<{products: Product[]}>()
)

export const loadProductsFailure = createAction(
    '[Products] load failure',
    props<{error: string}>()
)