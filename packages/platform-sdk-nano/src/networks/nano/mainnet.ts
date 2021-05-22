import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "nano.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Nano",
	explorer: "https://nanocrawler.cc",
	currency: {
		ticker: "NANO",
		symbol: "NANO",
	},
	fees: {
		type: "free",
		ticker: "NANO",
	},
	constants: {
		slip44: 165,
		expirationType: "height",
	},
	networking: {
		hosts: ["https://proxy.nanos.cc/proxy"],
	},
	featureFlags: {
		Identity: {
			address: {
				mnemonic: true,
				publicKey: true,
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
		Derivation: {
			bip39: true,
			bip44: true,
		},
	},
	transactionTypes: [],
};

export default network;
