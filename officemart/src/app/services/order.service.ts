import { Injectable } from '@angular/core'
import { delay, Observable, of, throwError } from 'rxjs'
import { Order } from '../models/order.model'

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  placeOrder(order: Order): Observable<Order> {
    const success = Math.random() > 0.3

    if(success) {
      return of<Order>({
        ...order,
        status: 'SUCCESS'
      }).pipe(delay(2000))
    }

    return throwError(() => 
      new Error('Transaction failed!')
    )
  }
}
