import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.NetworkManifest = {
	id: "xlm.testnet",
	type: "test",
	name: "Testnet",
	coin: "Stellar",
	explorer: "https://testnet.steexp.com/",
	currency: {
		ticker: "XLM",
		symbol: "XLM",
	},
	fees: {
		type: "static",
		ticker: "XLM",
	},
	crypto: {
		slip44: 148,
		signingMethods: {
			mnemonic: true,
		},
		expirationType: "height",
	},
	networking: {
		hosts: ["https://horizon-testnet.stellar.org"],
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
			transaction: true,
			transactions: true,
			wallet: true,
			broadcast: true,
		},
		Identity: {
			address: {
				mnemonic: true,
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
		},
		Derivation: {
			bip39: true,
			bip44: true,
		},
	},
	transactionTypes: ["transfer"],
};

export default network;
