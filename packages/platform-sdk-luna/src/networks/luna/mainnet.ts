import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "luna.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Luna",
	explorer: "TODO",
	currency: {
		ticker: "LUNA",
		symbol: "LUNA",
	},
	fees: {
		type: "dynamic",
		ticker: "LUNA",
	},
	constants: {
		slip44: 330,
		expirationType: "height",
	},
	networking: {
		hosts: ["https://luna-lcd.terra.dev/"],
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
				privateKey: true,
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
