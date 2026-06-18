import { inject, Injectable } from "@angular/core"
import { Actions, ofType, createEffect } from "@ngrx/effects"
import { OrderService } from "../../services/order.service"
import { checkout, checkoutFailure, checkoutSuccess } from "../actions/checkout.actions"
import { catchError, map, of, switchMap, tap } from "rxjs"
import { Router } from "@angular/router"

@Injectable()
export class CheckoutEffects {
    private actions$= inject(Actions)
    private orderService = inject(OrderService)
    private router = inject(Router)

    constructor() {}

    checkout$ = createEffect(() => 
        this.actions$.pipe(
            ofType(checkout),
            switchMap(({order}) => 
                this.orderService.placeOrder(order).pipe(
                    map((result) => checkoutSuccess({order: result})),
                    catchError((error) => of(checkoutFailure({error: error.message})))
                )
            )
        )
    )

    checkoutSuccessNavigation$ = createEffect(() => 
        this.actions$.pipe(
            ofType(checkoutSuccess),
            tap(() => {
                this.router.navigate(['/orders/success'])
            })
        ), 
        {dispatch: false}
    )

    checkoutFailureNavigation$ = createEffect(() => 
        this.actions$.pipe(
            ofType(checkoutFailure),
            tap(() => {
                this.router.navigate(['/orders/failure'])
            })
        ),
        {dispatch: false}
    )
}