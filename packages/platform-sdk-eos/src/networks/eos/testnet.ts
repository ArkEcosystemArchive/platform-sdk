import { Networks } from "@arkecosystem/platform-sdk";

import { explorer, transactions, importMethods, featureFlags } from "../shared";

const network: Networks.NetworkManifest = {
	id: "eos.testnet",
	type: "test",
	name: "Testnet",
	coin: "EOS",
	currency: {
		ticker: "EOS",
		symbol: "EOS",
		decimals: 4,
	},
	constants: {
		slip44: 194,
		bech32: "EOS",
	},
	hosts: [
		{
			type: "full",
			host: "https://api.testnet.eos.io",
		},
		{
			type: "explorer",
			host: "https://eos-test.bloks.io",
		},
	],
	transactions,
	importMethods,
	featureFlags,
	explorer,
	meta: {
		// @TODO
		networkId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473",
	},
};

export default network;
