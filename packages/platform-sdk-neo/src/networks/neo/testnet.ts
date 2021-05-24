import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "neo.testnet",
	type: "test",
	name: "Testnet",
	coin: "NEO",
	currency: {
		ticker: "NEO",
		symbol: "NEO",
	},
	constants: {
		slip44: 888,
	},
	hosts: [
		{
			type: "full",
			host: "https://testnet1.neo2.coz.io:443",
		},
		{
			type: "full",
			host: "https://testnet2.neo2.coz.io:443",
		},
		{
			type: "full",
			host: "https://testnet3.neo2.coz.io:443",
		},
		{
			type: "full",
			host: "http://seed1.ngd.network:20332",
		},
		{
			type: "full",
			host: "http://seed2.ngd.network:20332",
		},
		{
			type: "explorer",
			host: "https://neoscan-testnet.io/",
		},
	],
	transactions,
	importMethods,
	featureFlags,
};

export default network;
