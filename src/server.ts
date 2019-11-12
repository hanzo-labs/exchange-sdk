import http from 'http'
import random from 'random'

import createHttp from './servers/http'
import Book from './Book'
import Candle, { CandleInterval, CandleAVL } from './Candle'
import Order, { OrderSide, OrderType} from './Order'
import time from './utils/time'

const exp = random.exponential(1)
const nrm = random.normal(1, 1)

const testBook = new Book('test')
const c1m = new CandleAVL(CandleInterval.ONE_MINUTE)
const c1h = new CandleAVL(CandleInterval.ONE_HOUR)
const c1d = new CandleAVL(CandleInterval.ONE_DAY)

let t = time().valueOf() - (1000 * 10001)

console.log('started generating 10000 orders')

// random input
for (let i = 0; i < 10000; i++) {
  try {
    testBook.addOrder(new Order(
      'rnd' + i,
      random.boolean() ? OrderSide.ASK : OrderSide.BID,
      random.int(0, 10) > 1 ? OrderType.LIMIT : OrderType.MARKET,
      Math.round(100 * exp()),
      Math.round(100 * nrm() + 50),
      0,
      t += 1000,
    ))

    let trades = testBook.settle()
    for (let trade of trades) {
      trade.executedAt = t
    }

    c1m.tradesToCandles(trades)
    c1h.tradesToCandles(trades)
    c1d.tradesToCandles(trades)
  } catch(e) {
  }
}

console.log('finished generating 10000 orders')

const books = new Map<string, Book>([
  ['test', testBook],
])

const candleTrees = new Map<string,Map<CandleInterval, CandleAVL>>([
  [
    'test', new Map<CandleInterval, CandleAVL>([
      [CandleInterval.ONE_MINUTE, c1m],
      [CandleInterval.ONE_HOUR, c1h],
      [CandleInterval.ONE_DAY, c1d],
    ]),
  ],
])

const app = createHttp(books, candleTrees)

const ctx = testBook.start((tb, trades) => {
  try {
    testBook.addOrder(new Order(
      'rnd',
      random.boolean() ? OrderSide.ASK : OrderSide.BID,
      random.int(0, 10) > 1 ? OrderType.LIMIT : OrderType.MARKET,
      Math.round(10 * exp()),
      Math.round(10 * nrm() + testBook.meanPrice.toNumber()),
    ))
  } catch(e) {
  }

  if (trades.length === 0) {
    return
  }

  console.log(trades.length, 'trades')
  c1m.tradesToCandles(trades)
  c1h.tradesToCandles(trades)
  c1d.tradesToCandles(trades)
})

const port = 4000
http.createServer(app).listen(port)
console.log('listening on port', port)
