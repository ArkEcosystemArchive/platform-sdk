# Manifest

Each coin follows a strict implementation contract which can be incomplete for certain coins due to how they work or a lack of features. The missing or unsupported methods will throw exceptions and to avoid unwanted surprised we need a way of letting consumers of the SDK know that calling a certain method will lead to an exception.

## Example

Lets take the `platform-sdk-ark` manifest as an example. It contains some information like the name and ticker but the important part is the `behaviours` key. This key contains all services and their methods with a boolean value to indicate if a method is safe to call.

```ts
export const manifest = {
	name: "ARK",
	ticker: "ARK",
	behaviours: {
		Client: {
			transaction: true,
			transactions: true,
			wallet: true,
			wallets: true,
			delegate: true,
			delegates: true,
			votes: true,
			voters: true,
			configuration: true,
			fees: true,
			syncing: true,
			broadcast: true,
		},
		Fee: {
			all: true,
		},
		Identity: {
			address: {
				passphrase: true,
				multiSignature: true,
				publicKey: true,
				privateKey: true,
				wif: true,
			},
			publicKey: {
				passphrase: true,
				multiSignature: true,
				wif: true,
			},
			privateKey: {
				passphrase: true,
				wif: true,
			},
			wif: {
				passphrase: true,
			},
			keyPair: {
				passphrase: true,
				publicKey: false,
				privateKey: false,
				wif: true,
			},
		},
		Ledger: {
			getVersion: true,
			getPublicKey: true,
			signTransaction: true,
			signMessage: true,
		},
		Link: {
			block: true,
			transaction: true,
			wallet: true,
		},
		Message: {
			sign: true,
			verify: true,
		},
		Peer: {
			search: true,
			searchWithPlugin: true,
			searchWithoutEstimates: true,
		},
		Transaction: {
			transfer: true,
			secondSignature: true,
			delegateRegistration: true,
			vote: true,
			multiSignature: true,
			ipfs: true,
			multiPayment: true,
			delegateResignation: true,
			htlcLock: true,
			htlcClaim: true,
			htlcRefund: true,
		},
	},
};
```

In the case of ARK it would be unsafe to call `IdentityService.keyPair({ privateKey: "..." })` because it would lead to an exception due to a lack of support for this specific way of retrieving a key-pair. Knowing that there is a lack of support for this feature before we even try to call the method will allow us to safe-guard our application against any unexpected behaviours for a certain coin.

An example of how the manifest would be commonly used is to check if a certain coin supports the `TransactionService.vote` method. Trying to call this for example for `ETH` would lead to an exception because voting is not yet supported for this coin.
