[matching-engine](../README.md) › [Globals](../globals.md) › ["Book"](_book_.md)

# External module: "Book"

## Index

### Classes

* [Book](../classes/_book_.book.md)

### Type aliases

* [OrderBook](_book_.md#orderbook)
* [OrderHeap](_book_.md#orderheap)
* [OrderMap](_book_.md#ordermap)

### Variables

* [naturalOrderCollator](_book_.md#const-naturalordercollator)

### Functions

* [askComparator](_book_.md#const-askcomparator)
* [bidComparator](_book_.md#const-bidcomparator)

## Type aliases

###  OrderBook

Ƭ **OrderBook**: *Map‹string, Decimal›*

*Defined in [Book.ts:44](https://github.com/hanzoai/matching-engine/blob/0c1f67f/src/Book.ts#L44)*

a map of order price strings to Decimals

___

###  OrderHeap

Ƭ **OrderHeap**: *FibonacciHeap‹[Order](../classes/_order_.order.md)›*

*Defined in [Book.ts:49](https://github.com/hanzoai/matching-engine/blob/0c1f67f/src/Book.ts#L49)*

a map of order price strings to Decimals

___

###  OrderMap

Ƭ **OrderMap**: *Map‹string, [Order](../classes/_order_.order.md)›*

*Defined in [Book.ts:50](https://github.com/hanzoai/matching-engine/blob/0c1f67f/src/Book.ts#L50)*

## Variables

### `Const` naturalOrderCollator

• **naturalOrderCollator**: *Collator* =  new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'})

*Defined in [Book.ts:11](https://github.com/hanzoai/matching-engine/blob/0c1f67f/src/Book.ts#L11)*

sorts array by natural order of string

## Functions

### `Const` askComparator

▸ **askComparator**(`a`: [Order](../classes/_order_.order.md), `b`: [Order](../classes/_order_.order.md)): *number*

*Defined in [Book.ts:33](https://github.com/hanzoai/matching-engine/blob/0c1f67f/src/Book.ts#L33)*

min-heap comparator function

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Order](../classes/_order_.order.md) |
`b` | [Order](../classes/_order_.order.md) |

**Returns:** *number*

negative if b.price > a.price, ties broken by creation time

___

### `Const` bidComparator

▸ **bidComparator**(`a`: [Order](../classes/_order_.order.md), `b`: [Order](../classes/_order_.order.md)): *number*

*Defined in [Book.ts:19](https://github.com/hanzoai/matching-engine/blob/0c1f67f/src/Book.ts#L19)*

max-heap comparator function

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Order](../classes/_order_.order.md) |
`b` | [Order](../classes/_order_.order.md) |

**Returns:** *number*

negative if b.price < a.price, ties broken by creation time
