import { Networks } from "@arkecosystem/platform-sdk";

import { explorer, featureFlags, importMethods, transactions } from "./shared";

const network: Networks.NetworkManifest = {
	id: "telos.testnet",
	type: "test",
	name: "Testnet",
	coin: "Telos",
	currency: {
		ticker: "TLOS",
		symbol: "TLOS",
		decimals: 4,
	},
	constants: {
		slip44: 194,
		bech32: "TLOS",
	},
	hosts: [
		{
			type: "full",
			host: "https://telos-testnet.eosblocksmith.io",
		},
		{
			type: "full",
			host: "https://api.eos.miami",
		},
		{
			type: "full",
			host: "https://testnet.telos.caleos.io",
		},
		{
			type: "full",
			host: "https://api-test.telosfoundation.io",
		},
		{
			type: "explorer",
			host: "https://telos-test.bloks.io",
		},
	],
	transactions: {
		...transactions,
		fees: {
			type: "free",
			ticker: "TLOS",
		},
	},
	importMethods,
	featureFlags,
	explorer,
	meta: {
		// @TODO
		networkId: "e17615decaecd202a365f4c029f206eee98511979de8a5756317e2469f2289e3",
	},
};

export default network;
