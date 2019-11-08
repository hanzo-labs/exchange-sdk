[matching-engine](../README.md) › [Globals](../globals.md) › ["Order"](../modules/_order_.md) › [Order](_order_.order.md)

# Class: Order

## Hierarchy

* **Order**

## Index

### Constructors

* [constructor](_order_.order.md#constructor)

### Properties

* [amount](_order_.order.md#amount)
* [createdAt](_order_.order.md#createdat)
* [id](_order_.order.md#id)
* [price](_order_.order.md#price)
* [status](_order_.order.md#status)
* [type](_order_.order.md#type)

## Constructors

###  constructor

\+ **new Order**(`type`: [OrderType](../enums/_order_.ordertype.md), `price`: number | string | Decimal, `amount`: number | string | Decimal): *[Order](_order_.order.md)*

*Defined in [Order.ts:72](https://github.com/hanzoai/matching-engine/blob/d9d262a/src/Order.ts#L72)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | [OrderType](../enums/_order_.ordertype.md) |
`price` | number &#124; string &#124; Decimal |
`amount` | number &#124; string &#124; Decimal |

**Returns:** *[Order](_order_.order.md)*

## Properties

###  amount

• **amount**: *Decimal*

*Defined in [Order.ts:68](https://github.com/hanzoai/matching-engine/blob/d9d262a/src/Order.ts#L68)*

___

###  createdAt

• **createdAt**: *number*

*Defined in [Order.ts:72](https://github.com/hanzoai/matching-engine/blob/d9d262a/src/Order.ts#L72)*

___

###  id

• **id**: *string*

*Defined in [Order.ts:52](https://github.com/hanzoai/matching-engine/blob/d9d262a/src/Order.ts#L52)*

___

###  price

• **price**: *Decimal*

*Defined in [Order.ts:64](https://github.com/hanzoai/matching-engine/blob/d9d262a/src/Order.ts#L64)*

___

###  status

• **status**: *[OrderStatus](../enums/_order_.orderstatus.md)* =  OrderStatus.UNFILLED

*Defined in [Order.ts:60](https://github.com/hanzoai/matching-engine/blob/d9d262a/src/Order.ts#L60)*

___

###  type

• **type**: *[OrderType](../enums/_order_.ordertype.md)*

*Defined in [Order.ts:56](https://github.com/hanzoai/matching-engine/blob/d9d262a/src/Order.ts#L56)*
