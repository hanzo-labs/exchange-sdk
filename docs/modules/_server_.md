[@hanzo/matching-engine](../README.md) › [Globals](../globals.md) › ["server"](_server_.md)

# External module: "server"

## Index

### Variables

* [app](_server_.md#const-app)
* [books](_server_.md#const-books)
* [c1d](_server_.md#const-c1d)
* [c1h](_server_.md#const-c1h)
* [c1m](_server_.md#const-c1m)
* [candleTrees](_server_.md#const-candletrees)
* [ctx](_server_.md#const-ctx)
* [exp](_server_.md#const-exp)
* [nrm](_server_.md#const-nrm)
* [port](_server_.md#const-port)
* [t](_server_.md#let-t)
* [testBook](_server_.md#const-testbook)

## Variables

### `Const` app

• **app**: *Express‹›* =  createHttp(books, candleTrees)

*Defined in [server.ts:63](https://github.com/hanzoai/matching-engine/blob/1c5df06/src/server.ts#L63)*

___

### `Const` books

• **books**: *Map‹string, [Book](../classes/_book_.book.md)‹››* =  new Map<string, Book>([
  ['test', testBook],
])

*Defined in [server.ts:49](https://github.com/hanzoai/matching-engine/blob/1c5df06/src/server.ts#L49)*

___

### `Const` c1d

• **c1d**: *[CandleAVL](../classes/_candle_.candleavl.md)‹›* =  new CandleAVL(CandleInterval.ONE_DAY)

*Defined in [server.ts:16](https://github.com/hanzoai/matching-engine/blob/1c5df06/src/server.ts#L16)*

___

### `Const` c1h

• **c1h**: *[CandleAVL](../classes/_candle_.candleavl.md)‹›* =  new CandleAVL(CandleInterval.ONE_HOUR)

*Defined in [server.ts:15](https://github.com/hanzoai/matching-engine/blob/1c5df06/src/server.ts#L15)*

___

### `Const` c1m

• **c1m**: *[CandleAVL](../classes/_candle_.candleavl.md)‹›* =  new CandleAVL(CandleInterval.ONE_MINUTE)

*Defined in [server.ts:14](https://github.com/hanzoai/matching-engine/blob/1c5df06/src/server.ts#L14)*

___

### `Const` candleTrees

• **candleTrees**: *Map‹string, Map‹[CandleInterval](../enums/_candle_.candleinterval.md), [CandleAVL](../classes/_candle_.candleavl.md)‹›››* =  new Map<string,Map<CandleInterval, CandleAVL>>([
  [
    'test', new Map<CandleInterval, CandleAVL>([
      [CandleInterval.ONE_MINUTE, c1m],
      [CandleInterval.ONE_HOUR, c1h],
      [CandleInterval.ONE_DAY, c1d],
    ]),
  ],
])

*Defined in [server.ts:53](https://github.com/hanzoai/matching-engine/blob/1c5df06/src/server.ts#L53)*

___

### `Const` ctx

• **ctx**: *[ExecutionContext](../interfaces/_book_.executioncontext.md)* =  testBook.start((tb, trades) => {
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

*Defined in [server.ts:65](https://github.com/hanzoai/matching-engine/blob/1c5df06/src/server.ts#L65)*

___

### `Const` exp

• **exp**: *function* =  random.exponential(1)

*Defined in [server.ts:10](https://github.com/hanzoai/matching-engine/blob/1c5df06/src/server.ts#L10)*

#### Type declaration:

▸ (): *number*

___

### `Const` nrm

• **nrm**: *function* =  random.normal(1, 1)

*Defined in [server.ts:11](https://github.com/hanzoai/matching-engine/blob/1c5df06/src/server.ts#L11)*

#### Type declaration:

▸ (): *number*

___

### `Const` port

• **port**: *4000* = 4000

*Defined in [server.ts:87](https://github.com/hanzoai/matching-engine/blob/1c5df06/src/server.ts#L87)*

___

### `Let` t

• **t**: *number* =  time().valueOf() - (1000 * 10001)

*Defined in [server.ts:18](https://github.com/hanzoai/matching-engine/blob/1c5df06/src/server.ts#L18)*

___

### `Const` testBook

• **testBook**: *[Book](../classes/_book_.book.md)‹›* =  new Book('test')

*Defined in [server.ts:13](https://github.com/hanzoai/matching-engine/blob/1c5df06/src/server.ts#L13)*
