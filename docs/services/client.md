# ClientService

## construct

`construct(opts: Contracts.KeyValuePair): Promise<ClientService>`

Create an instance of the service.

### Parameters

| Name    | Type   | Description                                            |
| ------- | ------ | ------------------------------------------------------ |
| options | object | The options to configure the behaviour of the service. |

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

| Name | Type   | Description                                         |
| ---- | ------ | --------------------------------------------------- |
| id   | string | The ID of the transaction that should be looked up. |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
await clientService.transaction("3e3817fd0c35bc36674f3874c2953fa3e35877cbcdb44a08bdc6083dbd39d572");
```

## transactions

`transactions(query: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Contracts.TransactionData>>`

...

### Parameters

| Name          | Type   | Description                                            |
| ------------- | ------ | ------------------------------------------------------ |
| query         | object | The object containing request parameters.              |
| query.page    | number | The page that should be used to request entries.       |
| query.perPage | number | The number of items that should be requested per page. |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
await clientService.transactions({ address: "DBk4cPYpqp7EBcvkstVDpyX7RQJNHxpMg8" });
```

## wallet

`wallet(id: string): Promise<Contracts.WalletData>`

...

### Parameters

| Name | Type   | Description                                         |
| ---- | ------ | --------------------------------------------------- |
| id   | string | The address of the wallet that should be looked up. |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
await clientService.wallet("DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9");
```

## wallets

`wallets(query: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Contracts.WalletData>>`

...

### Parameters

| Name          | Type   | Description                                            |
| ------------- | ------ | ------------------------------------------------------ |
| query         | object | The object containing request parameters.              |
| query.page    | number | The page that should be used to request entries.       |
| query.perPage | number | The number of items that should be requested per page. |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
await clientService.wallets({ address: "DBk4cPYpqp7EBcvkstVDpyX7RQJNHxpMg8" });
```

## delegate

`delegate(id: string): Promise<Contracts.DelegateData>`

...

### Parameters

| Name | Type   | Description                                                  |
| ---- | ------ | ------------------------------------------------------------ |
| id   | string | The address of the delegate wallet that should be looked up. |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
await clientService.delegate("arkx");
```

## delegates

`delegates(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Contracts.DelegateData>>`

...

### Parameters

| Name          | Type   | Description                                            |
| ------------- | ------ | ------------------------------------------------------ |
| query         | object | The object containing request parameters.              |
| query.page    | number | The page that should be used to request entries.       |
| query.perPage | number | The number of items that should be requested per page. |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
await clientService.delegates();
```

## votes

`votes(id: string): Promise<Contracts.CollectionResponse<Contracts.TransactionData>>`

...

### Parameters

| Name | Type   | Description                                                   |
| ---- | ------ | ------------------------------------------------------------- |
| id   | string | The address of the wallet that votes should be looked up for. |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
await clientService.votes("arkx");
```

## voters

`voters(id: string): Promise<Contracts.CollectionResponse<Contracts.WalletData>>`

...

### Parameters

| Name | Type   | Description                                                    |
| ---- | ------ | -------------------------------------------------------------- |
| id   | string | The address of the wallet that voters should be looked up for. |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
await clientService.voters("arkx");
```

## configuration

`configuration(): Promise<Contracts.KeyValuePair>`

...

### Parameters

This method has no parameters.

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
await clientService.configuration();
```

## syncing

`syncing(): Promise<boolean>`

...

### Parameters

This method has no parameters.

### Return Value

This method returns a promise that resolves with a boolean value.

### Example

```ts
await clientService.syncing();
```

## broadcast

`broadcast(transactions: object[]): Promise<void>`

This method returns a promise that resolves with a void value.

### Parameters

| Name         | Type     | Description                                  |
| ------------ | -------- | -------------------------------------------- |
| transactions | object[] | The transactions that should be broadcasted. |

### Return Value

...

### Example

```ts
await clientService.broadcast([...]);
```
