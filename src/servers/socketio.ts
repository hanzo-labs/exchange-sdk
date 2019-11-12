import { Server } from 'http'
import Book, { OrderMap } from '../Book'
import Trade from '../Trade'
import Order from '../Order'
import SocketIO, { Socket } from 'socket.io'
import time from '../utils/time'

export default function createSocketIO (book: Book, http: Server) {
  const io = SocketIO(http)

  const oldSettle = book.settle

  book.settle = () => {
    const trades = oldSettle()

    // Emit Trades
    io.emit('trades.updated',    trades)
    io.emit('orderBook.updated', book.orderBook)
    io.emit('candles.updated',   [])

    return trades
  }

  const oldAddOrder = book.addOrder

  book.addOrder = (o) => {
    return oldAddOrder(o)
  }

  io.on('connection', (socket) => {
    console.log('user connected')

    socket.on('order.create', (order) => {
      const {
        externalId,
        side,
        type,
        quantity,
        price,
      } = order

      try {
        const o = new Order(externalId, side, type, quantity, price)
        book.addOrder(o)

        socket.emit('order.create', o)
      } catch (e) {

        socket.emit('order.create', {
          error: e.message,
        })
      }
    })

    socket.on('candles.get', (opts) => {
      let {
        endTime,
        startTime,
        interval,
        limit,
      } = opts

      endTime = startTime || time().valueOf()
      // interval = interval || CandleInterval.Hour
      limit = Math.min(1000, limit)

      socket.emit('candles.get', [])
    })

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })
}
