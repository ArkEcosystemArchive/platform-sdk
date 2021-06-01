import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "worbli.testnet",
	type: "test",
	name: "Testnet",
	coin: "Worbli",
	currency: {
		ticker: "WBI",
		symbol: "WBI",
		decimals: 4,
	},
	constants: {
		slip44: 194,
		bech32: "WBI",
	},
	hosts: [
		{
			type: "full",
			host: "https://worbli-testnet.eosblocksmith.io",
		},
		{
			type: "full",
			host: "https://worbli-testnet.eosphere.io",
		},
		{
			type: "explorer",
			host: "https://worbli-test.bloks.io",
		},
	],
	transactions: {
		...transactions,
		...{
			fees: {
				type: "free",
				ticker: "WBI",
			},
		},
	},
	importMethods,
	featureFlags,
	meta: {
		// @TODO
		networkId: "0d1ba39b44e70e9c36b74d60677ef3b686bd4347ade092b816886a6a35ddb6f7",
	},
};

export default network;
