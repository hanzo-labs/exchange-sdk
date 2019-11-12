[@hanzo/matching-engine](../README.md) › [Globals](../globals.md) › ["Book"](../modules/_book_.md) › [Book](_book_.book.md)

# Class: Book

order book for keeping track of and settling orders

## Hierarchy

* **Book**

## Index

### Constructors

* [constructor](_book_.book.md#constructor)

### Properties

* [_meanPrice](_book_.book.md#private-_meanprice)
* [_orderBook](_book_.book.md#private-_orderbook)
* [activeOrders](_book_.book.md#activeorders)
* [asks](_book_.book.md#asks)
* [bids](_book_.book.md#bids)
* [id](_book_.book.md#id)
* [name](_book_.book.md#name)
* [pendingOrderBook](_book_.book.md#pendingorderbook)

### Accessors

* [askSize](_book_.book.md#asksize)
* [bidSize](_book_.book.md#bidsize)
* [meanPrice](_book_.book.md#meanprice)
* [orderBook](_book_.book.md#orderbook)
* [spread](_book_.book.md#spread)

### Methods

* [addOrder](_book_.book.md#addorder)
* [addToPendingOrderBook](_book_.book.md#addtopendingorderbook)
* [cancelOrder](_book_.book.md#cancelorder)
* [nearestAsk](_book_.book.md#nearestask)
* [nearestBid](_book_.book.md#nearestbid)
* [settle](_book_.book.md#settle)
* [start](_book_.book.md#start)

## Constructors

###  constructor

\+ **new Book**(`name`: string): *[Book](_book_.book.md)*

*Defined in [Book.ts:108](https://github.com/hanzoai/matching-engine/blob/4557e9b/src/Book.ts#L108)*

order constructor

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | name of this book  |

**Returns:** *[Book](_book_.book.md)*

## Properties

### `Private` _meanPrice

• **_meanPrice**: *Decimal* =  new Decimal(0)

*Defined in [Book.ts:98](https://github.com/hanzoai/matching-engine/blob/4557e9b/src/Book.ts#L98)*

cached mean price, can only safely be taken after a settle

___

### `Private` _orderBook

• **_orderBook**: *[OrderBook](../modules/_book_.md#orderbook)* =  new Map<string, Decimal>()

*Defined in [Book.ts:93](https://github.com/hanzoai/matching-engine/blob/4557e9b/src/Book.ts#L93)*

this keeps track of the current orderbook as a map of prices to volumes

___

###  activeOrders

• **activeOrders**: *[OrderMap](../modules/_book_.md#ordermap)* =  new Map<string, Order>()

*Defined in [Book.ts:108](https://github.com/hanzoai/matching-engine/blob/4557e9b/src/Book.ts#L108)*

this keeps track of all the orders so updating status and cancellation is
easier

___

###  asks

• **asks**: *[OrderHeap](../modules/_book_.md#orderheap)* =  new FibonacciHeap<Order>(askComparator)

*Defined in [Book.ts:82](https://github.com/hanzoai/matching-engine/blob/4557e9b/src/Book.ts#L82)*

ask heap

___

###  bids

• **bids**: *[OrderHeap](../modules/_book_.md#orderheap)* =  new FibonacciHeap<Order>(bidComparator)

*Defined in [Book.ts:87](https://github.com/hanzoai/matching-engine/blob/4557e9b/src/Book.ts#L87)*

bid heap

___

###  id

• **id**: *string* =  uuid.v4()

*Defined in [Book.ts:71](https://github.com/hanzoai/matching-engine/blob/4557e9b/src/Book.ts#L71)*

unique book id

___

###  name

• **name**: *string*

*Defined in [Book.ts:77](https://github.com/hanzoai/matching-engine/blob/4557e9b/src/Book.ts#L77)*

string identifier for book (generally something simple like the trading
pair)

___

###  pendingOrderBook

• **pendingOrderBook**: *[OrderBook](../modules/_book_.md#orderbook)* =  new Map<string, Decimal>()

*Defined in [Book.ts:102](https://github.com/hanzoai/matching-engine/blob/4557e9b/src/Book.ts#L102)*

this is a list of pending orders that is merged into the existing orderbook on settle

## Accessors

###  askSize

• **get askSize**(): *number*

*Defined in [Book.ts:123](https://github.com/hanzoai/matching-engine/blob/4557e9b/src/Book.ts#L123)*

get the number of asks, note cancelled but unsettled orders are only
periodically removed

**Returns:** *number*

returns number of asks

___

###  bidSize

• **get bidSize**(): *number*

*Defined in [Book.ts:132](https://github.com/hanzoai/matching-engine/blob/4557e9b/src/Book.ts#L132)*

get the number of bids, note cancelled but unsettled orders are only
periodically removed

**Returns:** *number*

returns number of bids

___

###  meanPrice

• **get meanPrice**(): *Decimal*

*Defined in [Book.ts:274](https://github.com/hanzoai/matching-engine/blob/4557e9b/src/Book.ts#L274)*

**Returns:** *Decimal*

___

###  orderBook

• **get orderBook**(): *[OrderBook](../modules/_book_.md#orderbook)*

*Defined in [Book.ts:179](https://github.com/hanzoai/matching-engine/blob/4557e9b/src/Book.ts#L179)*

**Returns:** *[OrderBook](../modules/_book_.md#orderbook)*

returns the current orderbook (readonly)

___

###  spread

• **get spread**(): *Decimal*

*Defined in [Book.ts:270](https://github.com/hanzoai/matching-engine/blob/4557e9b/src/Book.ts#L270)*

**Returns:** *Decimal*

return the spread between bid and asks or Infinity if less than 2
limit orders

## Methods

###  addOrder

▸ **addOrder**(`order`: [Order](_order_.order.md)): *boolean*

*Defined in [Book.ts:201](https://github.com/hanzoai/matching-engine/blob/4557e9b/src/Book.ts#L201)*

Insert an order into the order book

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | [Order](_order_.order.md) | order to add or throw an error  |

**Returns:** *boolean*

___

###  addToPendingOrderBook

▸ **addToPendingOrderBook**(`price`: Decimal, `quantity`: Decimal): *void*

*Defined in [Book.ts:188](https://github.com/hanzoai/matching-engine/blob/4557e9b/src/Book.ts#L188)*

modify the pending order book, skip 0s

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`price` | Decimal | price to add the quantity to |
`quantity` | Decimal | quantity to add to pending order book  |

**Returns:** *void*

___

###  cancelOrder

▸ **cancelOrder**(`order`: [Order](_order_.order.md)): *boolean*

*Defined in [Book.ts:253](https://github.com/hanzoai/matching-engine/blob/4557e9b/src/Book.ts#L253)*

cancel an order if it exists

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | [Order](_order_.order.md) | order to cancel  |

**Returns:** *boolean*

___

###  nearestAsk

▸ **nearestAsk**(): *[Order](_order_.order.md) | undefined*

*Defined in [Book.ts:139](https://github.com/hanzoai/matching-engine/blob/4557e9b/src/Book.ts#L139)*

**Returns:** *[Order](_order_.order.md) | undefined*

returns the nearest ask order

___

###  nearestBid

▸ **nearestBid**(): *[Order](_order_.order.md) | undefined*

*Defined in [Book.ts:159](https://github.com/hanzoai/matching-engine/blob/4557e9b/src/Book.ts#L159)*

**Returns:** *[Order](_order_.order.md) | undefined*

returns the nearest bid order

___

###  settle

▸ **settle**(): *[Trade](_trade_.trade.md)[]*

*Defined in [Book.ts:281](https://github.com/hanzoai/matching-engine/blob/4557e9b/src/Book.ts#L281)*

settle the order book by executing overlapping trades

**Returns:** *[Trade](_trade_.trade.md)[]*

___

###  start

▸ **start**(`settleFn`: function): *[ExecutionContext](../interfaces/_book_.executioncontext.md)*

*Defined in [Book.ts:430](https://github.com/hanzoai/matching-engine/blob/4557e9b/src/Book.ts#L430)*

start executing settle repeatedly, only run once

**Parameters:**

▪`Default value`  **settleFn**: *function*=  () => {}

function that executes with the return value of settle

▸ (`b`: [Book](_book_.book.md), `t`: [Trade](_trade_.trade.md)[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`b` | [Book](_book_.book.md) |
`t` | [Trade](_trade_.trade.md)[] |

**Returns:** *[ExecutionContext](../interfaces/_book_.executioncontext.md)*

return an ExecutionContext with a stop function
