[matching-engine](../README.md) › [Globals](../globals.md) › ["Book"](../modules/_book_.md) › [Book](_book_.book.md)

# Class: Book

order book for keeping track of and settling orders

## Hierarchy

* **Book**

## Index

### Constructors

* [constructor](_book_.book.md#constructor)

### Properties

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

## Constructors

###  constructor

\+ **new Book**(`name`: string): *[Book](_book_.book.md)*

*Defined in [Book.ts:91](https://github.com/hanzoai/matching-engine/blob/0c1f67f/src/Book.ts#L91)*

order constructor

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | name of this book  |

**Returns:** *[Book](_book_.book.md)*

## Properties

### `Private` _orderBook

• **_orderBook**: *[OrderBook](../modules/_book_.md#orderbook)* =  new Map<string, Decimal>()

*Defined in [Book.ts:80](https://github.com/hanzoai/matching-engine/blob/0c1f67f/src/Book.ts#L80)*

this keeps track of the current orderbook as a map of prices to volumes

___

###  activeOrders

• **activeOrders**: *[OrderMap](../modules/_book_.md#ordermap)* =  new Map<string, Order>()

*Defined in [Book.ts:91](https://github.com/hanzoai/matching-engine/blob/0c1f67f/src/Book.ts#L91)*

this keeps track of all the orders so updating status and cancellation is
easier

___

###  asks

• **asks**: *[OrderHeap](../modules/_book_.md#orderheap)* =  new FibonacciHeap<Order>(askComparator)

*Defined in [Book.ts:70](https://github.com/hanzoai/matching-engine/blob/0c1f67f/src/Book.ts#L70)*

ask heap

___

###  bids

• **bids**: *[OrderHeap](../modules/_book_.md#orderheap)* =  new FibonacciHeap<Order>(bidComparator)

*Defined in [Book.ts:75](https://github.com/hanzoai/matching-engine/blob/0c1f67f/src/Book.ts#L75)*

bid heap

___

###  id

• **id**: *string* =  uuid.v4()

*Defined in [Book.ts:59](https://github.com/hanzoai/matching-engine/blob/0c1f67f/src/Book.ts#L59)*

unique book id

___

###  name

• **name**: *string*

*Defined in [Book.ts:65](https://github.com/hanzoai/matching-engine/blob/0c1f67f/src/Book.ts#L65)*

string identifier for book (generally something simple like the trading
pair)

___

###  pendingOrderBook

• **pendingOrderBook**: *[OrderBook](../modules/_book_.md#orderbook)* =  new Map<string, Decimal>()

*Defined in [Book.ts:85](https://github.com/hanzoai/matching-engine/blob/0c1f67f/src/Book.ts#L85)*

this is a list of pending orders that is merged into the existing orderbook on settle

## Accessors

###  askSize

• **get askSize**(): *number*

*Defined in [Book.ts:106](https://github.com/hanzoai/matching-engine/blob/0c1f67f/src/Book.ts#L106)*

get the number of asks, note cancelled but unsettled orders are only
periodically removed

**Returns:** *number*

returns number of asks

___

###  bidSize

• **get bidSize**(): *number*

*Defined in [Book.ts:115](https://github.com/hanzoai/matching-engine/blob/0c1f67f/src/Book.ts#L115)*

get the number of bids, note cancelled but unsettled orders are only
periodically removed

**Returns:** *number*

returns number of bids

___

###  meanPrice

• **get meanPrice**(): *Decimal*

*Defined in [Book.ts:248](https://github.com/hanzoai/matching-engine/blob/0c1f67f/src/Book.ts#L248)*

**Returns:** *Decimal*

___

###  orderBook

• **get orderBook**(): *[OrderBook](../modules/_book_.md#orderbook)*

*Defined in [Book.ts:162](https://github.com/hanzoai/matching-engine/blob/0c1f67f/src/Book.ts#L162)*

**Returns:** *[OrderBook](../modules/_book_.md#orderbook)*

returns the current orderbook (readonly)

___

###  spread

• **get spread**(): *Decimal*

*Defined in [Book.ts:244](https://github.com/hanzoai/matching-engine/blob/0c1f67f/src/Book.ts#L244)*

**Returns:** *Decimal*

return the spread between bid and asks or Infinity if less than 2
limit orders

## Methods

###  addOrder

▸ **addOrder**(`order`: [Order](_order_.order.md)): *boolean*

*Defined in [Book.ts:184](https://github.com/hanzoai/matching-engine/blob/0c1f67f/src/Book.ts#L184)*

Insert an order into the order book or throw an error

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | [Order](_order_.order.md) | order to add  |

**Returns:** *boolean*

___

###  addToPendingOrderBook

▸ **addToPendingOrderBook**(`price`: Decimal, `quantity`: Decimal): *void*

*Defined in [Book.ts:171](https://github.com/hanzoai/matching-engine/blob/0c1f67f/src/Book.ts#L171)*

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

*Defined in [Book.ts:227](https://github.com/hanzoai/matching-engine/blob/0c1f67f/src/Book.ts#L227)*

cancel an order if it exists

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | [Order](_order_.order.md) | order to cancel  |

**Returns:** *boolean*

___

###  nearestAsk

▸ **nearestAsk**(): *[Order](_order_.order.md) | undefined*

*Defined in [Book.ts:122](https://github.com/hanzoai/matching-engine/blob/0c1f67f/src/Book.ts#L122)*

**Returns:** *[Order](_order_.order.md) | undefined*

returns the nearest ask order

___

###  nearestBid

▸ **nearestBid**(): *[Order](_order_.order.md) | undefined*

*Defined in [Book.ts:142](https://github.com/hanzoai/matching-engine/blob/0c1f67f/src/Book.ts#L142)*

**Returns:** *[Order](_order_.order.md) | undefined*

returns the nearest bid order

___

###  settle

▸ **settle**(): *[Trade](_trade_.trade.md)[]*

*Defined in [Book.ts:255](https://github.com/hanzoai/matching-engine/blob/0c1f67f/src/Book.ts#L255)*

settle the order book by executing overlapping trades

**Returns:** *[Trade](_trade_.trade.md)[]*
