[@hanzo/matching-engine](../README.md) › [Globals](../globals.md) › ["Book"](_book_.md)

# External module: "Book"

## Index

### Classes

* [Book](../classes/_book_.book.md)

### Interfaces

* [ExecutionContext](../interfaces/_book_.executioncontext.md)

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

*Defined in [Book.ts:45](https://github.com/hanzoai/matching-engine/blob/ece9147/src/Book.ts#L45)*

a map of order price strings to decimals

___

###  OrderHeap

Ƭ **OrderHeap**: *FibonacciHeap‹[Order](../classes/_order_.order.md)›*

*Defined in [Book.ts:50](https://github.com/hanzoai/matching-engine/blob/ece9147/src/Book.ts#L50)*

a priorty queue of orders

___

###  OrderMap

Ƭ **OrderMap**: *Map‹string, [Order](../classes/_order_.order.md)›*

*Defined in [Book.ts:55](https://github.com/hanzoai/matching-engine/blob/ece9147/src/Book.ts#L55)*

a map of order price strings to decimals

## Variables

### `Const` naturalOrderCollator

• **naturalOrderCollator**: *Collator* =  new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'})

*Defined in [Book.ts:12](https://github.com/hanzoai/matching-engine/blob/ece9147/src/Book.ts#L12)*

sorts array by natural order of string

## Functions

### `Const` askComparator

▸ **askComparator**(`a`: [Order](../classes/_order_.order.md), `b`: [Order](../classes/_order_.order.md)): *number*

*Defined in [Book.ts:34](https://github.com/hanzoai/matching-engine/blob/ece9147/src/Book.ts#L34)*

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

*Defined in [Book.ts:20](https://github.com/hanzoai/matching-engine/blob/ece9147/src/Book.ts#L20)*

max-heap comparator function

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Order](../classes/_order_.order.md) |
`b` | [Order](../classes/_order_.order.md) |

**Returns:** *number*

negative if b.price < a.price, ties broken by creation time
