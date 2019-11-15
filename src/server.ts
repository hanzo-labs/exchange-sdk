import random from 'random'

import createHttp from './servers/http'
import Book from './Book'
import Candle, { CandleInterval, CandleAVL } from './Candle'
import createSocketIO from './servers/socketio'
import Order, { OrderSide, OrderType} from './Order'
import time from './utils/time'

const exp = random.exponential(1)
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

  candleTrees.set(
    name, new Map<CandleInterval, CandleAVL>([
      [CandleInterval.ONE_MINUTE, c1m],
      [CandleInterval.ONE_HOUR, c1h],
      [CandleInterval.ONE_DAY, c1d],
    ])
  )

  let t = time().valueOf() - (10000 * 100001)

  console.log(`Creating order book with 1000000 orders for ${name}`)

  // random input
  for (let i = 0; i < 100000; i++) {
    try {
      t += 10000

      newBook.addOrder(new Order(
        'rnd' + i,
        random.boolean() ? OrderSide.ASK : OrderSide.BID,
        random.int(0, 10) > 1 ? OrderType.LIMIT : OrderType.MARKET,
        Math.round(100 * exp()),
        Math.round(100 * nrm() + 50),
        0,
        t,
      ))

      let trades = newBook.settle()
      for (let trade of trades) {
        trade.executedAt = t
      }

      c1m.tradesToCandles(trades)
      c1h.tradesToCandles(trades)
      c1d.tradesToCandles(trades)
    } catch(e) {
      //console.error(`Error creating book for ${name}`, e)
    }
  }

  books.set(name, newBook)
  // Set candles
  //
  newBook.start((tb, trades) => {
    try {
      newBook.addOrder(new Order(
        'rnd',
        random.boolean() ? OrderSide.ASK : OrderSide.BID,
        random.int(0, 10) > 1 ? OrderType.LIMIT : OrderType.MARKET,
        Math.round(10 * exp()),
        Math.round(10 * nrm() + newBook.meanPrice.toNumber()),
      ))
    } catch(e) {
    }

    if (trades.length === 0) {
      return
    }

    // console.log(trades.length, 'trades')
    c1m.tradesToCandles(trades)
    c1h.tradesToCandles(trades)
    c1d.tradesToCandles(trades)
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
