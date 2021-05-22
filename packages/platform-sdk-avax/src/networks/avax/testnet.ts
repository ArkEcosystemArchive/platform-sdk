import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "avax.testnet",
	type: "live",
	name: "Testnet",
	coin: "Avalanche",
	currency: {
		ticker: "FUJI",
		symbol: "FUJI",
	},
	constants: {
		slip44: 9000,
	},
	hosts: [
		{
			type: "full",
			host: "https://api.avax-test.network:443",
		},
		{
			type: "archival",
			host: "https://api.avax-test.network:8080",
		},
		{
			type: "explorer",
			host: "https://explorer.avax-test.network/",
		},
	],
	transactions: {
		...transactions,
		...{
			fees: {
				type: "static",
				ticker: "FUJI",
			},
		},
	},
	importMethods,
	featureFlags,
	meta: {
		// @TODO
		networkId: "5",
		blockchainId: "2JVSBoinj9C2J33VntvzYtVJNZdN2NKiwwKjcumHUWEb5DbBrm",
		assetId: "U8iRqJoiJm8xZHAacmvYyZVwqQx6uDNtQeP3CQ6fcgQk3JqnK",
	},
};

export default network;
