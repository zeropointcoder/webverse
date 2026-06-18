import { inject, Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { ProductService } from "../../services/product.service"
import { loadProducts, loadProductsFailure, loadProductsSuccess } from "../actions/products.actions"
import { catchError, map, of, switchMap } from "rxjs"

@Injectable()
export class ProductsEffects {
    private actions$ = inject(Actions)
    private productService = inject(ProductService)

    constructor(){}

    loadProducts$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadProducts),
            switchMap(() => 
                this.productService.getProducts().pipe(
                    map((products) => loadProductsSuccess({products})),
                    catchError(error => 
                        of(loadProductsFailure({error: error.message}))
                    )
                )
            )
        )
    )
}