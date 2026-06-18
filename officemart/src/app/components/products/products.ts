import { Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Store } from '@ngrx/store'
import { BehaviorSubject, Observable } from 'rxjs'
import { Product } from '../../models/product.model'
import { selectProducts, selectProductLoading } from '../../store/selectors/products.selectors'
import { loadProducts } from '../../store/actions/products.actions'
import { addToCart } from '../../store/actions/cart.actions'

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  private store = inject(Store)

  products$: Observable<Product[]>
  loading$: Observable<boolean>
  toastMessage$ = new BehaviorSubject<string>('')

  constructor() {
    this.products$ = this.store.select(selectProducts)
    this.loading$ = this.store.select(selectProductLoading)
  }

  ngOnInit(): void {
    this.store.dispatch(loadProducts())
  }

  addToCart(product: Product): void {
    this.store.dispatch(addToCart({product}))

    this.toastMessage$.next(`${product.name} added to cart!`)

    setTimeout(() => {
      this.toastMessage$.next(``)
    }, 2000)
  }
}
