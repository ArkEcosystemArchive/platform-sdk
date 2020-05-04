# TransactionService

## construct

`construct(opts: Contracts.KeyValuePair): Promise<TransactionService>`

Create an instance of the service.

### Parameters

| Name    | Type   | Description                                            |
| ------- | ------ | ------------------------------------------------------ |
| options | object | The options to configure the behaviour of the service. |

### Return Value

This method returns a promise that resolves with a `TransactionService` value.

## destruct

`destruct(): Promise<void>`

Destroys the instance of the service.

### Parameters

This method has no parameters.

### Return Value

This method returns a promise that resolves with a void value.

## transfer

`transfer(input: TransferInput): Promise<SignedTransaction>`

Creates a new Transfer transaction.

### Parameters

| Name                  | Type     | Description                                                                                            |
| --------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| data                  | object   | The object containing all data required for the transaction.                                           |
| data.amount           | string   | The amount that should be transfered.                                                                  |
| data.to               | string   | The address of the wallet that should receive the funds.                                               |
| data.memo             | string   | The message that should be used. **This is optional.**                                                 |
| fee                   | string   | The fee that should be used for the transaction. **This can be optional on a per coin basis.**         |
| feeLimit              | string   | The maximum fee that should be used for the transaction. **This can be optional on a per coin basis.** |
| nonce                 | string   | The expected nonce of the transaction. **This can be optional on a per coin basis.**                   |
| sign                  | object   | The object containing all data required for the signing.                                               |
| sign.passphrase       | string   | The passphrase of the signer.                                                                          |
| sign.passphrases      | string[] | The passphrases of all signers.                                                                        |
| sign.secondPassphrase | string   | The second passphrase of the signer.                                                                   |
| sign.wif              | string   | The WIF of the signer.                                                                                 |
| sign.secondWif        | string   | The second WIF of the signer.                                                                          |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
await transactionService.transfer({
	nonce: 1,
	sign: {
		passphrase: "this is a top secret passphrase",
	},
	data: {
		amount: 1,
		to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
	},
});
```

## secondSignature

`secondSignature(input: SecondSignatureInput): Promise<SignedTransaction>`

Creates a new Second Signature Registration transaction.

### Parameters

| Name                  | Type     | Description                                                                                            |
| --------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| data                  | object   | The object containing all data required for the transaction.                                           |
| data.passphrase       | string   | The passphrase that should be used as a second passphrase.                                             |
| fee                   | string   | The fee that should be used for the transaction. **This can be optional on a per coin basis.**         |
| feeLimit              | string   | The maximum fee that should be used for the transaction. **This can be optional on a per coin basis.** |
| nonce                 | string   | The expected nonce of the transaction. **This can be optional on a per coin basis.**                   |
| sign                  | object   | The object containing all data required for the signing.                                               |
| sign.passphrase       | string   | The passphrase of the signer.                                                                          |
| sign.passphrases      | string[] | The passphrases of all signers.                                                                        |
| sign.secondPassphrase | string   | The second passphrase of the signer.                                                                   |
| sign.wif              | string   | The WIF of the signer.                                                                                 |
| sign.secondWif        | string   | The second WIF of the signer.                                                                          |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
await transactionService.secondSignature({
	nonce: 1,
	sign: {
		passphrase: "this is a top secret passphrase",
	},
	data: {
		passphrase: "this is a top secret second passphrase",
	},
});
```

## delegateRegistration

`delegateRegistration(input: DelegateRegistrationInput): Promise<SignedTransaction>`

Creates a new Delegate Registration transaction.

### Parameters

| Name                  | Type     | Description                                                                                            |
| --------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| data                  | object   | The object containing all data required for the transaction.                                           |
| data.username         | string   | The username that should be used as unique identifier.                                                 |
| fee                   | string   | The fee that should be used for the transaction. **This can be optional on a per coin basis.**         |
| feeLimit              | string   | The maximum fee that should be used for the transaction. **This can be optional on a per coin basis.** |
| nonce                 | string   | The expected nonce of the transaction. **This can be optional on a per coin basis.**                   |
| sign                  | object   | The object containing all data required for the signing.                                               |
| sign.passphrase       | string   | The passphrase of the signer.                                                                          |
| sign.passphrases      | string[] | The passphrases of all signers.                                                                        |
| sign.secondPassphrase | string   | The second passphrase of the signer.                                                                   |
| sign.wif              | string   | The WIF of the signer.                                                                                 |
| sign.secondWif        | string   | The second WIF of the signer.                                                                          |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
await transactionService.delegateRegistration({
	nonce: 1,
	sign: {
		passphrase: "this is a top secret passphrase",
	},
	data: {
		username: "johndoe",
	},
});
```

## vote

`vote(input: VoteInput): Promise<SignedTransaction>`

Creates a new Vote transaction.

### Parameters

| Name                  | Type     | Description                                                                                            |
| --------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| data                  | object   | The object containing all data required for the transaction.                                           |
| data.vote             | string   | The public key of the delegate wallet that should be voted for.                                        |
| fee                   | string   | The fee that should be used for the transaction. **This can be optional on a per coin basis.**         |
| feeLimit              | string   | The maximum fee that should be used for the transaction. **This can be optional on a per coin basis.** |
| nonce                 | string   | The expected nonce of the transaction. **This can be optional on a per coin basis.**                   |
| sign                  | object   | The object containing all data required for the signing.                                               |
| sign.passphrase       | string   | The passphrase of the signer.                                                                          |
| sign.passphrases      | string[] | The passphrases of all signers.                                                                        |
| sign.secondPassphrase | string   | The second passphrase of the signer.                                                                   |
| sign.wif              | string   | The WIF of the signer.                                                                                 |
| sign.secondWif        | string   | The second WIF of the signer.                                                                          |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
await transactionService.vote({
	nonce: 1,
	sign: {
		passphrase: "this is a top secret passphrase",
	},
	data: {
		vote: "+03bbfb43ecb5a54a1e227bb37b5812b5321213838d376e2b455b6af78442621dec",
	},
});
```

## multiSignature

`multiSignature(input: MultiSignatureInput): Promise<SignedTransaction>`

Creates a new Multi-Signature Registration transaction.

### Parameters

| Name                  | Type     | Description                                                                                            |
| --------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| data                  | object   | The object containing all data required for the transaction.                                           |
| data.hash             | string   | The IPFS hash that should be used.                                                                     |
| fee                   | string   | The fee that should be used for the transaction. **This can be optional on a per coin basis.**         |
| feeLimit              | string   | The maximum fee that should be used for the transaction. **This can be optional on a per coin basis.** |
| nonce                 | string   | The expected nonce of the transaction. **This can be optional on a per coin basis.**                   |
| sign                  | object   | The object containing all data required for the signing.                                               |
| sign.passphrase       | string   | The passphrase of the signer.                                                                          |
| sign.passphrases      | string[] | The passphrases of all signers.                                                                        |
| sign.secondPassphrase | string   | The second passphrase of the signer.                                                                   |
| sign.wif              | string   | The WIF of the signer.                                                                                 |
| sign.secondWif        | string   | The second WIF of the signer.                                                                          |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
await transactionService.multiSignature({
	nonce: 1,
	data: {
		publicKeys: [
			"039180ea4a8a803ee11ecb462bb8f9613fcdb5fe917e292dbcc73409f0e98f8f22",
			"028d3611c4f32feca3e6713992ae9387e18a0e01954046511878fe078703324dc0",
			"021d3932ab673230486d0f956d05b9e88791ee298d9af2d6df7d9ed5bb861c92dd",
		],
		min: 2,
		senderPublicKey: "039180ea4a8a803ee11ecb462bb8f9613fcdb5fe917e292dbcc73409f0e98f8f22",
	},
	sign: {
		passphrases: [
			"this is a top secret passphrase 1",
			"this is a top secret passphrase 2",
			"this is a top secret passphrase 3",
		],
		passphrase: "this is a top secret passphrase 1",
	},
});
```

## ipfs

`ipfs(input: IpfsInput): Promise<SignedTransaction>`

Creates a new IPFS transaction.

### Parameters

| Name                  | Type     | Description                                                                                            |
| --------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| data                  | object   | The object containing all data required for the transaction.                                           |
| data.hash             | string   | The IPFS hash that should be stored.                                                                   |
| fee                   | string   | The fee that should be used for the transaction. **This can be optional on a per coin basis.**         |
| feeLimit              | string   | The maximum fee that should be used for the transaction. **This can be optional on a per coin basis.** |
| nonce                 | string   | The expected nonce of the transaction. **This can be optional on a per coin basis.**                   |
| sign                  | object   | The object containing all data required for the signing.                                               |
| sign.passphrase       | string   | The passphrase of the signer.                                                                          |
| sign.passphrases      | string[] | The passphrases of all signers.                                                                        |
| sign.secondPassphrase | string   | The second passphrase of the signer.                                                                   |
| sign.wif              | string   | The WIF of the signer.                                                                                 |
| sign.secondWif        | string   | The second WIF of the signer.                                                                          |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
await transactionService.ipfs({
	nonce: 1,
	sign: {
		passphrase: "this is a top secret passphrase",
	},
	data: { hash: "QmR45FmbVVrixReBwJkhEKde2qwHYaQzGxu4ZoDeswuF9w" },
});
```

## multiPayment

`multiPayment(input: MultiPaymentInput): Promise<SignedTransaction>`

Creates a new Multi-Payment transaction.

### Parameters

| Name                   | Type     | Description                                                                                            |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| data                   | object   | The object containing all data required for the transaction.                                           |
| data.payments          | object[] | The array of payments that should be transfered.                                                       |
| data.payments.*.to     | string   | The address of the wallet that should receive the funds.                                               |
| data.payments.*.amount | number   | The amount that should be transfered.                                                                  |
| fee                    | string   | The fee that should be used for the transaction. **This can be optional on a per coin basis.**         |
| feeLimit               | string   | The maximum fee that should be used for the transaction. **This can be optional on a per coin basis.** |
| nonce                  | string   | The expected nonce of the transaction. **This can be optional on a per coin basis.**                   |
| sign                   | object   | The object containing all data required for the signing.                                               |
| sign.passphrase        | string   | The passphrase of the signer.                                                                          |
| sign.passphrases       | string[] | The passphrases of all signers.                                                                        |
| sign.secondPassphrase  | string   | The second passphrase of the signer.                                                                   |
| sign.wif               | string   | The WIF of the signer.                                                                                 |
| sign.secondWif         | string   | The second WIF of the signer.                                                                          |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
await transactionService.multiPayment({
	nonce: 1,
	sign: {
		passphrase: "this is a top secret passphrase",
	},
	data: {
		payments: [
			{ to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9", amount: 10 },
			{ to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9", amount: 10 },
			{ to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9", amount: 10 },
		],
	},
});
```

## delegateResignation

`delegateResignation(input: DelegateResignationInput): Promise<SignedTransaction>`

Creates a new Delegate Resignation transaction.

### Parameters

| Name                  | Type     | Description                                                                                            |
| --------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| fee                   | string   | The fee that should be used for the transaction. **This can be optional on a per coin basis.**         |
| feeLimit              | string   | The maximum fee that should be used for the transaction. **This can be optional on a per coin basis.** |
| nonce                 | string   | The expected nonce of the transaction. **This can be optional on a per coin basis.**                   |
| sign                  | object   | The object containing all data required for the signing.                                               |
| sign.passphrase       | string   | The passphrase of the signer.                                                                          |
| sign.passphrases      | string[] | The passphrases of all signers.                                                                        |
| sign.secondPassphrase | string   | The second passphrase of the signer.                                                                   |
| sign.wif              | string   | The WIF of the signer.                                                                                 |
| sign.secondWif        | string   | The second WIF of the signer.                                                                          |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
await transactionService.delegateResignation({
	nonce: 1,
	sign: {
		passphrase: "this is a top secret passphrase",
	},
});
```

## htlcLock

`htlcLock(input: HtlcLockInput): Promise<SignedTransaction>`

Creates a new HTLC Lock transaction.

### Parameters

| Name                  | Type     | Description                                                                                            |
| --------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| data                  | object   | The object containing all data required for the transaction.                                           |
| data.amount           | string   | The amount that should be locked.                                                                      |
| data.to               | string   | The address of the wallet that can unlock the transaction.                                             |
| data.secretHash       | string   | The secret that should be used to unlock the funds.                                                    |
| data.expiration       | object   | The object that specifies when and how the transaction expires.                                        |
| data.expiration.type  | number   | The type of expiration that should be used.                                                            |
| data.expiration.value | number   | The value that should be used by the type of expiration.                                               |
| fee                   | string   | The fee that should be used for the transaction. **This can be optional on a per coin basis.**         |
| feeLimit              | string   | The maximum fee that should be used for the transaction. **This can be optional on a per coin basis.** |
| nonce                 | string   | The expected nonce of the transaction. **This can be optional on a per coin basis.**                   |
| sign                  | object   | The object containing all data required for the signing.                                               |
| sign.passphrase       | string   | The passphrase of the signer.                                                                          |
| sign.passphrases      | string[] | The passphrases of all signers.                                                                        |
| sign.secondPassphrase | string   | The second passphrase of the signer.                                                                   |
| sign.wif              | string   | The WIF of the signer.                                                                                 |
| sign.secondWif        | string   | The second WIF of the signer.                                                                          |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
await transactionService.htlcLock({
	nonce: 1,
	sign: {
		passphrase: "this is a top secret passphrase",
	},
	data: {
		amount: 1,
		to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
		secretHash: "0f128d401958b1b30ad0d10406f47f9489321017b4614e6cb993fc63913c5454",
		expiration: {
			type: 1,
			value: Math.floor(Date.now() / 1000),
		},
	},
});
```

## htlcClaim

`htlcClaim(input: HtlcClaimInput): Promise<SignedTransaction>`

Creates a new HTLC Claim transaction.

### Parameters

| Name                   | Type     | Description                                                                                            |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| data                   | object   | The object containing all data required for the transaction.                                           |
| data.lockTransactionId | string   | The ID of the HTLC Lock transaction that should be refunded.                                           |
| data.unlockSecret      | string   | The secret that should be used to unlock the HTLC Lock.                                                |
| fee                    | string   | The fee that should be used for the transaction. **This can be optional on a per coin basis.**         |
| feeLimit               | string   | The maximum fee that should be used for the transaction. **This can be optional on a per coin basis.** |
| nonce                  | string   | The expected nonce of the transaction. **This can be optional on a per coin basis.**                   |
| sign                   | object   | The object containing all data required for the signing.                                               |
| sign.passphrase        | string   | The passphrase of the signer.                                                                          |
| sign.passphrases       | string[] | The passphrases of all signers.                                                                        |
| sign.secondPassphrase  | string   | The second passphrase of the signer.                                                                   |
| sign.wif               | string   | The WIF of the signer.                                                                                 |
| sign.secondWif         | string   | The second WIF of the signer.                                                                          |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
await transactionService.htlcClaim({
	nonce: 1,
	sign: {
		passphrase: "this is a top secret passphrase",
	},
	data: {
		lockTransactionId: "943c220691e711c39c79d437ce185748a0018940e1a4144293af9d05627d2eb4",
		unlockSecret: "c27f1ce845d8c29eebc9006be932b604fd06755521b1a8b0be4204c65377151a",
	},
});
```

## htlcRefund

`htlcRefund(input: HtlcRefundInput): Promise<SignedTransaction>`

Creates a new HTLC Refund transaction.

### Parameters

| Name                   | Type     | Description                                                                                            |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| data                   | object   | The object containing all data required for the transaction.                                           |
| data.lockTransactionId | string   | The ID of the HTLC Lock transaction that should be refunded.                                           |
| fee                    | string   | The fee that should be used for the transaction. **This can be optional on a per coin basis.**         |
| feeLimit               | string   | The maximum fee that should be used for the transaction. **This can be optional on a per coin basis.** |
| nonce                  | string   | The expected nonce of the transaction. **This can be optional on a per coin basis.**                   |
| sign                   | object   | The object containing all data required for the signing.                                               |
| sign.passphrase        | string   | The passphrase of the signer.                                                                          |
| sign.passphrases       | string[] | The passphrases of all signers.                                                                        |
| sign.secondPassphrase  | string   | The second passphrase of the signer.                                                                   |
| sign.wif               | string   | The WIF of the signer.                                                                                 |
| sign.secondWif         | string   | The second WIF of the signer.                                                                          |

### Return Value

This method returns a promise that resolves with an object with the following structure:

...

### Example

```ts
await transactionService.htlcRefund({
	nonce: 1,
	sign: {
		passphrase: "this is a top secret passphrase",
	},
	data: {
		lockTransactionId: "943c220691e711c39c79d437ce185748a0018940e1a4144293af9d05627d2eb4",
	},
});
```
