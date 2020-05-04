# ClientService

## construct

`construct(opts: Contracts.KeyValuePair): Promise<ClientService>`

Create an instance of the service.

### Parameters

Name | Type | Description
---- | ---- | -----------
options | object | The options to configure the behaviour of the service.

### Return Value

This method returns a promise that resolves with a `ClientService` value.

## destruct

`destruct(): Promise<void>`

Destroys the instance of the service.

### Parameters

This method has no parameters.

### Return Value

This method returns a promise that resolves with a void value.

## transaction

`transaction(id: string): Promise<Contracts.TransactionData>`

...

### Parameters

| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | Name | Type                                                                               | Description          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |
| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | ---- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |
| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | XXXX | string | XXXXXXXXX | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## transactions

`transactions(query: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Contracts.TransactionData>>`

...

### Parameters

| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | Name | Type                                                                             | Description          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |
| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | ---- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |
| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | XXXX | string | XXXXXXXXX | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## wallet

`wallet(id: string): Promise<Contracts.WalletData>`

...

### Parameters

| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | Name | Type                                                                           | Description          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |
| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | ---- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |
| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | XXXX | string | XXXXXXXXX | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## wallets

`wallets(query: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Contracts.WalletData>>`

...

### Parameters

| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | Name | Type                                                                         | Description          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |
| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | ---- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |
| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | XXXX | string | XXXXXXXXX | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## delegate

`delegate(id: string): Promise<Contracts.DelegateData>`

...

### Parameters

| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | Name | Type                                                                       | Description          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |
| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | ---- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |
| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | XXXX | string | XXXXXXXXX | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## delegates

`delegates(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Contracts.DelegateData>>`

...

### Parameters

| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | Name | Type                                                                     | Description          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |
| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | ---- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |
| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | XXXX | string | XXXXXXXXX | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## votes

`votes(id: string): Promise<Contracts.CollectionResponse<Contracts.TransactionData>>`

...

### Parameters

| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | Name | Type                                                                   | Description          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |
| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | ---- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |
| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | XXXX | string | XXXXXXXXX | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## voters

`voters(id: string): Promise<Contracts.CollectionResponse<Contracts.WalletData>>`

...

### Parameters

| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | Name | Type                                                                 | Description          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |          |
| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | ---- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |
| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | XXXX | string | XXXXXXXXX | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## configuration

`configuration(): Promise<Contracts.KeyValuePair>`

...

### Parameters

| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | Name | Type                                                               | Description | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | ---- | ------------------------------------------------------------------ | ----------- | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | XXXX | string | XXXXXXXXX   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## fees

`fees(days: number): Promise<Contracts.KeyValuePair>`

...

### Parameters

| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | Name | Type                                                             | Description | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | ---- | ---------------------------------------------------------------- | ----------- | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | XXXX | string | XXXXXXXXX   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
...
```

## syncing

`syncing(): Promise<boolean>`

...

### Parameters

| | | | | | | | | | | | | | | | | | Name | Type                                     | Description | | | | | | | | | | | | | | | | | |
| | | | | | | | | | | | | | | | | | ---- | ---------------------------------------- | ----------- | | | | | | | | | | | | | | | | | |
| | | | | | | | | | | | | | | | | | XXXX | string | XXXXXXXXX   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |

### Return Value

This method returns a promise that resolves with a boolean value.

### Example

```ts
...
```

## broadcast

`broadcast(transactions: object[]): Promise<void>`

This method returns a promise that resolves with a void value.

### Parameters

| | | | | | | | | | Name | Type                     | Description | | | | | | | | | |
| | | | | | | | | | ---- | ------------------------ | ----------- | | | | | | | | | |
| | | | | | | | | | XXXX | string | XXXXXXXXX   |   |   |   |   |   |   |   |   |   |

### Return Value

...

### Example

```ts
...
```
