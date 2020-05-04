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

## address

`address(opts: Contracts.AddressInput): Promise<string>`

Creates an address from various types of inputs.

### Parameters

| Name                      | Type   | Description                                                            |
| ------------------------- | ------ | ---------------------------------------------------------------------- |
| passphrase                | string | The passphrase that should be used to derive the address.              |
| multiSignature            | object | The multi signature details that should be used to derive the address. |
| multiSignature.min        | number | The minimum number of participants for the multi signature.            |
| multiSignature.publicKeys | string | The public keys for the participants of the multi signature.           |
| publicKey                 | string | The passphrase that should be used to derive the address.              |
| privateKey                | string | The passphrase that should be used to derive the address.              |
| wif                       | string | The passphrase that should be used to derive the address.              |

### Return Value

This method returns a promise that resolves with a string value.

### Example

```ts
await identityService.address({
	passphrase: "this is a top secret passphrase",
});
```

## publicKey

`publicKey(opts: Contracts.PublicKeyInput): Promise<string>`

Creates a public key from various types of inputs.

### Parameters

| Name                      | Type   | Description                                                               |
| ------------------------- | ------ | ------------------------------------------------------------------------- |
| passphrase                | string | The passphrase that should be used to derive the public key.              |
| multiSignature            | object | The multi signature details that should be used to derive the public key. |
| multiSignature.min        | number | The minimum number of participants for the multi signature.               |
| multiSignature.publicKeys | string | The public keys for the participants of the multi signature.              |
| wif                       | string | The WIF that should be used to derive the public key.                     |

### Return Value

This method returns a promise that resolves with a string value.

### Example

```ts
await identityService.publicKey({
	passphrase: "this is a top secret passphrase",
});
```

## privateKey

`privateKey(opts: Contracts.PrivateKeyInput): Promise<string>`

Creates a private key from various types of inputs.

### Parameters

| Name       | Type   | Description                                                   |
| ---------- | ------ | ------------------------------------------------------------- |
| passphrase | string | The passphrase that should be used to derive the private key. |
| wif        | string | The WIF that should be used to derive the private key.        |

### Return Value

This method returns a promise that resolves with a string value.

### Example

```ts
await identityService.privateKey({
	passphrase: "this is a top secret passphrase",
});
```

## wif

`wif(opts: Contracts.WifInput): Promise<string>`

Creates a WIF from various types of inputs.

### Parameters

| Name       | Type   | Description                                           |
| ---------- | ------ | ----------------------------------------------------- |
| passphrase | string | The passphrase that should be used to derive the WIF. |

### Return Value

This method returns a promise that resolves with a string value.

### Example

```ts
await identityService.privateKey({
	passphrase: "this is a top secret passphrase",
});
```

## keyPair

`keyPair(opts: Contracts.KeyPairInput): Promise<KeyPair>`

Creates a public/private-key pair from various types of inputs.

### Parameters

| Name       | Type   | Description                                                 |
| ---------- | ------ | ----------------------------------------------------------- |
| passphrase | string | The passphrase that should be used to derive the key-pair.  |
| publicKey  | string | The public key that should be used to derive the key-pair.  |
| privateKey | string | The private key that should be used to derive the key-pair. |
| wif        | string | The WIF that should be used to derive the key-pair.         |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
await identityService.keyPair({
	passphrase: "this is a top secret passphrase",
});
```
