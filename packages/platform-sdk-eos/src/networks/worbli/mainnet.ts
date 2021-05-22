import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "worbli.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Worbli",
	explorer: "https://worbli.bloks.io/",
	currency: {
		ticker: "WBI",
		symbol: "WBI",
	},
	fees: {
		type: "free",
		ticker: "WBI",
	},
	constants: {
		networkId: "73647cde120091e0a4b85bced2f3cfdb3041e266cbbe95cee59b73235a1b3b6f",
		slip44: 194,
		bech32: "WBI",
		signingMethods: {
			privateKey: true,
		},
		expirationType: "height",
	},
	networking: {
		hosts: ["https://api.worbli.io", "https://worbli-mainnet.eosblocksmith.io"],
	},
	featureFlags: {
		Client: {
			wallet: true,
			broadcast: true,
		},
		Identity: {
			publicKey: {
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
