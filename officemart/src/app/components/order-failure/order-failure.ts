import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { RouterLink } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { selectCheckoutError } from '../../store/selectors/checkout.selectors'

@Component({
  selector: 'app-order-failure',
  imports: [CommonModule, RouterLink],
  templateUrl: './order-failure.html',
  styleUrl: './order-failure.css',
})
export class OrderFailure {
  private store = inject(Store)

  error$: Observable<string | null> = this.store.select(selectCheckoutError)
}
