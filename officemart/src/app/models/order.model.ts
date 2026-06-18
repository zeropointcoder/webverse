import { CartItem } from "./cart-item.model"

export interface Order {
    orderId: string
    items: CartItem[]
    totalAmount: number
    status: 'SUCCESS' | 'FAILED'
}