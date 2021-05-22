import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "xlm.testnet",
	type: "test",
	name: "Testnet",
	coin: "Stellar",
	explorer: "https://testnet.steexp.com",
	currency: {
		ticker: "XLM",
		symbol: "XLM",
	},
	fees: {
		type: "static",
		ticker: "XLM",
	},
	constants: {
		slip44: 148,
		expirationType: "height",
	},
	networking: {
		hosts: ["https://horizon-testnet.stellar.org"],
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
			transfer: { default: true },
		},
		Derivation: {
			bip39: true,
			bip44: true,
		},
	},
	transactions,
	importMethods,
	featureFlags,
};

export default network;
