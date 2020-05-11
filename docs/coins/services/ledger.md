# LedgerService

## construct

`construct(opts: Contracts.KeyValuePair): Promise<LedgerService>`

Create an instance of the service.

### Parameters

| Name    | Type   | Description                                            |
| ------- | ------ | ------------------------------------------------------ |
| options | object | The options to configure the behaviour of the service. |

### Return Value

This method returns a promise that resolves with a `LedgerService` value.

## destruct

`destruct(): Promise<void>`

Destroys the instance of the service.

### Parameters

This method has no parameters.

### Return Value

This method returns a promise that resolves with a void value.

## getVersion

`getVersion(): Promise<string>`

Gets the version of the ledger application.

### Parameters

This method has no parameters.

### Return Value

This method returns a promise that resolves to a string.

### Example

```ts
await ledgerService.getVersion();
```

## getPublicKey

`getPublicKey(path: string): Promise<string>`

Gets the public key of the wallet at the given BIP44 path.

### Parameters

| Name | Type   | Description                         |
| ---- | ------ | ----------------------------------- |
| path | string | The BIP44 path that should be used. |

### Return Value

This method returns a promise that resolves to a string.

### Example

```ts
await ledgerService.getPublicKey("...");
```

## signTransaction

`signTransaction(path: string, payload: Buffer): Promise<string>`

Signs a transaction with the ECDSA algorithm.

### Parameters

| Name    | Type   | Description                         |
| ------- | ------ | ----------------------------------- |
| path    | string | The BIP44 path that should be used. |
| payload | Buffer | The payload that should be signed.  |

### Return Value

This method returns a promise that resolves to a string.

### Example

```ts
await ledgerService.signTransaction("...", Buffer.from("..."));
```

## signTransactionWithSchnorr

`signTransactionWithSchnorr(path: string, payload: Buffer): Promise<string>`

Signs a transaction with the schnorr algorithm.

### Parameters

| Name    | Type   | Description                         |
| ------- | ------ | ----------------------------------- |
| path    | string | The BIP44 path that should be used. |
| payload | Buffer | The payload that should be signed.  |

### Return Value

This method returns a promise that resolves to a string.

### Example

```ts
await ledgerService.signTransactionWithSchnorr("...", Buffer.from("..."));
```

## signMessage

`signMessage(path: string, payload: Buffer): Promise<string>`

Signs a message with the ECDSA algorithm.

### Parameters

| Name    | Type   | Description                         |
| ------- | ------ | ----------------------------------- |
| path    | string | The BIP44 path that should be used. |
| payload | Buffer | The payload that should be signed.  |

### Return Value

This method returns a promise that resolves to a string.

### Example

```ts
await ledgerService.signMessage("...", Buffer.from("..."));
```

## signMessageWithSchnorr

`signMessageWithSchnorr(path: string, payload: Buffer): Promise<string>`

Signs a message with the schnorr algorithm.

### Parameters

| Name    | Type   | Description                         |
| ------- | ------ | ----------------------------------- |
| path    | string | The BIP44 path that should be used. |
| payload | Buffer | The payload that should be signed.  |

### Return Value

This method returns a promise that resolves to a string.

### Example

```ts
await ledgerService.signMessageWithSchnorr("...", Buffer.from("..."));
```
