import FibonacciHeap from 'mnemonist/fibonacci-heap'
import Order from './Order'

/**
 * Max-heap comparator function
 */
export const bidComparator = function(a: Order, b: Order) {
  let ret = b.price.sub(a.price).toNumber()
  if (ret === 0) {
    ret = a.createdAt - b.createdAt
  }
  return ret
}

/**
 * Min-heap comparator function
 */
export const askComparator = function(a: Order, b: Order) {
  let ret = a.price.sub(b.price).toNumber()
  if (ret === 0) {
    ret = a.createdAt - b.createdAt
  }
  return ret
}

class Book {
}

export default Book

