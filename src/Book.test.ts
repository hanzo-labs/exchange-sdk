import Book from './Book'
import Order, { OrderStatus, OrderType, OrderSide } from './Order'

test('Book constructor', () => {
  let b = new Book('name')

  expect(b.name).toBe('name')
  expect(b.askSize).toBe(0)
  expect(b.bidSize).toBe(0)
})

test('Book ask order sorting is correct (pricing)', () => {
  let book = new Book('test')

  let o1 =  new Order(
    'o1',
    OrderSide.ASK,
    OrderType.LIMIT,
    1,
    2,
  )

  let o2 = new Order(
    'o2',
    OrderSide.ASK,
    OrderType.LIMIT,
    1,
    1,
  )

  book.addOrder(o1)
  book.addOrder(o2)
  let trades = book.settle()
  expect(trades.length).toBe(0)

  let bids = book.orderBook
  let keys = Array.from(bids.keys())

  expect(keys[0]).toBe('1')
  expect(keys[1]).toBe('2')
})

test('Book bid order sorting is correct (pricing)', () => {
  let book = new Book('test')

  let o1 =  new Order(
    'o1',
    OrderSide.BID,
    OrderType.LIMIT,
    1,
    1,
  )

  let o2 = new Order(
    'o2',
    OrderSide.BID,
    OrderType.LIMIT,
    1,
    2,
  )

  book.addOrder(o1)
  book.addOrder(o2)
  let trades = book.settle()
  expect(trades.length).toBe(0)

  let bids = book.orderBook
  let keys = Array.from(bids.keys())

  expect(keys[0]).toBe('1')
  expect(keys[1]).toBe('2')
})

test('Book ask order stacking is correct (quantity)', () => {
  let book = new Book('test')

  let o1 =  new Order(
    'o1',
    OrderSide.ASK,
    OrderType.LIMIT,
    1,
    1,
  )

  let o2 = new Order(
    'o2',
    OrderSide.ASK,
    OrderType.LIMIT,
    3,
    1,
  )

  book.addOrder(o1)
  book.addOrder(o2)
  let trades = book.settle()
  expect(trades.length).toBe(0)

  let bids = book.orderBook

  expect(bids.get('1')?.equals(4)).toBe(true)
})

test('Book bid order stacking is correct (quantity)', () => {
  let book = new Book('test')

  let o1 =  new Order(
    'o1',
    OrderSide.BID,
    OrderType.LIMIT,
    1,
    1,
  )

  let o2 = new Order(
    'o2',
    OrderSide.BID,
    OrderType.LIMIT,
    3,
    1,
  )

  book.addOrder(o1)
  book.addOrder(o2)
  let trades = book.settle()
  expect(trades.length).toBe(0)

  let bids = book.orderBook

  expect(bids.get('1')?.equals(4)).toBe(true)
})

test('Book computes spread', function() {
  var book = new Book("testBook")

  let o1 =  new Order(
    'o1',
    OrderSide.BID,
    OrderType.LIMIT,
    1,
    4,
  )

  let o2 = new Order(
    'o2',
    OrderSide.ASK,
    OrderType.LIMIT,
    1,
    6,
  )

  book.addOrder(o1)
  book.addOrder(o2)

  expect(book.spread.equals(2)).toBe(true)
})

test('Book computes mean price', function() {
  var book = new Book("testBook")

  let o1 =  new Order(
    'o1',
    OrderSide.BID,
    OrderType.LIMIT,
    1,
    4,
  )

  let o2 = new Order(
    'o2',
    OrderSide.ASK,
    OrderType.LIMIT,
    10,
    6,
  )

  book.addOrder(o1)
  book.addOrder(o2)

  console.log(book.meanPrice)

  expect(book.meanPrice.equals(5)).toBe(true)
})

test('Book cancel ask', () => {
  let book = new Book('test')

  let o1 =  new Order(
    'o1',
    OrderSide.ASK,
    OrderType.LIMIT,
    1,
    1,
  )

  let o2 =  new Order(
    'o2',
    OrderSide.ASK,
    OrderType.LIMIT,
    1,
    1,
  )

  book.addOrder(o1)

  expect(book.cancelOrder(o1)).toBe(true)
  expect(book.cancelOrder(o2)).toBe(false)
})

test('Book cancel bid', () => {
  let book = new Book('test')

  let o1 =  new Order(
    'o1',
    OrderSide.BID,
    OrderType.LIMIT,
    1,
    1,
  )

  let o2 =  new Order(
    'o2',
    OrderSide.BID,
    OrderType.LIMIT,
    1,
    1,
  )

  book.addOrder(o1)

  expect(book.cancelOrder(o1)).toBe(true)
  expect(book.cancelOrder(o2)).toBe(false)
})

test('Book settle cancel ask', () => {
  let book = new Book('test')

  let o1 =  new Order(
    'o1',
    OrderSide.ASK,
    OrderType.LIMIT,
    1,
    1,
  )

  let o2 =  new Order(
    'o2',
    OrderSide.BID,
    OrderType.MARKET,
    1,
  )

  book.addOrder(o1)
  book.addOrder(o1)

  expect(book.cancelOrder(o1)).toBe(true)
  expect(book.settle().length).toBe(0)
})

test('Book settle cancel bid', () => {
  let book = new Book('test')

  let o1 =  new Order(
    'o1',
    OrderSide.BID,
    OrderType.LIMIT,
    1,
    1,
  )

  let o2 =  new Order(
    'o2',
    OrderSide.ASK,
    OrderType.MARKET,
    1,
  )

  book.addOrder(o1)
  book.addOrder(o1)

  expect(book.cancelOrder(o1)).toBe(true)
  expect(book.settle().length).toBe(0)
})

test('Book reject single market order - ask', () => {
  let book = new Book('test')

  let o1 =  new Order(
    'o1',
    OrderSide.ASK,
    OrderType.MARKET,
    1,
    1,
  )

  expect(() => book.addOrder(o1)).toThrow('no bids for market order')
})

test('Book reject single market order - bid', () => {
  let book = new Book('test')

  let o1 = new Order(
    'o1',
    OrderSide.BID,
    OrderType.MARKET,
    1,
    1,
  )

  expect(() => book.addOrder(o1)).toThrow('no asks for market order')
})

test('Book reject negative price limit order - ask', () => {
  let book = new Book('test')

  let o1 =  new Order(
    'o1',
    OrderSide.ASK,
    OrderType.LIMIT,
    1,
    -1,
  )

  let o2 =  new Order(
    'o2',
    OrderSide.ASK,
    OrderType.LIMIT,
    1,
  )

  expect(() => book.addOrder(o1)).toThrow('invalid negative price')
  expect(() => book.addOrder(o2)).toThrow('only market orders can be missing price')
})

test('Book reject negative price limit order - bid', () => {
  let book = new Book('test')

  let o1 =  new Order(
    'o1',
    OrderSide.BID,
    OrderType.LIMIT,
    1,
    -1,
  )

  let o2 =  new Order(
    'o2',
    OrderSide.BID,
    OrderType.LIMIT,
    1,
  )

  expect(() => book.addOrder(o1)).toThrow('invalid negative price')
  expect(() => book.addOrder(o2)).toThrow('only market orders can be missing price')
})

test('Book reject 0 quantity order - ask', () => {
  let book = new Book('test')

  let o1 = new Order(
    'o1',
    OrderSide.ASK,
    OrderType.LIMIT,
    0,
  )

  expect(() => book.addOrder(o1)).toThrow('invalid non-positive quantity')
})

test('Book reject 0 quantity order - bid', () => {
  let book = new Book('test')

  let o1 = new Order(
    'o1',
    OrderSide.BID,
    OrderType.LIMIT,
    0,
  )

  expect(() => book.addOrder(o1)).toThrow('invalid non-positive quantity')
})

test('Book no overlapping spread', () => {
  let book = new Book('test')

  let o1 =  new Order(
    'o1',
    OrderSide.ASK,
    OrderType.LIMIT,
    1,
    100,
  )

  let o2 = new Order(
    'o2',
    OrderSide.BID,
    OrderType.LIMIT,
    1,
    1,
  )

  book.addOrder(o1)
  book.addOrder(o2)

  // only limit shows up as pending
  expect(book.pendingOrderBook.size).toBe(2)

  let trades = book.settle()
  expect(trades.length).toBe(0)

  let bids = book.orderBook
  expect(bids.size).toBe(2)
})

test('Book Limit & Market order, same quantity ask first', () => {
  let book = new Book('test')

  let o1 =  new Order(
    'o1',
    OrderSide.ASK,
    OrderType.LIMIT,
    1,
    3,
  )

  let o2 = new Order(
    'o2',
    OrderSide.BID,
    OrderType.MARKET,
    1,
  )

  book.addOrder(o1)
  book.addOrder(o2)
  // only limit shows up as pending
  expect(book.pendingOrderBook.size).toBe(1)

  let trades = book.settle()
  expect(trades.length).toBe(1)
  expect(o1.status).toBe(OrderStatus.FILLED)
  expect(o2.status).toBe(OrderStatus.FILLED)
  expect(o1.fillQuantity.equals(o2.quantity)).toBe(true)
  expect(o2.fillQuantity.equals(o2.quantity)).toBe(true)

  let trade = trades[0]
  expect(trade.matchedOrders.length).toBe(2)
  expect(trade.matchedOrders).toContain(o1)
  expect(trade.matchedOrders).toContain(o2)
  expect(trade.newOrders.length).toBe(0)
  expect(trade.rejectedOrders.length).toBe(0)
  expect(trade.fillPrice.equals(o1.price)).toBe(true)
  expect(trade.fillQuantity.equals(o2.quantity)).toBe(true)

  let bids = book.orderBook
  expect(bids.size).toBe(0)
})

test('Book Limit & Market order, same quantity bid first', () => {
  let book = new Book('test')

  let o1 =  new Order(
    'o1',
    OrderSide.BID,
    OrderType.LIMIT,
    1,
    3,
  )

  let o2 = new Order(
    'o2',
    OrderSide.ASK,
    OrderType.MARKET,
    1,
  )

  book.addOrder(o1)
  book.addOrder(o2)
  // only limit shows up as pending
  expect(book.pendingOrderBook.size).toBe(1)

  let trades = book.settle()
  expect(trades.length).toBe(1)
  expect(o1.status).toBe(OrderStatus.FILLED)
  expect(o2.status).toBe(OrderStatus.FILLED)
  expect(o1.fillQuantity.equals(o2.quantity)).toBe(true)
  expect(o2.fillQuantity.equals(o2.quantity)).toBe(true)

  let trade = trades[0]
  expect(trade.matchedOrders.length).toBe(2)
  expect(trade.matchedOrders).toContain(o1)
  expect(trade.matchedOrders).toContain(o2)
  expect(trade.newOrders.length).toBe(0)
  expect(trade.rejectedOrders.length).toBe(0)
  expect(trade.fillPrice.equals(o1.price)).toBe(true)
  expect(trade.fillQuantity.equals(o2.quantity)).toBe(true)

  let bids = book.orderBook
  expect(bids.size).toBe(0)
})

test('Book Single market bid order should reject', () => {
  let book = new Book('test')

  let o1 =  new Order(
    'o1',
    OrderSide.ASK,
    OrderType.MARKET,
    1,
  )

  expect(() => book.addOrder(o1)).toThrow('no bids for market order')
})

test('Book Single market ask order should reject', () => {
  let book = new Book('test')

  let o1 =  new Order(
    'o1',
    OrderSide.BID,
    OrderType.MARKET,
    1,
  )

  expect(() => book.addOrder(o1)).toThrow('no asks for market order')
})

/* --- market orders --- */

test('Book Limit & Market order, larger ask limit', () => {
  let book = new Book('test')

  let o1 =  new Order(
    'o1',
    OrderSide.ASK,
    OrderType.LIMIT,
    3,
    10,
  )

  let o2 = new Order(
    'o2',
    OrderSide.BID,
    OrderType.MARKET,
    2,
  )

  book.addOrder(o1)
  book.addOrder(o2)
  // only limit shows up as pending
  expect(book.pendingOrderBook.size).toBe(1)

  let trades = book.settle()
  expect(trades.length).toBe(1)
  expect(o1.status).toBe(OrderStatus.PARTIALLY_FILLED)
  expect(o1.fillQuantity.equals(o2.fillQuantity)).toBe(true)
  expect(o2.status).toBe(OrderStatus.FILLED)
  expect(o2.fillQuantity.equals(o2.quantity)).toBe(true)

  let trade = trades[0]
  expect(trade.matchedOrders.length).toBe(2)
  expect(trade.matchedOrders).toContain(o1)
  expect(trade.matchedOrders).toContain(o2)
  expect(trade.newOrders.length).toBe(1)
  expect(trade.newOrders[0].status).toBe(OrderStatus.REMAINDER)
  expect(trade.newOrders[0].type).toBe(o1.type)
  expect(trade.newOrders[0].price.equals(o1.price)).toBe(true)
  expect(trade.newOrders[0].quantity.equals(o1.quantity.sub(o2.fillQuantity))).toBe(true)
  expect(trade.rejectedOrders.length).toBe(0)
  expect(trade.fillPrice.equals(o1.price)).toBe(true)
  expect(trade.fillQuantity.equals(o2.quantity)).toBe(true)

  let bids = book.orderBook
  expect(bids.size).toBe(1)
  expect(bids.get('10')?.equals(o1.quantity.sub(o2.quantity))).toBe(true)
})

test('Book Limit & Market order, larger bid limit', () => {
  let book = new Book('test')

  let o1 =  new Order(
    'o1',
    OrderSide.BID,
    OrderType.LIMIT,
    3,
    10,
  )

  let o2 = new Order(
    'o2',
    OrderSide.ASK,
    OrderType.MARKET,
    2,
  )

  book.addOrder(o1)
  book.addOrder(o2)
  // only limit shows up as pending
  expect(book.pendingOrderBook.size).toBe(1)

  let trades = book.settle()
  expect(trades.length).toBe(1)
  expect(o1.status).toBe(OrderStatus.PARTIALLY_FILLED)
  expect(o1.fillQuantity.equals(o2.fillQuantity)).toBe(true)
  expect(o2.status).toBe(OrderStatus.FILLED)
  expect(o2.fillQuantity.equals(o2.quantity)).toBe(true)

  let trade = trades[0]
  expect(trade.matchedOrders.length).toBe(2)
  expect(trade.matchedOrders).toContain(o1)
  expect(trade.matchedOrders).toContain(o2)
  expect(trade.newOrders.length).toBe(1)
  expect(trade.newOrders[0].status).toBe(OrderStatus.REMAINDER)
  expect(trade.newOrders[0].type).toBe(o1.type)
  expect(trade.newOrders[0].price.equals(o1.price)).toBe(true)
  expect(trade.newOrders[0].quantity.equals(o1.quantity.sub(o2.fillQuantity))).toBe(true)
  expect(trade.rejectedOrders.length).toBe(0)
  expect(trade.fillPrice.equals(o1.price)).toBe(true)
  expect(trade.fillQuantity.equals(o2.quantity)).toBe(true)

  let bids = book.orderBook
  expect(bids.size).toBe(1)
  expect(bids.get('10')?.equals(o1.quantity.sub(o2.quantity))).toBe(true)
})

test('Book Limit & Market order, larger market sitting ask', () => {
  let book = new Book('test')

  let o1 =  new Order(
    'o1',
    OrderSide.ASK,
    OrderType.LIMIT,
    3,
    10,
  )

  let o2 = new Order(
    'o2',
    OrderSide.BID,
    OrderType.MARKET,
    6,
  )

  book.addOrder(o1)
  book.addOrder(o2)
  // only limit shows up as pending
  expect(book.pendingOrderBook.size).toBe(1)

  let trades = book.settle()
  expect(trades.length).toBe(1)
  expect(o1.status).toBe(OrderStatus.FILLED)
  expect(o1.fillQuantity.equals(o1.fillQuantity)).toBe(true)
  expect(o2.status).toBe(OrderStatus.PARTIALLY_FILLED_REMAINDER_REJECTED)
  expect(o2.fillQuantity.equals(o1.quantity)).toBe(true)

  let trade = trades[0]
  expect(trade.matchedOrders.length).toBe(2)
  expect(trade.matchedOrders).toContain(o1)
  expect(trade.matchedOrders).toContain(o2)
  expect(trade.newOrders.length).toBe(1)
  expect(trade.newOrders[0].status).toBe(OrderStatus.REMAINDER_REJECTED)
  expect(trade.newOrders[0].type).toBe(o2.type)
  expect(trade.newOrders[0].price.equals(o2.price)).toBe(true)
  expect(trade.newOrders[0].quantity.equals(o2.quantity.sub(o1.quantity))).toBe(true)
  expect(trade.rejectedOrders.length).toBe(1)
  expect(trade.rejectedOrders[0]).toBe(trade.newOrders[0])
  expect(trade.fillPrice.equals(o1.price)).toBe(true)
  expect(trade.fillQuantity.equals(o1.quantity)).toBe(true)

  let bids = book.orderBook
  expect(bids.size).toBe(0)
})

test('Book Limit & Market order, larger market sitting bid', () => {
  let book = new Book('test')

  let o1 =  new Order(
    'o1',
    OrderSide.BID,
    OrderType.LIMIT,
    3,
    10,
  )

  let o2 = new Order(
    'o2',
    OrderSide.ASK,
    OrderType.MARKET,
    6,
  )

  book.addOrder(o1)
  book.addOrder(o2)
  // only limit shows up as pending
  expect(book.pendingOrderBook.size).toBe(1)

  let trades = book.settle()
  expect(trades.length).toBe(1)
  expect(o1.status).toBe(OrderStatus.FILLED)
  expect(o1.fillQuantity.equals(o1.fillQuantity)).toBe(true)
  expect(o2.status).toBe(OrderStatus.PARTIALLY_FILLED_REMAINDER_REJECTED)
  expect(o2.fillQuantity.equals(o1.quantity)).toBe(true)

  let trade = trades[0]
  expect(trade.matchedOrders.length).toBe(2)
  expect(trade.matchedOrders).toContain(o1)
  expect(trade.matchedOrders).toContain(o2)
  expect(trade.newOrders.length).toBe(1)
  expect(trade.newOrders[0].status).toBe(OrderStatus.REMAINDER_REJECTED)
  expect(trade.newOrders[0].type).toBe(o2.type)
  expect(trade.newOrders[0].price.equals(o2.price)).toBe(true)
  expect(trade.newOrders[0].quantity.equals(o2.quantity.sub(o1.quantity))).toBe(true)
  expect(trade.rejectedOrders.length).toBe(1)
  expect(trade.rejectedOrders[0]).toBe(trade.newOrders[0])
  expect(trade.fillPrice.equals(o1.price)).toBe(true)
  expect(trade.fillQuantity.equals(o1.quantity)).toBe(true)

  let bids = book.orderBook
  expect(bids.size).toBe(0)
})

test('Book Limit & Market order, larger market sitting asks', () => {
  let book = new Book('test')

  let o1 =  new Order(
    'o1',
    OrderSide.ASK,
    OrderType.LIMIT,
    3,
    10,
  )

  let o2 = new Order(
    'o2',
    OrderSide.BID,
    OrderType.MARKET,
    6,
  )

  let o3 =  new Order(
    'o3',
    OrderSide.ASK,
    OrderType.LIMIT,
    2,
    12,
  )

  book.addOrder(o1)
  book.addOrder(o2)
  book.addOrder(o3)

  // only limit shows up as pending
  expect(book.pendingOrderBook.size).toBe(2)

  let trades = book.settle()
  expect(trades.length).toBe(2)
  expect(o1.status).toBe(OrderStatus.FILLED)
  expect(o1.fillQuantity.equals(o1.fillQuantity)).toBe(true)
  expect(o3.status).toBe(OrderStatus.FILLED)
  expect(o1.fillQuantity.equals(o1.fillQuantity)).toBe(true)
  expect(o2.status).toBe(OrderStatus.PARTIALLY_FILLED)
  expect(o2.fillQuantity.equals(o1.quantity)).toBe(true)

  let trade = trades[0]
  expect(trade.matchedOrders.length).toBe(2)
  expect(trade.matchedOrders).toContain(o1)
  expect(trade.matchedOrders).toContain(o2)
  expect(trade.newOrders.length).toBe(1)
  expect(trade.newOrders[0].status).toBe(OrderStatus.PARTIALLY_FILLED_REMAINDER_REJECTED)
  expect(trade.newOrders[0].type).toBe(o2.type)
  expect(trade.newOrders[0].price.equals(o2.price)).toBe(true)
  expect(trade.newOrders[0].quantity.equals(o2.quantity.sub(o1.quantity))).toBe(true)
  expect(trade.rejectedOrders.length).toBe(0)
  expect(trade.fillPrice.equals(o1.price)).toBe(true)
  expect(trade.fillQuantity.equals(o1.quantity)).toBe(true)

  trade = trades[1]
  expect(trade.newOrders[0].status).toBe(OrderStatus.REMAINDER_REJECTED)
  expect(trade.newOrders[0].type).toBe(o2.type)
  expect(trade.newOrders[0].price.equals(o2.price)).toBe(true)
  expect(trade.newOrders[0].quantity.equals(o2.quantity.sub(o1.quantity).sub(o3.quantity))).toBe(true)
  expect(trade.rejectedOrders.length).toBe(1)
  expect(trade.rejectedOrders[0]).toBe(trade.newOrders[0])
  expect(trade.fillPrice.equals(o3.price)).toBe(true)
  expect(trade.fillQuantity.equals(o3.quantity)).toBe(true)

  let bids = book.orderBook
  expect(bids.size).toBe(0)
})

test('Book Limit & Market order, larger market sitting bids', () => {
  let book = new Book('test')

  let o1 =  new Order(
    'o1',
    OrderSide.BID,
    OrderType.LIMIT,
    3,
    12,
  )

  let o2 = new Order(
    'o2',
    OrderSide.ASK,
    OrderType.MARKET,
    6,
  )

  let o3 =  new Order(
    'o3',
    OrderSide.BID,
    OrderType.LIMIT,
    2,
    10,
  )

  book.addOrder(o1)
  book.addOrder(o2)
  book.addOrder(o3)

  // only limit shows up as pending
  expect(book.pendingOrderBook.size).toBe(2)

  let trades = book.settle()
  expect(trades.length).toBe(2)
  expect(o1.status).toBe(OrderStatus.FILLED)
  expect(o1.fillQuantity.equals(o1.fillQuantity)).toBe(true)
  expect(o3.status).toBe(OrderStatus.FILLED)
  expect(o1.fillQuantity.equals(o1.fillQuantity)).toBe(true)
  expect(o2.status).toBe(OrderStatus.PARTIALLY_FILLED)
  expect(o2.fillQuantity.equals(o1.quantity)).toBe(true)

  let trade = trades[0]
  expect(trade.matchedOrders.length).toBe(2)
  expect(trade.matchedOrders).toContain(o1)
  expect(trade.matchedOrders).toContain(o2)
  expect(trade.newOrders.length).toBe(1)
  expect(trade.newOrders[0].status).toBe(OrderStatus.PARTIALLY_FILLED_REMAINDER_REJECTED)
  expect(trade.newOrders[0].type).toBe(o2.type)
  expect(trade.newOrders[0].price.equals(o2.price)).toBe(true)
  expect(trade.newOrders[0].quantity.equals(o2.quantity.sub(o1.quantity))).toBe(true)
  expect(trade.rejectedOrders.length).toBe(0)
  expect(trade.fillPrice.equals(o1.price)).toBe(true)
  expect(trade.fillQuantity.equals(o1.quantity)).toBe(true)

  trade = trades[1]
  expect(trade.newOrders[0].status).toBe(OrderStatus.REMAINDER_REJECTED)
  expect(trade.newOrders[0].type).toBe(o2.type)
  expect(trade.newOrders[0].price.equals(o2.price)).toBe(true)
  expect(trade.newOrders[0].quantity.equals(o2.quantity.sub(o1.quantity).sub(o3.quantity))).toBe(true)
  expect(trade.rejectedOrders.length).toBe(1)
  expect(trade.rejectedOrders[0]).toBe(trade.newOrders[0])
  expect(trade.fillPrice.equals(o3.price)).toBe(true)
  expect(trade.fillQuantity.equals(o3.quantity)).toBe(true)

  let bids = book.orderBook
  expect(bids.size).toBe(0)
})

test('Book Limit & Market order, smaller market sitting asks', () => {
  let book = new Book('test')

  let o1 =  new Order(
    'o1',
    OrderSide.ASK,
    OrderType.LIMIT,
    3,
    10,
  )

  let o2 = new Order(
    'o2',
    OrderSide.BID,
    OrderType.MARKET,
    4,
  )

  let o3 =  new Order(
    'o3',
    OrderSide.ASK,
    OrderType.LIMIT,
    2,
    12,
  )

  book.addOrder(o1)
  book.addOrder(o2)
  book.addOrder(o3)

  // only limit shows up as pending
  expect(book.pendingOrderBook.size).toBe(2)

  let trades = book.settle()
  expect(trades.length).toBe(2)
  expect(o1.status).toBe(OrderStatus.FILLED)
  expect(o1.fillQuantity.equals(o1.fillQuantity)).toBe(true)
  expect(o3.status).toBe(OrderStatus.PARTIALLY_FILLED)
  expect(o1.fillQuantity.equals(o1.fillQuantity)).toBe(true)
  expect(o2.status).toBe(OrderStatus.PARTIALLY_FILLED)
  expect(o2.fillQuantity.equals(o1.quantity)).toBe(true)

  let trade = trades[0]
  expect(trade.matchedOrders.length).toBe(2)
  expect(trade.matchedOrders).toContain(o1)
  expect(trade.matchedOrders).toContain(o2)
  expect(trade.newOrders.length).toBe(1)
  expect(trade.newOrders[0].status).toBe(OrderStatus.FILLED)
  expect(trade.newOrders[0].type).toBe(o2.type)
  expect(trade.newOrders[0].price.equals(o2.price)).toBe(true)
  expect(trade.newOrders[0].quantity.equals(o2.quantity.sub(o1.quantity))).toBe(true)
  expect(trade.rejectedOrders.length).toBe(0)
  expect(trade.fillPrice.equals(o1.price)).toBe(true)
  expect(trade.fillQuantity.equals(o1.quantity)).toBe(true)

  let remainderQuantity = o1.quantity.add(o3.quantity).sub(o2.quantity)

  trade = trades[1]
  expect(trade.newOrders[0].status).toBe(OrderStatus.REMAINDER)
  expect(trade.newOrders[0].type).toBe(o1.type)
  expect(trade.newOrders[0].price.equals(o3.price)).toBe(true)
  expect(trade.newOrders[0].quantity.equals(remainderQuantity)).toBe(true)
  expect(trade.rejectedOrders.length).toBe(0)
  expect(trade.fillPrice.equals(o3.price)).toBe(true)
  expect(trade.fillQuantity.equals(remainderQuantity)).toBe(true)

  let bids = book.orderBook
  expect(bids.size).toBe(1)
  expect(bids.get(o3.price.toString())?.equals(remainderQuantity)).toBe(true)
})

test('Book Limit & Market order, smaller market sitting bids', () => {
  let book = new Book('test')

  let o1 =  new Order(
    'o1',
    OrderSide.BID,
    OrderType.LIMIT,
    3,
    12,
  )

  let o2 = new Order(
    'o2',
    OrderSide.ASK,
    OrderType.MARKET,
    4,
  )

  let o3 =  new Order(
    'o3',
    OrderSide.BID,
    OrderType.LIMIT,
    2,
    10,
  )

  book.addOrder(o1)
  book.addOrder(o2)
  book.addOrder(o3)

  // only limit shows up as pending
  expect(book.pendingOrderBook.size).toBe(2)

  let trades = book.settle()
  expect(trades.length).toBe(2)
  expect(o1.status).toBe(OrderStatus.FILLED)
  expect(o1.fillQuantity.equals(o1.fillQuantity)).toBe(true)
  expect(o3.status).toBe(OrderStatus.PARTIALLY_FILLED)
  expect(o1.fillQuantity.equals(o1.fillQuantity)).toBe(true)
  expect(o2.status).toBe(OrderStatus.PARTIALLY_FILLED)
  expect(o2.fillQuantity.equals(o1.quantity)).toBe(true)

  let trade = trades[0]
  expect(trade.matchedOrders.length).toBe(2)
  expect(trade.matchedOrders).toContain(o1)
  expect(trade.matchedOrders).toContain(o2)
  expect(trade.newOrders.length).toBe(1)
  expect(trade.newOrders[0].status).toBe(OrderStatus.FILLED)
  expect(trade.newOrders[0].type).toBe(o2.type)
  expect(trade.newOrders[0].price.equals(o2.price)).toBe(true)
  expect(trade.newOrders[0].quantity.equals(o2.quantity.sub(o1.quantity))).toBe(true)
  expect(trade.rejectedOrders.length).toBe(0)
  expect(trade.fillPrice.equals(o1.price)).toBe(true)
  expect(trade.fillQuantity.equals(o1.quantity)).toBe(true)

  let remainderQuantity = o1.quantity.add(o3.quantity).sub(o2.quantity)

  trade = trades[1]
  expect(trade.newOrders[0].status).toBe(OrderStatus.REMAINDER)
  expect(trade.newOrders[0].type).toBe(o1.type)
  expect(trade.newOrders[0].price.equals(o3.price)).toBe(true)
  expect(trade.newOrders[0].quantity.equals(remainderQuantity)).toBe(true)
  expect(trade.rejectedOrders.length).toBe(0)
  expect(trade.fillPrice.equals(o3.price)).toBe(true)
  expect(trade.fillQuantity.equals(remainderQuantity)).toBe(true)

  let bids = book.orderBook
  expect(bids.size).toBe(1)
  expect(bids.get(o3.price.toString())?.equals(remainderQuantity)).toBe(true)
})

/* --- aggressive limit orders --- */

test('Book Limit & Aggressive Limit order, larger ask limit', () => {
  let book = new Book('test')

  let o1 =  new Order(
    'o1',
    OrderSide.ASK,
    OrderType.LIMIT,
    3,
    10,
  )

  let o2 = new Order(
    'o2',
    OrderSide.BID,
    OrderType.LIMIT,
    2,
    100,
  )

  book.addOrder(o1)
  book.addOrder(o2)
  // only limit shows up as pending
  expect(book.pendingOrderBook.size).toBe(2)

  let trades = book.settle()
  expect(trades.length).toBe(1)
  expect(o1.status).toBe(OrderStatus.PARTIALLY_FILLED)
  expect(o1.fillQuantity.equals(o2.fillQuantity)).toBe(true)
  expect(o2.status).toBe(OrderStatus.FILLED)
  expect(o2.fillQuantity.equals(o2.quantity)).toBe(true)

  let trade = trades[0]
  expect(trade.matchedOrders.length).toBe(2)
  expect(trade.matchedOrders).toContain(o1)
  expect(trade.matchedOrders).toContain(o2)
  expect(trade.newOrders.length).toBe(1)
  expect(trade.newOrders[0].status).toBe(OrderStatus.REMAINDER)
  expect(trade.newOrders[0].type).toBe(o1.type)
  expect(trade.newOrders[0].price.equals(o1.price)).toBe(true)
  expect(trade.newOrders[0].quantity.equals(o1.quantity.sub(o2.fillQuantity))).toBe(true)
  expect(trade.rejectedOrders.length).toBe(0)
  expect(trade.fillPrice.equals(o2.price)).toBe(true)
  expect(trade.fillQuantity.equals(o2.quantity)).toBe(true)

  let bids = book.orderBook
  expect(bids.size).toBe(1)
  expect(bids.get(o1.price.toString())?.equals(o1.quantity.sub(o2.quantity))).toBe(true)
})

test('Book Limit & Aggressive Limit order, larger bid limit', () => {
  let book = new Book('test')

  let o1 =  new Order(
    'o1',
    OrderSide.BID,
    OrderType.LIMIT,
    3,
    10,
  )

  let o2 = new Order(
    'o2',
    OrderSide.ASK,
    OrderType.LIMIT,
    2,
    1,
  )

  book.addOrder(o1)
  book.addOrder(o2)
  // only limit shows up as pending
  expect(book.pendingOrderBook.size).toBe(2)

  let trades = book.settle()
  expect(trades.length).toBe(1)
  expect(o1.status).toBe(OrderStatus.PARTIALLY_FILLED)
  expect(o1.fillQuantity.equals(o2.fillQuantity)).toBe(true)
  expect(o2.status).toBe(OrderStatus.FILLED)
  expect(o2.fillQuantity.equals(o2.quantity)).toBe(true)

  let trade = trades[0]
  expect(trade.matchedOrders.length).toBe(2)
  expect(trade.matchedOrders).toContain(o1)
  expect(trade.matchedOrders).toContain(o2)
  expect(trade.newOrders.length).toBe(1)
  expect(trade.newOrders[0].status).toBe(OrderStatus.REMAINDER)
  expect(trade.newOrders[0].type).toBe(o1.type)
  expect(trade.newOrders[0].price.equals(o1.price)).toBe(true)
  expect(trade.newOrders[0].quantity.equals(o1.quantity.sub(o2.fillQuantity))).toBe(true)
  expect(trade.rejectedOrders.length).toBe(0)
  expect(trade.fillPrice.equals(o2.price)).toBe(true)
  expect(trade.fillQuantity.equals(o2.quantity)).toBe(true)

  let bids = book.orderBook
  expect(bids.size).toBe(1)
  expect(bids.get(o1.price.toString())?.equals(o1.quantity.sub(o2.quantity))).toBe(true)
})

test('Book Limit & Aggressive Limit order, larger limit sitting ask', () => {
  let book = new Book('test')

  let o1 =  new Order(
    'o1',
    OrderSide.ASK,
    OrderType.LIMIT,
    3,
    10,
  )

  let o2 = new Order(
    'o2',
    OrderSide.BID,
    OrderType.LIMIT,
    6,
    100,
  )

  book.addOrder(o1)
  book.addOrder(o2)
  // only limit shows up as pending
  expect(book.pendingOrderBook.size).toBe(2)

  let trades = book.settle()
  expect(trades.length).toBe(1)
  expect(o1.status).toBe(OrderStatus.FILLED)
  expect(o1.fillQuantity.equals(o1.fillQuantity)).toBe(true)
  expect(o2.status).toBe(OrderStatus.PARTIALLY_FILLED)
  expect(o2.fillQuantity.equals(o1.quantity)).toBe(true)

  let trade = trades[0]
  expect(trade.matchedOrders.length).toBe(2)
  expect(trade.matchedOrders).toContain(o1)
  expect(trade.matchedOrders).toContain(o2)
  expect(trade.newOrders.length).toBe(1)
  expect(trade.newOrders[0].status).toBe(OrderStatus.REMAINDER)
  expect(trade.newOrders[0].type).toBe(o2.type)
  expect(trade.newOrders[0].price.equals(o2.price)).toBe(true)
  expect(trade.newOrders[0].quantity.equals(o2.quantity.sub(o1.quantity))).toBe(true)
  expect(trade.rejectedOrders.length).toBe(0)
  expect(trade.fillPrice.equals(o1.price)).toBe(true)
  expect(trade.fillQuantity.equals(o1.quantity)).toBe(true)

  let bids = book.orderBook
  expect(bids.size).toBe(1)
  expect(bids.get(o2.price.toString())?.equals(o2.quantity.sub(o1.quantity))).toBe(true)
})

test('Book Limit & Aggressive Limit order, larger limit sitting bid', () => {
  let book = new Book('test')

  let o1 =  new Order(
    'o1',
    OrderSide.BID,
    OrderType.LIMIT,
    3,
    10,
  )

  let o2 = new Order(
    'o2',
    OrderSide.ASK,
    OrderType.LIMIT,
    6,
    1,
  )

  book.addOrder(o1)
  book.addOrder(o2)
  // only limit shows up as pending
  expect(book.pendingOrderBook.size).toBe(2)

  let trades = book.settle()
  expect(trades.length).toBe(1)
  expect(o1.status).toBe(OrderStatus.FILLED)
  expect(o1.fillQuantity.equals(o1.fillQuantity)).toBe(true)
  expect(o2.status).toBe(OrderStatus.PARTIALLY_FILLED)
  expect(o2.fillQuantity.equals(o1.quantity)).toBe(true)

  let trade = trades[0]
  expect(trade.matchedOrders.length).toBe(2)
  expect(trade.matchedOrders).toContain(o1)
  expect(trade.matchedOrders).toContain(o2)
  expect(trade.newOrders.length).toBe(1)
  expect(trade.newOrders[0].status).toBe(OrderStatus.REMAINDER)
  expect(trade.newOrders[0].type).toBe(o2.type)
  expect(trade.newOrders[0].price.equals(o2.price)).toBe(true)
  expect(trade.newOrders[0].quantity.equals(o2.quantity.sub(o1.quantity))).toBe(true)
  expect(trade.rejectedOrders.length).toBe(0)
  expect(trade.fillPrice.equals(o1.price)).toBe(true)
  expect(trade.fillQuantity.equals(o1.quantity)).toBe(true)

  let bids = book.orderBook
  expect(bids.size).toBe(1)
  expect(bids.get(o2.price.toString())?.equals(o2.quantity.sub(o1.quantity))).toBe(true)
})

test('Book Limit & Aggressive Limit order, larger market sitting asks', () => {
  let book = new Book('test')

  let o1 =  new Order(
    'o1',
    OrderSide.ASK,
    OrderType.LIMIT,
    3,
    10,
  )

  let o2 = new Order(
    'o2',
    OrderSide.BID,
    OrderType.LIMIT,
    6,
    100,
  )

  let o3 =  new Order(
    'o3',
    OrderSide.ASK,
    OrderType.LIMIT,
    2,
    12,
  )

  book.addOrder(o1)
  book.addOrder(o2)
  book.addOrder(o3)

  // only limit shows up as pending
  expect(book.pendingOrderBook.size).toBe(3)

  let trades = book.settle()
  expect(trades.length).toBe(2)
  expect(o1.status).toBe(OrderStatus.FILLED)
  expect(o1.fillQuantity.equals(o1.fillQuantity)).toBe(true)
  expect(o3.status).toBe(OrderStatus.FILLED)
  expect(o1.fillQuantity.equals(o1.fillQuantity)).toBe(true)
  expect(o2.status).toBe(OrderStatus.PARTIALLY_FILLED)
  expect(o2.fillQuantity.equals(o1.quantity)).toBe(true)

  let trade = trades[0]
  expect(trade.matchedOrders.length).toBe(2)
  expect(trade.matchedOrders).toContain(o1)
  expect(trade.matchedOrders).toContain(o2)
  expect(trade.newOrders.length).toBe(1)
  expect(trade.newOrders[0].status).toBe(OrderStatus.PARTIALLY_FILLED)
  expect(trade.newOrders[0].type).toBe(o2.type)
  expect(trade.newOrders[0].price.equals(o2.price)).toBe(true)
  expect(trade.newOrders[0].quantity.equals(o2.quantity.sub(o1.quantity))).toBe(true)
  expect(trade.rejectedOrders.length).toBe(0)
  expect(trade.fillPrice.equals(o1.price)).toBe(true)
  expect(trade.fillQuantity.equals(o1.quantity)).toBe(true)

  trade = trades[1]
  expect(trade.newOrders[0].status).toBe(OrderStatus.REMAINDER)
  expect(trade.newOrders[0].type).toBe(o2.type)
  expect(trade.newOrders[0].price.equals(o2.price)).toBe(true)
  expect(trade.newOrders[0].quantity.equals(o2.quantity.sub(o1.quantity).sub(o3.quantity))).toBe(true)
  expect(trade.rejectedOrders.length).toBe(0)
  expect(trade.fillPrice.equals(o3.price)).toBe(true)
  expect(trade.fillQuantity.equals(o3.quantity)).toBe(true)

  let bids = book.orderBook
  expect(bids.size).toBe(1)
  expect(bids.get(o2.price.toString())?.equals(o2.quantity.sub(o1.quantity).sub(o3.quantity))).toBe(true)
})

test('Book Limit & Aggressive Limit order, larger market sitting bids', () => {
  let book = new Book('test')

  let o1 =  new Order(
    'o1',
    OrderSide.BID,
    OrderType.LIMIT,
    3,
    12,
  )

  let o2 = new Order(
    'o2',
    OrderSide.ASK,
    OrderType.LIMIT,
    6,
    1,
  )

  let o3 =  new Order(
    'o3',
    OrderSide.BID,
    OrderType.LIMIT,
    2,
    10,
  )

  book.addOrder(o1)
  book.addOrder(o2)
  book.addOrder(o3)

  // only limit shows up as pending
  expect(book.pendingOrderBook.size).toBe(3)

  let trades = book.settle()
  expect(trades.length).toBe(2)
  expect(o1.status).toBe(OrderStatus.FILLED)
  expect(o1.fillQuantity.equals(o1.fillQuantity)).toBe(true)
  expect(o3.status).toBe(OrderStatus.FILLED)
  expect(o1.fillQuantity.equals(o1.fillQuantity)).toBe(true)
  expect(o2.status).toBe(OrderStatus.PARTIALLY_FILLED)
  expect(o2.fillQuantity.equals(o1.quantity)).toBe(true)

  let trade = trades[0]
  expect(trade.matchedOrders.length).toBe(2)
  expect(trade.matchedOrders).toContain(o1)
  expect(trade.matchedOrders).toContain(o2)
  expect(trade.newOrders.length).toBe(1)
  expect(trade.newOrders[0].status).toBe(OrderStatus.PARTIALLY_FILLED)
  expect(trade.newOrders[0].type).toBe(o2.type)
  expect(trade.newOrders[0].price.equals(o2.price)).toBe(true)
  expect(trade.newOrders[0].quantity.equals(o2.quantity.sub(o1.quantity))).toBe(true)
  expect(trade.rejectedOrders.length).toBe(0)
  expect(trade.fillPrice.equals(o1.price)).toBe(true)
  expect(trade.fillQuantity.equals(o1.quantity)).toBe(true)

  trade = trades[1]
  expect(trade.newOrders[0].status).toBe(OrderStatus.REMAINDER)
  expect(trade.newOrders[0].type).toBe(o2.type)
  expect(trade.newOrders[0].price.equals(o2.price)).toBe(true)
  expect(trade.newOrders[0].quantity.equals(o2.quantity.sub(o1.quantity).sub(o3.quantity))).toBe(true)
  expect(trade.rejectedOrders.length).toBe(0)
  expect(trade.fillPrice.equals(o3.price)).toBe(true)
  expect(trade.fillQuantity.equals(o3.quantity)).toBe(true)

  let bids = book.orderBook
  expect(bids.size).toBe(1)
  expect(bids.get(o2.price.toString())?.equals(o2.quantity.sub(o1.quantity).sub(o3.quantity))).toBe(true)
})

test('Book Limit & Aggressive Limit order, smaller market sitting asks', () => {
  let book = new Book('test')

  let o1 =  new Order(
    'o1',
    OrderSide.ASK,
    OrderType.LIMIT,
    3,
    10,
  )

  let o2 = new Order(
    'o2',
    OrderSide.BID,
    OrderType.LIMIT,
    4,
    100,
  )

  let o3 =  new Order(
    'o3',
    OrderSide.ASK,
    OrderType.LIMIT,
    2,
    12,
  )

  book.addOrder(o1)
  book.addOrder(o2)
  book.addOrder(o3)

  // only limit shows up as pending
  expect(book.pendingOrderBook.size).toBe(3)

  let trades = book.settle()
  expect(trades.length).toBe(2)
  expect(o1.status).toBe(OrderStatus.FILLED)
  expect(o1.fillQuantity.equals(o1.fillQuantity)).toBe(true)
  expect(o3.status).toBe(OrderStatus.PARTIALLY_FILLED)
  expect(o1.fillQuantity.equals(o1.fillQuantity)).toBe(true)
  expect(o2.status).toBe(OrderStatus.PARTIALLY_FILLED)
  expect(o2.fillQuantity.equals(o1.quantity)).toBe(true)

  let trade = trades[0]
  expect(trade.matchedOrders.length).toBe(2)
  expect(trade.matchedOrders).toContain(o1)
  expect(trade.matchedOrders).toContain(o2)
  expect(trade.newOrders.length).toBe(1)
  expect(trade.newOrders[0].status).toBe(OrderStatus.FILLED)
  expect(trade.newOrders[0].type).toBe(o2.type)
  expect(trade.newOrders[0].price.equals(o2.price)).toBe(true)
  expect(trade.newOrders[0].quantity.equals(o2.quantity.sub(o1.quantity))).toBe(true)
  expect(trade.rejectedOrders.length).toBe(0)
  expect(trade.fillPrice.equals(o1.price)).toBe(true)
  expect(trade.fillQuantity.equals(o1.quantity)).toBe(true)

  let remainderQuantity = o1.quantity.add(o3.quantity).sub(o2.quantity)

  trade = trades[1]
  expect(trade.newOrders[0].status).toBe(OrderStatus.REMAINDER)
  expect(trade.newOrders[0].type).toBe(o1.type)
  expect(trade.newOrders[0].price.equals(o3.price)).toBe(true)
  expect(trade.newOrders[0].quantity.equals(remainderQuantity)).toBe(true)
  expect(trade.rejectedOrders.length).toBe(0)
  expect(trade.fillPrice.equals(o2.price)).toBe(true)
  expect(trade.fillQuantity.equals(remainderQuantity)).toBe(true)

  let bids = book.orderBook
  expect(bids.size).toBe(1)
  expect(bids.get(o3.price.toString())?.equals(remainderQuantity)).toBe(true)
})

test('Book Limit & Aggressive Limit order, smaller market sitting bids', () => {
  let book = new Book('test')

  let o1 =  new Order(
    'o1',
    OrderSide.BID,
    OrderType.LIMIT,
    3,
    12,
  )

  let o2 = new Order(
    'o2',
    OrderSide.ASK,
    OrderType.LIMIT,
    4,
    1,
  )

  let o3 =  new Order(
    'o3',
    OrderSide.BID,
    OrderType.LIMIT,
    2,
    10,
  )

  book.addOrder(o1)
  book.addOrder(o2)
  book.addOrder(o3)

  // only limit shows up as pending
  expect(book.pendingOrderBook.size).toBe(3)

  let trades = book.settle()
  expect(trades.length).toBe(2)
  expect(o1.status).toBe(OrderStatus.FILLED)
  expect(o1.fillQuantity.equals(o1.fillQuantity)).toBe(true)
  expect(o3.status).toBe(OrderStatus.PARTIALLY_FILLED)
  expect(o1.fillQuantity.equals(o1.fillQuantity)).toBe(true)
  expect(o2.status).toBe(OrderStatus.PARTIALLY_FILLED)
  expect(o2.fillQuantity.equals(o1.quantity)).toBe(true)

  let trade = trades[0]
  expect(trade.matchedOrders.length).toBe(2)
  expect(trade.matchedOrders).toContain(o1)
  expect(trade.matchedOrders).toContain(o2)
  expect(trade.newOrders.length).toBe(1)
  expect(trade.newOrders[0].status).toBe(OrderStatus.FILLED)
  expect(trade.newOrders[0].type).toBe(o2.type)
  expect(trade.newOrders[0].price.equals(o2.price)).toBe(true)
  expect(trade.newOrders[0].quantity.equals(o2.quantity.sub(o1.quantity))).toBe(true)
  expect(trade.rejectedOrders.length).toBe(0)
  expect(trade.fillPrice.equals(o1.price)).toBe(true)
  expect(trade.fillQuantity.equals(o1.quantity)).toBe(true)

  let remainderQuantity = o1.quantity.add(o3.quantity).sub(o2.quantity)

  trade = trades[1]
  expect(trade.newOrders[0].status).toBe(OrderStatus.REMAINDER)
  expect(trade.newOrders[0].type).toBe(o1.type)
  expect(trade.newOrders[0].price.equals(o3.price)).toBe(true)
  expect(trade.newOrders[0].quantity.equals(remainderQuantity)).toBe(true)
  expect(trade.rejectedOrders.length).toBe(0)
  expect(trade.fillPrice.equals(o2.price)).toBe(true)
  expect(trade.fillQuantity.equals(remainderQuantity)).toBe(true)

  let bids = book.orderBook
  expect(bids.size).toBe(1)
  expect(bids.get(o3.price.toString())?.equals(remainderQuantity)).toBe(true)
})


