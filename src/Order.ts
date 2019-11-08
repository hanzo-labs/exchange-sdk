import uuid from 'uuid'
import time from './utils/time'
import Decimal from 'decimal.js'

/**
 * Type of the order
 */
export enum OrderType {
  /**
   * Limit order
   */
  LIMIT,
  /**
   * Market order
   */
  MARKET,
}

/**
 * Status of the order
 */
export enum OrderStatus {
  /**
   * Unfilled order (default state)
   */
  UNFILLED,
  /**
   * Partially filled order
   */
  PARTIALLY_FILLED,
  /**
   * Fully filled order
   */
  FILLED,
  /**
   * Partially filled but cancelled order
   */
  PARTIALLY_FILLED_CANCELLED,
  /**
   * Cancelled order
   */
  CANCELLED,
}

/**
 * Represents an order that's put in a book
 */
export default class Order {
  /**
   * Unique order id
   */
  id: string
  /**
   * Type of the order
   */
  type: OrderType
  /**
   * Status of the order
   */
  status: OrderStatus = OrderStatus.UNFILLED
  /**
   * Bid/Ask price
   */
  price: Decimal
  /**
   * Order size
   */
  amount: Decimal
  /**
   * Unix time
   */
  createdAt: number

  constructor(type: OrderType, price: number | string | Decimal, amount: number | string | Decimal) {
    this.id = uuid.v4()
    this.type = type
    this.price = new Decimal(price)
    this.amount = new Decimal(amount)
    this.createdAt = time().unix()
  }
}
