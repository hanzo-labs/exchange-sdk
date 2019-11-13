[@hanzo/matching-engine](../README.md) › [Globals](../globals.md) › ["Candle"](../modules/_candle_.md) › [Candle](_candle_.candle.md)

# Class: Candle

candle data

## Hierarchy

* **Candle**

## Index

### Constructors

* [constructor](_candle_.candle.md#constructor)

### Properties

* [_closeTime](_candle_.candle.md#private-_closetime)
* [_openTime](_candle_.candle.md#private-_opentime)
* [close](_candle_.candle.md#close)
* [closeTime](_candle_.candle.md#closetime)
* [high](_candle_.candle.md#high)
* [interval](_candle_.candle.md#interval)
* [low](_candle_.candle.md#low)
* [open](_candle_.candle.md#open)
* [openTime](_candle_.candle.md#opentime)
* [quoteAssetVolume](_candle_.candle.md#quoteassetvolume)
* [trades](_candle_.candle.md#trades)
* [volume](_candle_.candle.md#volume)

### Methods

* [addTrade](_candle_.candle.md#addtrade)
* [addTradeData](_candle_.candle.md#addtradedata)
* [export](_candle_.candle.md#export)
* [hasTime](_candle_.candle.md#hastime)

## Constructors

###  constructor

\+ **new Candle**(`interval`: [CandleInterval](../enums/_candle_.candleinterval.md), `t`: [Trade](_trade_.trade.md)): *[Candle](_candle_.candle.md)*

*Defined in [Candle.ts:139](https://github.com/hanzoai/matching-engine/blob/1c5df06/src/Candle.ts#L139)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`interval` | [CandleInterval](../enums/_candle_.candleinterval.md) | candle interval |
`t` | [Trade](_trade_.trade.md) | - |

**Returns:** *[Candle](_candle_.candle.md)*

## Properties

### `Private` _closeTime

• **_closeTime**: *[Time](../modules/_utils_time_.md#time)*

*Defined in [Candle.ts:99](https://github.com/hanzoai/matching-engine/blob/1c5df06/src/Candle.ts#L99)*

cached closetime in moment format

___

### `Private` _openTime

• **_openTime**: *[Time](../modules/_utils_time_.md#time)*

*Defined in [Candle.ts:94](https://github.com/hanzoai/matching-engine/blob/1c5df06/src/Candle.ts#L94)*

cached opentime in moment format

___

###  close

• **close**: *Decimal*

*Defined in [Candle.ts:124](https://github.com/hanzoai/matching-engine/blob/1c5df06/src/Candle.ts#L124)*

close number

___

###  closeTime

• **closeTime**: *number*

*Defined in [Candle.ts:89](https://github.com/hanzoai/matching-engine/blob/1c5df06/src/Candle.ts#L89)*

candle close time

___

###  high

• **high**: *Decimal*

*Defined in [Candle.ts:114](https://github.com/hanzoai/matching-engine/blob/1c5df06/src/Candle.ts#L114)*

high number

___

###  interval

• **interval**: *[CandleInterval](../enums/_candle_.candleinterval.md)*

*Defined in [Candle.ts:104](https://github.com/hanzoai/matching-engine/blob/1c5df06/src/Candle.ts#L104)*

candle interval

___

###  low

• **low**: *Decimal*

*Defined in [Candle.ts:119](https://github.com/hanzoai/matching-engine/blob/1c5df06/src/Candle.ts#L119)*

low number

___

###  open

• **open**: *Decimal*

*Defined in [Candle.ts:109](https://github.com/hanzoai/matching-engine/blob/1c5df06/src/Candle.ts#L109)*

open number

___

###  openTime

• **openTime**: *number*

*Defined in [Candle.ts:84](https://github.com/hanzoai/matching-engine/blob/1c5df06/src/Candle.ts#L84)*

candle open time

___

###  quoteAssetVolume

• **quoteAssetVolume**: *Decimal*

*Defined in [Candle.ts:134](https://github.com/hanzoai/matching-engine/blob/1c5df06/src/Candle.ts#L134)*

quantity

___

###  trades

• **trades**: *number*

*Defined in [Candle.ts:139](https://github.com/hanzoai/matching-engine/blob/1c5df06/src/Candle.ts#L139)*

number of trades

___

###  volume

• **volume**: *Decimal*

*Defined in [Candle.ts:129](https://github.com/hanzoai/matching-engine/blob/1c5df06/src/Candle.ts#L129)*

volume in terms of price * quantity

## Methods

###  addTrade

▸ **addTrade**(`t`: [Trade](_trade_.trade.md)): *this*

*Defined in [Candle.ts:193](https://github.com/hanzoai/matching-engine/blob/1c5df06/src/Candle.ts#L193)*

add trade to the candle if it is in the correct timeframe

**Parameters:**

Name | Type |
------ | ------ |
`t` | [Trade](_trade_.trade.md) |

**Returns:** *this*

return this to make it chainable or throw error

___

###  addTradeData

▸ **addTradeData**(`quantity`: Decimal, `price`: Decimal): *this*

*Defined in [Candle.ts:171](https://github.com/hanzoai/matching-engine/blob/1c5df06/src/Candle.ts#L171)*

add just the import trade params to the candle (skips the date check)

**Parameters:**

Name | Type |
------ | ------ |
`quantity` | Decimal |
`price` | Decimal |

**Returns:** *this*

return this to make it chainable

___

###  export

▸ **export**(): *any[]*

*Defined in [Candle.ts:228](https://github.com/hanzoai/matching-engine/blob/1c5df06/src/Candle.ts#L228)*

returns exported format based on binance api

example:
[
  1499040000000,      // Open time
  1499644799999,      // Close time
  "0.01634790",       // Open
  "0.80000000",       // High
  "0.01575800",       // Low
  "0.01577100",       // Close
  "148976.11427815",  // Volume
  "2434.19055334",    // Quote asset volume
  308,                // Number of trades
]

**Returns:** *any[]*

___

###  hasTime

▸ **hasTime**(`t`: [Time](../modules/_utils_time_.md#time) | string | number): *boolean*

*Defined in [Candle.ts:206](https://github.com/hanzoai/matching-engine/blob/1c5df06/src/Candle.ts#L206)*

Does the candle interval include this time?

**Parameters:**

Name | Type |
------ | ------ |
`t` | [Time](../modules/_utils_time_.md#time) &#124; string &#124; number |

**Returns:** *boolean*

true if the time is included in the candle, false otherwise
