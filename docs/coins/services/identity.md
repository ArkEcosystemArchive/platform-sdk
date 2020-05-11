# IdentityService

## construct

`construct(opts: Contracts.KeyValuePair): Promise<IdentityService>`

Create an instance of the service.

### Parameters

| Name    | Type   | Description                                            |
| ------- | ------ | ------------------------------------------------------ |
| options | object | The options to configure the behaviour of the service. |

### Return Value

This method returns a promise that resolves with a `IdentityService` value.

## destruct

`destruct(): Promise<void>`

Destroys the instance of the service.

### Parameters

This method has no parameters.

### Return Value

This method returns a promise that resolves with a void value.

## address.fromPassphrase

`address().fromPassphrase(passphrase: string): Promise<string>`

Creates an address from various types of inputs.

### Parameters

| Name       | Type   | Description                                               |
| ---------- | ------ | --------------------------------------------------------- |
| passphrase | string | The passphrase that should be used to derive the address. |

### Return Value

This method returns a promise that resolves with a string value.

### Example

```ts
await identityService.address().fromPassphrase("...");
```

## address.fromMultiSignature

`address().fromMultiSignature(min: number, publicKeys: string[]): Promise<string>`

Creates an address from various types of inputs.

### Parameters

| Name       | Type   | Description                                                  |
| ---------- | ------ | ------------------------------------------------------------ |
| min        | number | The minimum number of participants for the multi signature.  |
| publicKeys | string | The public keys for the participants of the multi signature. |

### Return Value

This method returns a promise that resolves with a string value.

### Example

```ts
await identityService.address().fromMultiSignature(2, ["...", "...", "..."]);
```

## address.fromPublicKey

`address().fromPublicKey(publicKey: string): Promise<string>`

Creates an address from various types of inputs.

### Parameters

| Name      | Type   | Description                                               |
| --------- | ------ | --------------------------------------------------------- |
| publicKey | string | The passphrase that should be used to derive the address. |

### Return Value

This method returns a promise that resolves with a string value.

### Example

```ts
await identityService.address().fromPublicKey("...");
```

## address.fromPrivateKey

`address().fromPrivateKey(privateKey: string): Promise<string>`

Creates an address from various types of inputs.

### Parameters

| Name       | Type   | Description                                               |
| ---------- | ------ | --------------------------------------------------------- |
| privateKey | string | The passphrase that should be used to derive the address. |

### Return Value

This method returns a promise that resolves with a string value.

### Example

```ts
await identityService.address().fromPrivateKey("...");
```

## address.fromWIF

`address().fromWIF(wif: string): Promise<string>`

Creates an address from various types of inputs.

### Parameters

| Name | Type   | Description                                               |
| ---- | ------ | --------------------------------------------------------- |
| wif  | string | The passphrase that should be used to derive the address. |

### Return Value

This method returns a promise that resolves with a string value.

### Example

```ts
await identityService.address().fromWIF("...");
```

## publicKey.fromPassphrase

`publicKey().fromPassphrase(): Promise<string>`

Creates a public key from various types of inputs.

### Parameters

| Name       | Type   | Description                                                  |
| ---------- | ------ | ------------------------------------------------------------ |
| passphrase | string | The passphrase that should be used to derive the public key. |

### Return Value

This method returns a promise that resolves with a string value.

### Example

```ts
await identityService.publicKey().fromPassphrase("...");
```

## publicKey.fromMultiSignature

`publicKey().fromMultiSignature(min: number, publicKeys: string[]): Promise<string>`

Creates a public key from various types of inputs.

### Parameters

| Name       | Type   | Description                                                  |
| ---------- | ------ | ------------------------------------------------------------ |
| min        | number | The minimum number of participants for the multi signature.  |
| publicKeys | string | The public keys for the participants of the multi signature. |

### Return Value

This method returns a promise that resolves with a string value.

### Example

```ts
await identityService.publicKey().fromMultiSignature(2, ["...", "...", "..."]);
```

## publicKey.fromWIF

`publicKey().fromWIF(wif: string): Promise<string>`

Creates a public key from various types of inputs.

### Parameters

| Name | Type   | Description                                           |
| ---- | ------ | ----------------------------------------------------- |
| wif  | string | The WIF that should be used to derive the public key. |

### Return Value

This method returns a promise that resolves with a string value.

### Example

```ts
await identityService.publicKey().fromWIF("...");
```

## privateKey

`privateKey().fromPassphrase(passphrase: string): Promise<string>`

Creates a private key from various types of inputs.

### Parameters

| Name       | Type   | Description                                                   |
| ---------- | ------ | ------------------------------------------------------------- |
| passphrase | string | The passphrase that should be used to derive the private key. |

### Return Value

This method returns a promise that resolves with a string value.

### Example

```ts
await identityService.privateKey().fromPassphrase("...");
```

## privateKey

`privateKey().fromWIF(wif: string): Promise<string>`

Creates a private key from various types of inputs.

### Parameters

| Name | Type   | Description                                            |
| ---- | ------ | ------------------------------------------------------ |
| wif  | string | The WIF that should be used to derive the private key. |

### Return Value

This method returns a promise that resolves with a string value.

### Example

```ts
await identityService.privateKey().fromWIF("...");
```

## wif

`wif().fromPassphrase(passphrase: string): Promise<string>`

Creates a WIF from various types of inputs.

### Parameters

| Name       | Type   | Description                                           |
| ---------- | ------ | ----------------------------------------------------- |
| passphrase | string | The passphrase that should be used to derive the WIF. |

### Return Value

This method returns a promise that resolves with a string value.

### Example

```ts
await identityService.wif().fromPassphrase("...");
```

## keys.fromPassphrase

`keys().fromPassphrase(passphrase: string): Promise<KeyPair>`

Creates a public/private-key pair from various types of inputs.

### Parameters

| Name       | Type   | Description                                                |
| ---------- | ------ | ---------------------------------------------------------- |
| passphrase | string | The passphrase that should be used to derive the key-pair. |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
await identityService.keys().fromPassphrase("...");
```

## keys.fromPrivateKey

`keys().fromPrivateKey(privateKey: string): Promise<KeyPair>`

Creates a public/private-key pair from various types of inputs.

### Parameters

| Name       | Type   | Description                                                 |
| ---------- | ------ | ----------------------------------------------------------- |
| privateKey | string | The private key that should be used to derive the key-pair. |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
await identityService.keys().fromPassphrase("...");
```

## keys.fromWIF

`keys().fromWIF(wif: string): Promise<KeyPair>`

Creates a public/private-key pair from various types of inputs.

### Parameters

| Name | Type   | Description                                         |
| ---- | ------ | --------------------------------------------------- |
| wif  | string | The WIF that should be used to derive the key-pair. |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
await identityService.keys().fromPassphrase("...");
```
