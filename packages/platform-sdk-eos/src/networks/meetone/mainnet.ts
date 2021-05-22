import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "meetone.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "MEET.ONE",
	explorer: "https://meetone.bloks.io/",
	currency: {
		ticker: "MEETONE",
		symbol: "MEETONE",
	},
	fees: {
		type: "free",
		ticker: "MEETONE",
	},
	constants: {
		networkId: "cfe6486a83bad4962f232d48003b1824ab5665c36778141034d75e57b956e422",
		slip44: 194,
		bech32: "MEETONE",
		signingMethods: {
			privateKey: true,
		},
		expirationType: "height",
	},
	networking: {
		hosts: ["https://fullnode.meet.one"],
	},
	featureFlags: {
		Client: {
			wallet: true,
			broadcast: true,
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
