import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "egld.testnet",
	type: "test",
	name: "Testnet",
	coin: "Elrond",
	explorer: "https://testnet-explorer.elrond.com",
	currency: {
		ticker: "XeGLD",
		symbol: "XeGLD",
	},
	fees: {
		type: "gas",
		ticker: "XeGLD",
	},
	constants: {
		slip44: 508,
		expirationType: "height",
	},
	networking: {
		hosts: ["https://testnet-gateway.elrond.com"],
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
