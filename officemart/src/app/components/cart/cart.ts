import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Store } from '@ngrx/store'
import { RouterLink } from '@angular/router'
import { Observable } from 'rxjs'
import { CartItem } from '../../models/cart-item.model'
import { selectCartItemCount, selectCartItems, selectCartTotal } from '../../store/selectors/cart.selectors'
import { clearCart, removeFromCart } from '../../store/actions/cart.actions'

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
    private store = inject(Store)

    cartItems$: Observable<CartItem[]>
    total$: Observable<number>
    itemCount$: Observable<number>

    constructor() {
      this.cartItems$ = this.store.select(selectCartItems)
      this.total$ = this.store.select(selectCartTotal)
      this.itemCount$ = this.store.select(selectCartItemCount)
    }

    removeItem(productId: number): void {
      this.store.dispatch(removeFromCart({productId: productId}))
    }

    clearCart(): void {
      this.store.dispatch(clearCart())
    }
}
