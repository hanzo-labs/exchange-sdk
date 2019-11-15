import SocketIO from 'socket.io'

import time from '../utils/time'
import Book from '../Book'
import Order from '../Order'
import { CandleAVL, CandleInterval } from '../Candle'

export default function createSocketIO(
  books: Map<string, Book>,
  candleTrees: Map<string, Map<CandleInterval, CandleAVL>>,
  app: any,
  createBook: any,
) {
  const http: any = require('http').createServer(app)
  const io: SocketIO.Server = SocketIO(http, {
    pingTimeout: 200000,
    pingInterval: 300000,
    origins: '*:*',
  })

  const intervalCodes = new Map<string, CandleInterval>([
    ['1m', CandleInterval.ONE_MINUTE],
    ['1h', CandleInterval.ONE_HOUR],
    ['1d', CandleInterval.ONE_DAY],
    ['1w', CandleInterval.ONE_WEEK],
  ])

  const getEmitData = (book: Book) => {
    if (!book) return {}

    const meanPrice = book.meanPrice
    const spread = book.spread
    const orderBook = book.orderBook

    return { meanPrice, spread, orderBook }
  }

  io.on('connection', (socket: SocketIO.Socket) => {
    console.log('user connected')
    // On connection we should check to see if the user has previous historical data
    // If they have client side data already we need to figure out any gaps they're missing and fill them
    // If they don't have client data we need to send them the historical payload

    // Setup broadcast interval
    let broadcastInterval = setInterval(() => {
      // Iterate through each book and broadcast to each room
      // console.log('Sending out the order books!')
      console.log('Found socket rooms', socket.rooms)
      const rooms = Object.keys(socket.rooms)
      if (rooms) {
        rooms.forEach(r => {
          const book = books.get(r)
          if (book) {
            console.log(`Broadcasting to ${r}`)
            io.to(r).emit('book.data', getEmitData(book))
          }
        })
      }
    }, 15 * 1000)

    socket.on('book.subscribe', (room: any) => {
      const { name } = room

      try {
        let book = books.get(name)
        if (!book) {
          // Make the book
          book = createBook(name)
          if (!book) {
            throw new Error('Double check for book, these are dumb')
          }
        }

        socket.join(name)
        const emitData = getEmitData(book)
        socket.emit('book.subscribe.success', {
          success: true,
          ...emitData,
        })
      } catch (e) {
        socket.emit('book.subscribe.error', {
          error: e.message,
        })
      }
    })

    socket.on('book.unsubscribe', (room: any) => {
      const { name } = room

      try {
        socket.leave(name)

        socket.emit('book.unsubscribe.success', { success: true })
      } catch (e) {
        socket.emit('book.unsubscribe.error', {
          error: e.message,
        })
      }
    })

    socket.on('order.create', (order: any) => {
      const { externalId, side, type, quantity, price, name } = order

      try {
        const book = books.get(name)
        if (!book) {
          throw new Error(`Book ${book} not found`)
        }
        const o = new Order(externalId, side, type, quantity, price)
        book.addOrder(o)

        io.to(name).emit('order.create.success', getEmitData(book))
      } catch (e) {
        socket.emit('order.create.error', {
          error: e.message,
        })
      }
    })

    // We should change this to be an interval that broadcasts every 10 seconds or so
    // That way the client knows to append the data
    socket.on('candles.get', (opts: any = {}) => {
      let {
        endTime,
        startTime,
        interval,
        limit,
        name,
        type
      } = opts

      try {
        const cts = candleTrees.get(name)

        if (!cts) {
          throw new Error(`No candles found for ${name}`)
        }

        endTime = endTime || time().valueOf()
        // interval = interval || CandleInterval.Hour
        limit = limit || 1000

        // TODO Add limit and time

        const ct = cts.get(
          intervalCodes.get(interval) as CandleInterval,
        )
        if (!ct) {
          throw new Error(
            `Candle interval ${interval} for ${name} not found`,
          )
        }
        const candles = ct.timeSlice(startTime, endTime, limit).map((x) => x.export())
        socket.emit('candles.get.success', { candles, type })
      } catch (e) {
        socket.emit('candles.get.error', {
          error: e.message,
        })
      }
    })

    socket.on('disconnect', () => {
      console.log('user disconnected')
      clearInterval(broadcastInterval)
    })
  })

  return http
}
