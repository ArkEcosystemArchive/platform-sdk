import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "luna.testnet",
	type: "test",
	name: "Testnet",
	coin: "Luna",
	explorer: "TODO",
	currency: {
		ticker: "SOJU",
		symbol: "SOJU",
	},
	fees: {
		type: "dynamic",
		ticker: "SOJU",
	},
	constants: {
		slip44: 330,
		expirationType: "height",
	},
	networking: {
		hosts: ["https://soju-lcd.terra.dev"],
	},
	featureFlags: {
		Client: {
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
		Transaction: {
			transfer: { default: true },
		},
		Derivation: {
			bip39: true,
		},
	},
	transactions,
	importMethods,
	featureFlags,
};

export default network;
