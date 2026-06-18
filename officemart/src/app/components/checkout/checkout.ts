import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { selectCartItems, selectCartTotal } from '../../store/selectors/cart.selectors'
import { take } from 'rxjs'
import { Order } from '../../models/order.model'
import { checkout } from '../../store/actions/checkout.actions'

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit {
  private fb = inject(FormBuilder)
  private store = inject(Store)

  cartItems: any[] = []
  totalAmount = 0

  checkoutForm = this.fb.group({
    fullname: ['', Validators.required],
    department: ['', Validators.required],
    location: ['', Validators.required]
  })

  ngOnInit(): void {
    this.store.select(selectCartItems)
      .pipe(take(1))
      .subscribe(items => {
        this.cartItems = items
      })

    this.store.select(selectCartTotal)
      .pipe(take(1))
      .subscribe(total => {
        this.totalAmount = total
      })
  }

  placeOrder(): void {
    if(this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched()
      return
    }

    const order: Order = {
      orderId: crypto.randomUUID(),
      items: this.cartItems,
      totalAmount: this.totalAmount,
      status: 'SUCCESS'
    }

    this.store.dispatch(checkout({order: order}))
  }

}
