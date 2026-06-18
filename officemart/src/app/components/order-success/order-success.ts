import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { selectCurrentOrder } from '../../store/selectors/checkout.selectors'
import { Order } from '../../models/order.model'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-success.html',
  styleUrl: './order-success.css',
})
export class OrderSuccess {
  private store = inject(Store)

  order$: Observable<Order | null> = this.store.select(selectCurrentOrder)
}
