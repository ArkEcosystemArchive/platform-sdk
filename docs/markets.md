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

Verifies that the given token is listed on a market API provider.

### Parameters

| Name  | Type   | Description                                 |
| ----- | ------ | ------------------------------------------- |
| token | string | The name of the token which should be used. |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## marketData

`marketData(token: string): Promise<Contracts.MarketDataCollection>`

Gets market and trading information about the given token.

### Parameters

| Name  | Type   | Description                                 |
| ----- | ------ | ------------------------------------------- |
| token | string | The name of the token which should be used. |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## historicalPrice

`historicalPrice(options: Contracts.HistoricalPriceOptions): Promise<Contracts.HistoricalData>`

Gets the historical trading price for the given options.

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

Gets the historical trading price for the last day.

### Parameters

| Name     | Type   | Description                                    |
| -------- | ------ | ---------------------------------------------- |
| token    | string | The name of the token which should be used.    |
| currency | string | The name of the currency which should be used. |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## historicalPriceForWeek

`historicalPriceForWeek(token: string, currency: string): Promise<Contracts.HistoricalData>`

Gets the historical trading price for the last week.

### Parameters

| Name     | Type   | Description                                    |
| -------- | ------ | ---------------------------------------------- |
| token    | string | The name of the token which should be used.    |
| currency | string | The name of the currency which should be used. |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## historicalPriceForMonth

`historicalPriceForMonth(token: string, currency: string): Promise<Contracts.HistoricalData>`

Gets the historical trading price for the last month.

### Parameters

| Name     | Type   | Description                                    |
| -------- | ------ | ---------------------------------------------- |
| token    | string | The name of the token which should be used.    |
| currency | string | The name of the currency which should be used. |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## historicalPriceForQuarter

`historicalPriceForQuarter(token: string, currency: string): Promise<Contracts.HistoricalData>`

Gets the historical trading price for the last quarter.

### Parameters

| Name     | Type   | Description                                    |
| -------- | ------ | ---------------------------------------------- |
| token    | string | The name of the token which should be used.    |
| currency | string | The name of the currency which should be used. |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## historicalPriceForYear

`historicalPriceForYear(token: string, currency: string): Promise<Contracts.HistoricalData>`

Gets the historical trading price for the last year.

### Parameters

| Name     | Type   | Description                                    |
| -------- | ------ | ---------------------------------------------- |
| token    | string | The name of the token which should be used.    |
| currency | string | The name of the currency which should be used. |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## historicalVolume

`historicalVolume(options: Contracts.HistoricalVolumeOptions): Promise<Contracts.HistoricalData>`

Gets the historical trading volume for the given options.

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

Gets the historical trading volume for the last day.

### Parameters

| Name     | Type   | Description                                    |
| -------- | ------ | ---------------------------------------------- |
| token    | string | The name of the token which should be used.    |
| currency | string | The name of the currency which should be used. |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## historicalVolumeForWeek

`historicalVolumeForWeek(token: string, currency: string): Promise<Contracts.HistoricalData>`

Gets the historical trading volume for the last week.

### Parameters

| Name     | Type   | Description                                    |
| -------- | ------ | ---------------------------------------------- |
| token    | string | The name of the token which should be used.    |
| currency | string | The name of the currency which should be used. |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## historicalVolumeForMonth

`historicalVolumeForMonth(token: string, currency: string): Promise<Contracts.HistoricalData>`

Gets the historical trading volume for the last month.

### Parameters

| Name     | Type   | Description                                    |
| -------- | ------ | ---------------------------------------------- |
| token    | string | The name of the token which should be used.    |
| currency | string | The name of the currency which should be used. |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## historicalVolumeForQuarter

`historicalVolumeForQuarter(token: string, currency: string): Promise<Contracts.HistoricalData>`

Gets the historical trading volume for the last quarter.

### Parameters

| Name     | Type   | Description                                    |
| -------- | ------ | ---------------------------------------------- |
| token    | string | The name of the token which should be used.    |
| currency | string | The name of the currency which should be used. |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## historicalVolumeForYear

`historicalVolumeForYear(token: string, currency: string): Promise<Contracts.HistoricalData>`

Gets the historical trading volume for the last year.

### Parameters

| Name     | Type   | Description                                    |
| -------- | ------ | ---------------------------------------------- |
| token    | string | The name of the token which should be used.    |
| currency | string | The name of the currency which should be used. |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## dailyAverage

`dailyAverage(token: string, currency: string, timestamp: number): Promise<number>`

Get the daily average for the trading pair of token and currency for the given time.

### Parameters

| Name      | Type   | Description                                         |
| --------- | ------ | --------------------------------------------------- |
| token     | string | The name of the token which should be used.         |
| currency  | string | The name of the currency which should be used.      |
| timestamp | number | The timestamp which should be used for the look up. |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```
