import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'

import { productsReducer } from './store/reducers/products.reducer'
import { provideEffects } from '@ngrx/effects'
import { ProductsEffects } from './store/effects/products.effects'
import { CheckoutEffects } from './store/effects/checkout.effects'
import { cartReducer } from './store/reducers/cart.reducer'
import { checkoutReducer } from './store/reducers/checkout.reducer'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { errorInterceptor } from './interceptors/error.interceptor'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // provideZoneChangeDetection({
    //   eventCoalescing: true
    // }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        errorInterceptor
      ])
    ),
    provideStore({
      products: productsReducer,
      cart: cartReducer,
      checkout: checkoutReducer,
    }),
    provideEffects([ProductsEffects, CheckoutEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false
    }),
  ]
}
