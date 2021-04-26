import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.CoinNetwork = {
	id: "avax.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Avalanche",
	explorer: "https://explorer.avax.network/",
	currency: {
		ticker: "AVAX",
		symbol: "AVAX",
	},
	crypto: {
		networkId: "1",
		blockchainId: "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM",
		assetId: "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
		slip44: 9000,
		signingMethods: {
			privateKey: true,
		},
		expirationType: "height",
	},
	networking: {
		hosts: ["https://api.avax.network:443"],
		hostsArchival: ["https://api.avax.network:8080"],
	},
	governance: {
		voting: {
			enabled: false,
			delegateCount: 0,
			maximumPerWallet: 0,
			maximumPerTransaction: 0,
		},
	},
	featureFlags: {
		Client: {
			transactions: true,
			wallet: true,
			broadcast: true,
		},
		Identity: {
			address: {
				mnemonic: true,
				privateKey: true,
			},
			publicKey: {
				mnemonic: true,
			},
			privateKey: {
				mnemonic: true,
			},
			keyPair: {
				mnemonic: true,
				privateKey: true,
			},
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
		Transaction: {
			transfer: true,
			vote: true,
		},
		Miscellaneous: {
			utxo: true,
		},
		Derivation: {
			bip39: true,
			bip44: true,
		},
	},
	transactionTypes: ["transfer", "vote"],
};

export default network;
