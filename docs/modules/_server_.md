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
* [exp](_server_.md#const-exp)
* [http](_server_.md#const-http)
* [nrm](_server_.md#const-nrm)
* [port](_server_.md#const-port)

### Functions

* [createBook](_server_.md#const-createbook)

## Variables

### `Const` app

• **app**: *Express‹›* =  createHttp(books, candleTrees)

*Defined in [server.ts:93](https://github.com/hanzoai/matching-engine/blob/976fc6f/src/server.ts#L93)*

___

### `Const` books

• **books**: *Map‹string, [Book](../classes/_book_.book.md)‹››* =  new Map<string, Book>()

*Defined in [server.ts:17](https://github.com/hanzoai/matching-engine/blob/976fc6f/src/server.ts#L17)*

___

### `Const` c1d

• **c1d**: *[CandleAVL](../classes/_candle_.candleavl.md)‹›* =  new CandleAVL(CandleInterval.ONE_DAY)

*Defined in [server.ts:15](https://github.com/hanzoai/matching-engine/blob/976fc6f/src/server.ts#L15)*

___

### `Const` c1h

• **c1h**: *[CandleAVL](../classes/_candle_.candleavl.md)‹›* =  new CandleAVL(CandleInterval.ONE_HOUR)

*Defined in [server.ts:14](https://github.com/hanzoai/matching-engine/blob/976fc6f/src/server.ts#L14)*

___

### `Const` c1m

• **c1m**: *[CandleAVL](../classes/_candle_.candleavl.md)‹›* =  new CandleAVL(CandleInterval.ONE_MINUTE)

*Defined in [server.ts:13](https://github.com/hanzoai/matching-engine/blob/976fc6f/src/server.ts#L13)*

___

### `Const` candleTrees

• **candleTrees**: *Map‹string, Map‹[CandleInterval](../enums/_candle_.candleinterval.md), [CandleAVL](../classes/_candle_.candleavl.md)‹›››* =  new Map<string,Map<CandleInterval, CandleAVL>>()

*Defined in [server.ts:19](https://github.com/hanzoai/matching-engine/blob/976fc6f/src/server.ts#L19)*

___

### `Const` exp

• **exp**: *function* =  random.exponential(1)

*Defined in [server.ts:10](https://github.com/hanzoai/matching-engine/blob/976fc6f/src/server.ts#L10)*

#### Type declaration:

▸ (): *number*

___

### `Const` http

• **http**: *any* =  createSocketIO(books, candleTrees, app, createBook)

*Defined in [server.ts:97](https://github.com/hanzoai/matching-engine/blob/976fc6f/src/server.ts#L97)*

___

### `Const` nrm

• **nrm**: *function* =  random.normal(1, 1)

*Defined in [server.ts:11](https://github.com/hanzoai/matching-engine/blob/976fc6f/src/server.ts#L11)*

#### Type declaration:

▸ (): *number*

___

### `Const` port

• **port**: *4000* = 4000

*Defined in [server.ts:95](https://github.com/hanzoai/matching-engine/blob/976fc6f/src/server.ts#L95)*

## Functions

### `Const` createBook

▸ **createBook**(`name`: string): *undefined | [Book](../classes/_book_.book.md)‹›*

*Defined in [server.ts:21](https://github.com/hanzoai/matching-engine/blob/976fc6f/src/server.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *undefined | [Book](../classes/_book_.book.md)‹›*
