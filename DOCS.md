# Documentation

- [Documentation](#documentation)
	- [Architecture](#architecture)
		- [Contracts](#contracts)
		- [Not Supported](#not-supported)
		- [Not Implemented](#not-implemented)
		- [Async Operations](#async-operations)
	- [Functionality](#functionality)
	- [API Methods](#api-methods)
		- [ClientService](#clientservice)
			- [construct](#construct)
				- [Parameters](#parameters)
				- [Return Value](#return-value)
				- [Example](#example)
			- [destruct](#destruct)
				- [Parameters](#parameters-1)
				- [Return Value](#return-value-1)
				- [Example](#example-1)
			- [transaction](#transaction)
				- [Parameters](#parameters-2)
				- [Return Value](#return-value-2)
				- [Example](#example-2)
			- [transactions](#transactions)
				- [Parameters](#parameters-3)
				- [Return Value](#return-value-3)
				- [Example](#example-3)
			- [wallet](#wallet)
				- [Parameters](#parameters-4)
				- [Return Value](#return-value-4)
				- [Example](#example-4)
			- [wallets](#wallets)
				- [Parameters](#parameters-5)
				- [Return Value](#return-value-5)
				- [Example](#example-5)
			- [delegate](#delegate)
				- [Parameters](#parameters-6)
				- [Return Value](#return-value-6)
				- [Example](#example-6)
			- [delegates](#delegates)
				- [Parameters](#parameters-7)
				- [Return Value](#return-value-7)
				- [Example](#example-7)
			- [votes](#votes)
				- [Parameters](#parameters-8)
				- [Return Value](#return-value-8)
				- [Example](#example-8)
			- [voters](#voters)
				- [Parameters](#parameters-9)
				- [Return Value](#return-value-9)
				- [Example](#example-9)
			- [configuration](#configuration)
				- [Parameters](#parameters-10)
				- [Return Value](#return-value-10)
				- [Example](#example-10)
			- [fees](#fees)
				- [Parameters](#parameters-11)
				- [Return Value](#return-value-11)
				- [Example](#example-11)
			- [syncing](#syncing)
				- [Parameters](#parameters-12)
				- [Return Value](#return-value-12)
				- [Example](#example-12)
			- [broadcast](#broadcast)
				- [Parameters](#parameters-13)
				- [Return Value](#return-value-13)
				- [Example](#example-13)
		- [IdentityService](#identityservice)
			- [construct](#construct-1)
				- [Parameters](#parameters-14)
				- [Return Value](#return-value-14)
				- [Example](#example-14)
			- [destruct](#destruct-1)
				- [Parameters](#parameters-15)
				- [Return Value](#return-value-15)
				- [Example](#example-15)
			- [address](#address)
				- [Parameters](#parameters-16)
				- [Return Value](#return-value-16)
				- [Example](#example-16)
			- [publicKey](#publickey)
				- [Parameters](#parameters-17)
				- [Return Value](#return-value-17)
				- [Example](#example-17)
			- [privateKey](#privatekey)
				- [Parameters](#parameters-18)
				- [Return Value](#return-value-18)
				- [Example](#example-18)
			- [wif](#wif)
				- [Parameters](#parameters-19)
				- [Return Value](#return-value-19)
				- [Example](#example-19)
			- [keyPair](#keypair)
				- [Parameters](#parameters-20)
				- [Return Value](#return-value-20)
				- [Example](#example-20)
		- [LinkService](#linkservice)
			- [block](#block)
				- [Parameters](#parameters-21)
				- [Return Value](#return-value-21)
				- [Example](#example-21)
			- [transaction](#transaction-1)
				- [Parameters](#parameters-22)
				- [Return Value](#return-value-22)
				- [Example](#example-22)
			- [wallet](#wallet-1)
				- [Parameters](#parameters-23)
				- [Return Value](#return-value-23)
				- [Example](#example-23)
		- [MessageService](#messageservice)
			- [construct](#construct-2)
				- [Parameters](#parameters-24)
				- [Return Value](#return-value-24)
				- [Example](#example-24)
			- [destruct](#destruct-2)
				- [Parameters](#parameters-25)
				- [Return Value](#return-value-25)
				- [Example](#example-25)
			- [sign](#sign)
				- [Parameters](#parameters-26)
				- [Return Value](#return-value-26)
				- [Example](#example-26)
			- [verify](#verify)
				- [Parameters](#parameters-27)
				- [Return Value](#return-value-27)
				- [Example](#example-27)
		- [PeerService](#peerservice)
			- [construct](#construct-3)
				- [Parameters](#parameters-28)
				- [Return Value](#return-value-28)
				- [Example](#example-28)
			- [destruct](#destruct-3)
				- [Parameters](#parameters-29)
				- [Return Value](#return-value-29)
				- [Example](#example-29)
			- [findPeers](#findpeers)
				- [Parameters](#parameters-30)
				- [Return Value](#return-value-30)
				- [Example](#example-30)
			- [findPeersWithPlugin](#findpeerswithplugin)
				- [Parameters](#parameters-31)
				- [Return Value](#return-value-31)
				- [Example](#example-31)
			- [findPeersWithoutEstimates](#findpeerswithoutestimates)
				- [Parameters](#parameters-32)
				- [Return Value](#return-value-32)
				- [Example](#example-32)
		- [TransactionService](#transactionservice)
			- [construct](#construct-4)
				- [Parameters](#parameters-33)
				- [Return Value](#return-value-33)
				- [Example](#example-33)
			- [destruct](#destruct-4)
				- [Parameters](#parameters-34)
				- [Return Value](#return-value-34)
				- [Example](#example-34)
			- [transfer](#transfer)
				- [Parameters](#parameters-35)
				- [Return Value](#return-value-35)
				- [Example](#example-35)
			- [secondSignature](#secondsignature)
				- [Parameters](#parameters-36)
				- [Return Value](#return-value-36)
				- [Example](#example-36)
			- [delegateRegistration](#delegateregistration)
				- [Parameters](#parameters-37)
				- [Return Value](#return-value-37)
				- [Example](#example-37)
			- [vote](#vote)
				- [Parameters](#parameters-38)
				- [Return Value](#return-value-38)
				- [Example](#example-38)
			- [multiSignature](#multisignature)
				- [Parameters](#parameters-39)
				- [Return Value](#return-value-39)
				- [Example](#example-39)
			- [ipfs](#ipfs)
				- [Parameters](#parameters-40)
				- [Return Value](#return-value-40)
				- [Example](#example-40)
			- [multiPayment](#multipayment)
				- [Parameters](#parameters-41)
				- [Return Value](#return-value-41)
				- [Example](#example-41)
			- [delegateResignation](#delegateresignation)
				- [Parameters](#parameters-42)
				- [Return Value](#return-value-42)
				- [Example](#example-42)
			- [htlcLock](#htlclock)
				- [Parameters](#parameters-43)
				- [Return Value](#return-value-43)
				- [Example](#example-43)
			- [htlcClaim](#htlcclaim)
				- [Parameters](#parameters-44)
				- [Return Value](#return-value-44)
				- [Example](#example-44)
			- [htlcRefund](#htlcrefund)
				- [Parameters](#parameters-45)
				- [Return Value](#return-value-45)
				- [Example](#example-45)

## Architecture

### Contracts

Each coin follows a strict implementation contract. All of these contracts can be found at [platform-sdk/src/contracts](https://github.com/ArkEcosystem/platform-sdk/tree/master/packages/platform-sdk/src/contracts).

### Not Supported

Methods that are not supported will throw a `NotSupported` exception. A case of this would be if a coin doesn't have a the concept of voting which means we won't be able to support that feature.

### Not Implemented

Methods that will be supported in the future but are not implemented yet will throw a `NotImplemented` exception. A case of this would be a coin that supports voting but we have no plans yet of supporting this functionality in our applications.

### Async Operations

The majority of methods are `async` with a few exceptions. This is due to the fact that some coins require a network connection or perform computations in an async manner.

To avoid an inconsistent public API where some things are instantiated and called with `await` and others aren't you'll have to call most things with `await` and use the static `construct` method to create an instance of a service. This will allow you to swap out adapters without having to think about how they are instantiated.

## Functionality

| Class              | Functions                 | ADA                | ARK                | ATOM               | BTC                | EOS                | ETH                | LSK                | NEO                | TRX                | XMR                | XRP                |
| ------------------ | ------------------------- | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ |
| ClientService      | transaction               | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| ClientService      | transactions              | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| ClientService      | wallet                    | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| ClientService      | wallets                   | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| ClientService      | delegate                  | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| ClientService      | delegates                 | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| ClientService      | peers                     | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| ClientService      | configuration             | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| ClientService      | fees                      | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| ClientService      | syncing                   | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| ClientService      | broadcast                 | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| TransactionService | transfer                  | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| TransactionService | secondSignature           | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| TransactionService | delegateRegistration      | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| TransactionService | vote                      | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| TransactionService | multiSignature            | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| TransactionService | ipfs                      | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| TransactionService | multiPayment              | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| TransactionService | delegateResignation       | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| TransactionService | htlcLock                  | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| TransactionService | htlcClaim                 | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| TransactionService | htlcRefund                | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| IdentityService    | address(passphrase)       | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| IdentityService    | address(multiSignature)   | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| IdentityService    | address(publicKey)        | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| IdentityService    | address(privateKey)       | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| IdentityService    | address(wif)              | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| IdentityService    | publicKey(passphrase)     | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| IdentityService    | publicKey(multiSignature) | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| IdentityService    | publicKey(wif)            | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| IdentityService    | privateKey(passphrase)    | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| IdentityService    | privateKey(wif)           | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| IdentityService    | wif(passphrase)           | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| IdentityService    | keyPair(passphrase)       | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| IdentityService    | keyPair(publicKey)        | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| IdentityService    | keyPair(privateKey)       | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| IdentityService    | keyPair(wif)              | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| MessageService     | sign                      | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| MessageService     | verify                    | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| PeerService        | all                       | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| PeerService        | allWithPlugin             | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| PeerService        | allWithoutEstimates       | :x: | :white_check_mark: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: | :x: |

## API Methods

### ClientService

#### construct

`construct(opts: Contracts.KeyValuePair): Promise<ClientService>`

...

##### Parameters

...

##### Return Value

...

##### Example

```ts
...
```

#### destruct

`destruct(): Promise<void>`

...

##### Parameters

This method has no parameters.

##### Return Value

This method returns a promise that resolves with a void value.

##### Example

```ts
...
```

#### transaction

`transaction(id: string): Promise<Contracts.TransactionData>`

...

##### Parameters

...

##### Return Value

...

##### Example

```ts
...
```

#### transactions

`transactions(query: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Contracts.TransactionData>>`

...

##### Parameters

...

##### Return Value

...

##### Example

```ts
...
```

#### wallet

`wallet(id: string): Promise<Contracts.WalletData>`

...

##### Parameters

...

##### Return Value

...

##### Example

```ts
...
```

#### wallets

`wallets(query: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Contracts.WalletData>>`

...

##### Parameters

...

##### Return Value

...

##### Example

```ts
...
```

#### delegate

`delegate(id: string): Promise<Contracts.DelegateData>`

...

##### Parameters

...

##### Return Value

...

##### Example

```ts
...
```

#### delegates

`delegates(query?: Contracts.KeyValuePair): Promise<Contracts.CollectionResponse<Contracts.DelegateData>>`

...

##### Parameters

...

##### Return Value

...

##### Example

```ts
...
```

#### votes

`votes(id: string): Promise<Contracts.CollectionResponse<Contracts.TransactionData>>`

...

##### Parameters

...

##### Return Value

...

##### Example

```ts
...
```

#### voters

`voters(id: string): Promise<Contracts.CollectionResponse<Contracts.WalletData>>`

...

##### Parameters

...

##### Return Value

...

##### Example

```ts
...
```

#### configuration

`configuration(): Promise<Contracts.KeyValuePair>`

...

##### Parameters

...

##### Return Value

...

##### Example

```ts
...
```

#### fees

`fees(days: number): Promise<Contracts.KeyValuePair>`

...

##### Parameters

...

##### Return Value

...

##### Example

```ts
...
```

#### syncing

`syncing(): Promise<boolean>`

...

##### Parameters

...

##### Return Value

...

##### Example

```ts
...
```

#### broadcast

`broadcast(transactions: object[]): Promise<void>`

...

##### Parameters

...

##### Return Value

...

##### Example

```ts
...
```

### IdentityService

#### construct

`construct(opts: Contracts.KeyValuePair): Promise<IdentityService>`

...

##### Parameters

...

##### Return Value

...

##### Example

```ts
...
```

#### destruct

`destruct(): Promise<void>`

...

##### Parameters

This method has no parameters.

##### Return Value

This method returns a promise that resolves with a void value.

##### Example

```ts
...
```

#### address

`address(opts: KeyValuePair): Promise<string>`

...

##### Parameters

...

##### Return Value

...

##### Example

```ts
await identityService.address({
	passphrase: "this is a top secret passphrase",
});
```

#### publicKey

`publicKey(opts: KeyValuePair): Promise<string>`

...

##### Parameters

...

##### Return Value

...

##### Example

```ts
await identityService.publicKey({
	passphrase: "this is a top secret passphrase",
});
```

#### privateKey

`privateKey(opts: KeyValuePair): Promise<string>`

...

##### Parameters

...

##### Return Value

...

##### Example

```ts
await identityService.privateKey({
	passphrase: "this is a top secret passphrase",
});
```

#### wif

`wif(opts: KeyValuePair): Promise<string>`

...

##### Parameters

...

##### Return Value

...

##### Example

```ts
await identityService.privateKey({
	passphrase: "this is a top secret passphrase",
});
```

#### keyPair

`keyPair(opts: KeyValuePair): Promise<KeyPair>`

...

##### Parameters

...

##### Return Value

...

##### Example

```ts
await identityService.keyPair({
	passphrase: "this is a top secret passphrase",
});
```

### LinkService

#### block

`block(id: string): string`

...

##### Parameters

...

##### Return Value

...

##### Example

```ts
...
```

#### transaction

`transaction(id: string): string`

...

##### Parameters

...

##### Return Value

...

##### Example

```ts
...
```

#### wallet

`wallet(id: string): string`

...

##### Parameters

...

##### Return Value

...

##### Example

```ts
...
```

### MessageService

#### construct

`construct(opts: Contracts.KeyValuePair): Promise<MessageService>`

...

##### Parameters

...

##### Return Value

...

##### Example

```ts
...
```

#### destruct

`destruct(): Promise<void>`

...

##### Parameters

This method has no parameters.

##### Return Value

This method returns a promise that resolves with a void value.

##### Example

```ts
...
```

#### sign

`sign(input): Promise<SignedMessage>`

...

##### Parameters

...

##### Return Value

...

##### Example

```ts
...
```

#### verify

`verify(input): Promise<boolean>`

...

##### Parameters

...

##### Return Value

...

##### Example

```ts
...
```

### PeerService

#### construct

`construct(opts: Contracts.KeyValuePair): Promise<PeerService>`

...

##### Parameters

...

##### Return Value

...

##### Example

```ts
...
```

#### destruct

`destruct(): Promise<void>`

...

##### Parameters

This method has no parameters.

##### Return Value

This method returns a promise that resolves with a void value.

##### Example

```ts
...
```

#### findPeers

`findPeers(opts: any): Promise<PeerResponse[]>`

...

##### Parameters

...

##### Return Value

...

##### Example

```ts
...
```

#### findPeersWithPlugin

`findPeersWithPlugin(name: string, opts: { additional?: string[] }): Promise<Peer[]>`

...

##### Parameters

...

##### Return Value

...

##### Example

```ts
...
```

#### findPeersWithoutEstimates

`findPeersWithoutEstimates(opts: { additional?: string[] }): Promise<Peer[]>`

...

##### Parameters

...

##### Return Value

...

##### Example

```ts
...
```

### TransactionService

#### construct

`construct(opts: Contracts.KeyValuePair): Promise<TransactionService>`

...

##### Parameters

...

##### Return Value

...

##### Example

```ts
...
```

#### destruct

`destruct(): Promise<void>`

...

##### Parameters

This method has no parameters.

##### Return Value

This method returns a promise that resolves with a void value.

##### Example

```ts
...
```

#### transfer

`transfer(input: TransferInput): Promise<SignedTransaction>`

...

##### Parameters

...

##### Return Value

...

##### Example

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

#### secondSignature

`secondSignature(input: SecondSignatureInput): Promise<SignedTransaction>`

...

##### Parameters

...

##### Return Value

...

##### Example

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

#### delegateRegistration

`delegateRegistration(input: DelegateRegistrationInput): Promise<SignedTransaction>`

...

##### Parameters

...

##### Return Value

...

##### Example

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

#### vote

`vote(input: VoteInput): Promise<SignedTransaction>`

...

##### Parameters

...

##### Return Value

...

##### Example

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

#### multiSignature

`multiSignature(input: MultiSignatureInput): Promise<SignedTransaction>`

...

##### Parameters

...

##### Return Value

...

##### Example

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

#### ipfs

`ipfs(input: IpfsInput): Promise<SignedTransaction>`

...

##### Parameters

...

##### Return Value

...

##### Example

```ts
await transactionService.ipfs({
	nonce: 1,
	sign: {
		passphrase: "this is a top secret passphrase",
	},
	data: { hash: "QmR45FmbVVrixReBwJkhEKde2qwHYaQzGxu4ZoDeswuF9w" },
});
```

#### multiPayment

`multiPayment(input: MultiPaymentInput): Promise<SignedTransaction>`

...

##### Parameters

...

##### Return Value

...

##### Example

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

#### delegateResignation

`delegateResignation(input: DelegateResignationInput): Promise<SignedTransaction>`

...

##### Parameters

...

##### Return Value

...

##### Example

```ts
await transactionService.delegateResignation({
	nonce: 1,
	sign: {
		passphrase: "this is a top secret passphrase",
	},
});
```

#### htlcLock

`htlcLock(input: HtlcLockInput): Promise<SignedTransaction>`

...

##### Parameters

...

##### Return Value

...

##### Example

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

#### htlcClaim

`htlcClaim(input: HtlcClaimInput): Promise<SignedTransaction>`

...

##### Parameters

...

##### Return Value

...

##### Example

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

#### htlcRefund

`htlcRefund(input: HtlcRefundInput): Promise<SignedTransaction>`

...

##### Parameters

...

##### Return Value

...

##### Example

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
