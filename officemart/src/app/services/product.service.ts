import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getProducts(): Observable<Product[]> {
    return of([
      {
        id: 1,
        name: 'Notebook',
        category: 'Stationery',
        description: 'A4 Notebook - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        price: 4.99,
        imageUrl: ''
      },
      {
        id: 2,
        name: 'Gel Pen',
        category: 'Stationery',
        description: 'Gel pen pack - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        price: 1.99,
        imageUrl: ''
      },
      {
        id: 3,
        name: 'Keyboard',
        category: 'Electronics',
        description: 'USB Keyboard - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        price: 34.99,
        imageUrl: ''
      },
      {
        id: 4,
        name: 'Monitor',
        category: 'Electronics',
        description: '24 inch Monitor - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        price: 149.99,
        imageUrl: ''
      }
    ]).pipe(delay(1000))
  }
}
