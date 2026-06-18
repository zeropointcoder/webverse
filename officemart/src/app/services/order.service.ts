import { Injectable } from '@angular/core'
import { delay, Observable, of, throwError } from 'rxjs'
import { Order } from '../models/order.model'

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  placeOrder(order: Order) {
    return throwError(() => new Error('Test order failure'));
  }
}
