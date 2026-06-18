import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Observable } from 'rxjs'
import { RouterLink } from "@angular/router"
import { Store } from '@ngrx/store'
import { selectCartItemCount } from '../../store/selectors/cart.selectors'

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private store = inject(Store)

  cartCount$: Observable<number> = this.store.select(selectCartItemCount)
}
