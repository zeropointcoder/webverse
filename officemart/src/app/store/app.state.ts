import { CartState } from "./reducers/cart.reducer"
import { CheckoutState } from "./reducers/checkout.reducer"
import { ProductState } from "./reducers/products.reducer"

export interface AppState {
    product: ProductState
    cart: CartState
    checkout: CheckoutState
}