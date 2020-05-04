# LinkService

## construct

`construct(opts: Contracts.KeyValuePair): Promise<LinkService>`

Create an instance of the service.

### Parameters

| Name    | Type   | Description                                            |
| ------- | ------ | ------------------------------------------------------ |
| options | object | The options to configure the behaviour of the service. |

### Return Value

This method returns a promise that resolves with a `LinkService` value.

## destruct

`destruct(): Promise<void>`

Destroys the instance of the service.

### Parameters

This method has no parameters.

### Return Value

This method returns a promise that resolves with a void value.

## block

`block(id: string): string`

Creates a link that can be used to view details about a block.

### Parameters

| Name | Type   | Description                     |
| ---- | ------ | ------------------------------- |
| id   | string | The unique identifier of block. |

### Return Value

This method returns a string value.

### Example

```ts
https://explorer.ark.io/block/55b3fe57f101ffeeb301f1be96aa0c08f69e08536e786802a26c008f7d42f6e9
```

## transaction

`transaction(id: string): string`

Creates a link that can be used to view details about a transaction.

### Parameters

| Name | Type   | Description                           |
| ---- | ------ | ------------------------------------- |
| id   | string | The unique identifier of transaction. |

### Return Value

This method returns a string value.

### Example

```ts
https://explorer.ark.io/transaction/5e3b8d8711570c320310eedc408bc5d0d6d7b49b3de5337cc256e40ee0eef037
```

## wallet

`wallet(id: string): string`

Creates a link that can be used to view details about a wallet.

### Parameters

| Name | Type   | Description                      |
| ---- | ------ | -------------------------------- |
| id   | string | The unique identifier of wallet. |

### Return Value

This method returns a string value.

### Example

```ts
https://explorer.ark.io/wallets/AJ1eWcCz8xnq1ZZxSunVBpe8r6kZcqWbCq
```
