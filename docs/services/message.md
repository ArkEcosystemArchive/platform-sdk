# MessageService

## construct

`construct(opts: Contracts.KeyValuePair): Promise<MessageService>`

Create an instance of the service.

### Parameters

| Name    | Type   | Description                                            |
| ------- | ------ | ------------------------------------------------------ |
| options | object | The options to configure the behaviour of the service. |

### Return Value

This method returns a promise that resolves with a `MessageService` value.

## destruct

`destruct(): Promise<void>`

Destroys the instance of the service.

### Parameters

This method has no parameters.

### Return Value

This method returns a promise that resolves with a void value.

## sign

`sign(input: Contracts.MessageInput): Promise<SignedMessage>`

Signs a message using the given passphrase.

### Parameters

| Name             | Type   | Description                                                                                                                  |
| ---------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------- |
| input            | object | The input that will be used to perform the message signing.                                                                  |
| input.message    | string | The message that should be signed.                                                                                           |
| input.passphrase | string | The value that will act as a passphrase. This can be a BIP39 passphrase, private key or WIF depending on the implementation. |

### Return Value

This method returns a promise that resolves with an object with the following structure:

```ts
{
	message: 'Hello World',
	signer: '034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192',
	signature: '304402200fb4adddd1f1d652b544ea6ab62828a0a65b712ed447e2538db0caebfa68929e02205ecb2e1c63b29879c2ecf1255db506d671c8b3fa6017f67cfd1bf07e6edd1cc8'
}
```

### Example

```ts
messageService.sign({
	message: "Hello World",
	passphrase: identity.passphrase,
});
```

## verify

`verify(input: Contracts.SignedMessage): Promise<boolean>`

Verifies a signed message that was created using the `MessageService#sign` method.

### Parameters

| Name            | Type   | Description                                               |
| --------------- | ------ | --------------------------------------------------------- |
| input           | object | The input that will be used to verify the message.        |
| input.message   | string | The message that should match the signature.              |
| input.signer    | string | The unique identifier of the signer.                      |
| input.signature | string | The unique signature that matches the message and signer. |

### Return Value

This method returns a promise that resolves with a boolean value.

### Example

```ts
messageService.verify({
	message: 'Hello World',
	signer: '034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192',
	signature: '304402200fb4adddd1f1d652b544ea6ab62828a0a65b712ed447e2538db0caebfa68929e02205ecb2e1c63b29879c2ecf1255db506d671c8b3fa6017f67cfd1bf07e6edd1cc8'
});
```
