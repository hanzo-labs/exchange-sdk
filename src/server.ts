import random from 'random'

import createHttp from './servers/http'
import Book from './Book'
import Candle, { CandleInterval, CandleAVL } from './Candle'
import createSocketIO from './servers/socketio'
import Order, { OrderSide, OrderType} from './Order'
import time from './utils/time'

const nrm = random.normal(1, 1)

// Big Data Structures
const books = new Map<string, Book>()
const candleTrees = new Map<string,Map<CandleInterval, CandleAVL>>()

const createBook = (name: string) => {
  if (books.get(name)) {
    // Early out
    console.log('We already have a room for', name)
    return
  }

  const newBook = new Book(name)

  const c1m = new CandleAVL(CandleInterval.ONE_MINUTE)
  const c1h = new CandleAVL(CandleInterval.ONE_HOUR)
  const c1d = new CandleAVL(CandleInterval.ONE_DAY)
  const c1w = new CandleAVL(CandleInterval.ONE_WEEK)

  candleTrees.set(
    name, new Map<CandleInterval, CandleAVL>([
      [CandleInterval.ONE_MINUTE, c1m],
      [CandleInterval.ONE_HOUR, c1h],
      [CandleInterval.ONE_DAY, c1d],
      [CandleInterval.ONE_WEEK, c1w],
    ])
  )

  let t = time().valueOf() - (10000 * 100001)

  console.log(`Creating order book with 100000 orders for ${name}`)

  // insert super order for test sanity reasons
  newBook.addOrder(new Order(
    'baseline',
    OrderSide.BID,
    OrderType.LIMIT,
    10000000000,
    100,
    0,
    t,
  ))

  newBook.addOrder(new Order(
    'baseline',
    OrderSide.ASK,
    OrderType.LIMIT,
    10000000000,
    900,
    0,
    t,
  ))

  for (let j = 0; j < 10; j++) {
    try {
      newBook.addOrder(new Order(
        'rndbase' + j,
        random.boolean() ? OrderSide.ASK : OrderSide.BID,
        random.int(0, 10) > 1 ? OrderType.LIMIT : OrderType.MARKET,
        random.int(0, 1000),
        random.float(0, 1000).toFixed(2),
        0,
        t,
      ))
    } catch(e) {
      // console.error(`Error creating book for ${name}`, e)
    }
  }

  newBook.settle()

  // random input
  for (let i = 0; i < 10000; i++) {
    for (let j = 0; j < 10; j++) {
      try {
        t += 10000
        newBook.addOrder(new Order(
          'rnd' + i,
          random.boolean() ? OrderSide.ASK : OrderSide.BID,
          random.int(0, 10) > 1 ? OrderType.LIMIT : OrderType.MARKET,
          random.int(0, 1000),
          (random.float(0, newBook.spread.toNumber() * 10) - newBook.spread.toNumber() * 5 + newBook.meanPrice.toNumber()).toFixed(2),
          0,
          t,
        ))
      } catch(e) {
        // console.error(`Error creating book for ${name}`, e)
      }
    }

    let trades = newBook.settle()
    for (let trade of trades) {
      trade.executedAt = t
    }

    c1m.tradesToCandles(trades)
    c1h.tradesToCandles(trades)
    c1d.tradesToCandles(trades)
    c1w.tradesToCandles(trades)
  }

  books.set(name, newBook)
  // Set candles
  //
  newBook.start((tb, trades) => {
    try {
      if (random.int(0, 10) === 1) {
        newBook.addOrder(new Order(
          'rnd-live-' + time().valueOf(),
          random.boolean() ? OrderSide.ASK : OrderSide.BID,
          random.boolean() ? OrderType.LIMIT : OrderType.MARKET,
          random.int(0, 1000) * 10,
          (random.float(0, newBook.spread.toNumber() * 10) - newBook.spread.toNumber() * 5 + newBook.meanPrice.toNumber()).toFixed(2),
        ))
      }
    } catch(e) {
    }

    if (trades.length === 0) {
      return
    }

    c1m.tradesToCandles(trades)
    c1h.tradesToCandles(trades)
    c1d.tradesToCandles(trades)
    c1w.tradesToCandles(trades)
  })
  console.log(`Finished setting up orderbook - ${name}`)
  return newBook
}

const app = createHttp(books, candleTrees)

const port = 4000
// http.createServer(app).listen(port)
const http = createSocketIO(books, candleTrees, app, createBook)
http.listen(port)
console.log('listening on port', port)
