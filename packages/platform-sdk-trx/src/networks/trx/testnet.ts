import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "trx.testnet",
	type: "test",
	name: "Testnet",
	coin: "TRON",
	explorer: "https://shasta.tronscan.org/#",
	currency: {
		ticker: "TRX",
		symbol: "TRX",
	},
	fees: {
		type: "free",
		ticker: "TRX",
	},
	constants: {
		slip44: 195,
		signingMethods: {
			mnemonic: true,
			privateKey: true,
		},
		expirationType: "height",
	},
	networking: {
		hosts: ["https://api.shasta.trongrid.io"],
	},
	featureFlags: {
		Client: {
			transaction: true,
			wallet: true,
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
