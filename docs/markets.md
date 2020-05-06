# MarketService

## Introduction

Market APIs provide an easy way to gather historical price data for any given token. Currently supported are CoinCap, CoinGecko and CryptoCompare.

## API Methods

## construct

`construct(name: string): Promise<MarketService>`

Create an instance of the service.

### Parameters

| Name | Type   | Description                                  |
| ---- | ------ | -------------------------------------------- |
| name | string | The name of the adapter that should be used. |

### Return Value

This method returns a promise that resolves with a `MarketService` value.

## verifyToken

`verifyToken(token: string): Promise<boolean>`

...

### Parameters

| Name  | Type   | Description |
| ----- | ------ | ----------- |
| token | string | ...         |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## marketData

`marketData(token: string): Promise<Contracts.MarketDataCollection>`

...

### Parameters

| Name  | Type   | Description |
| ----- | ------ | ----------- |
| token | string | ...         |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## historicalPrice

`historicalPrice(options: Contracts.HistoricalPriceOptions): Promise<Contracts.HistoricalData>`

...

### Parameters

| Name    | Type   | Description |
| ------- | ------ | ----------- |
| options | object | ...         |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## historicalPriceForDay

`historicalPriceForDay(token: string, currency: string): Promise<Contracts.HistoricalData>`

...

### Parameters

| Name     | Type   | Description |
| -------- | ------ | ----------- |
| token    | string | ...         |
| currency | string | ...         |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## historicalPriceForWeek

`historicalPriceForWeek(token: string, currency: string): Promise<Contracts.HistoricalData>`

...

### Parameters

| Name     | Type   | Description |
| -------- | ------ | ----------- |
| token    | string | ...         |
| currency | string | ...         |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## historicalPriceForMonth

`historicalPriceForMonth(token: string, currency: string): Promise<Contracts.HistoricalData>`

...

### Parameters

| Name     | Type   | Description |
| -------- | ------ | ----------- |
| token    | string | ...         |
| currency | string | ...         |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## historicalPriceForQuarter

`historicalPriceForQuarter(token: string, currency: string): Promise<Contracts.HistoricalData>`

...

### Parameters

| Name     | Type   | Description |
| -------- | ------ | ----------- |
| token    | string | ...         |
| currency | string | ...         |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## historicalPriceForYear

`historicalPriceForYear(token: string, currency: string): Promise<Contracts.HistoricalData>`

...

### Parameters

| Name     | Type   | Description |
| -------- | ------ | ----------- |
| token    | string | ...         |
| currency | string | ...         |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## historicalVolume

`historicalVolume(options: Contracts.HistoricalVolumeOptions): Promise<Contracts.HistoricalData>`

...

### Parameters

| Name    | Type   | Description |
| ------- | ------ | ----------- |
| options | object | ...         |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## historicalVolumeForDay

`historicalVolumeForDay(token: string, currency: string): Promise<Contracts.HistoricalData>`

...

### Parameters

| Name     | Type   | Description |
| -------- | ------ | ----------- |
| token    | string | ...         |
| currency | string | ...         |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## historicalVolumeForWeek

`historicalVolumeForWeek(token: string, currency: string): Promise<Contracts.HistoricalData>`

...

### Parameters

| Name     | Type   | Description |
| -------- | ------ | ----------- |
| token    | string | ...         |
| currency | string | ...         |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## historicalVolumeForMonth

`historicalVolumeForMonth(token: string, currency: string): Promise<Contracts.HistoricalData>`

...

### Parameters

| Name     | Type   | Description |
| -------- | ------ | ----------- |
| token    | string | ...         |
| currency | string | ...         |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## historicalVolumeForQuarter

`historicalVolumeForQuarter(token: string, currency: string): Promise<Contracts.HistoricalData>`

...

### Parameters

| Name     | Type   | Description |
| -------- | ------ | ----------- |
| token    | string | ...         |
| currency | string | ...         |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## historicalVolumeForYear

`historicalVolumeForYear(token: string, currency: string): Promise<Contracts.HistoricalData>`

...

### Parameters

| Name     | Type   | Description |
| -------- | ------ | ----------- |
| token    | string | ...         |
| currency | string | ...         |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## dailyAverage

`dailyAverage(token: string, currency: string, timestamp: number): Promise<number>`

...

### Parameters

| Name      | Type   | Description |
| --------- | ------ | ----------- |
| token     | string | ...         |
| currency  | string | ...         |
| timestamp | number | ...         |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```
