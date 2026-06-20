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
        description: 'A4 ruled notebook ideal for meetings, notes, and daily writing tasks.',
        price: 4.99,
        imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=300&h=200&fit=crop'
      },
      {
        id: 2,
        name: 'Gel Pen Set',
        category: 'Stationery',
        description: 'Smooth-writing gel pens with quick-dry ink, perfect for everyday office use.',
        price: 2.49,
        imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&h=200&fit=crop'
      },
      {
        id: 3,
        name: 'Sticky Notes',
        category: 'Stationery',
        description: 'Self-adhesive sticky notes for reminders, bookmarks, and quick annotations.',
        price: 1.79,
        imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=300&h=200&fit=crop'
      },
      {
        id: 4,
        name: 'Stapler',
        category: 'Stationery',
        description: 'Compact desktop stapler designed for fast and reliable document binding.',
        price: 6.99,
        imageUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=200&fit=crop'
      },
      {
        id: 5,
        name: 'Highlighter Pack',
        category: 'Stationery',
        description: 'Assorted color highlighters for marking important text and organizing notes.',
        price: 3.49,
        imageUrl: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=300&h=200&fit=crop'
      }
    ]).pipe(delay(1000))
  }
}
