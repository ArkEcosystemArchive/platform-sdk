import { Networks } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Networks.NetworkManifest = {
	id: "neo.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "NEO",
	currency: {
		ticker: "NEO",
		symbol: "NEO",
		decimals: 8,
	},
	constants: {
		slip44: 888,
	},
	hosts: [
		{
			type: "full",
			host: "https://seed1.switcheo.network:10331",
		},
		{
			type: "full",
			host: "https://seed3.switcheo.network:10331",
		},
		{
			type: "full",
			host: "http://seed1.ngd.network:10332",
		},
		{
			type: "full",
			host: "http://seed2.ngd.network:10332",
		},
		{
			type: "full",
			host: "http://seed3.ngd.network:10332",
		},
		{
			type: "full",
			host: "http://seed4.ngd.network:10332",
		},
		{
			type: "full",
			host: "http://seed5.ngd.network:10332",
		},
		{
			type: "full",
			host: "http://seed6.ngd.network:10332",
		},
		{
			type: "full",
			host: "http://seed7.ngd.network:10332",
		},
		{
			type: "full",
			host: "http://seed8.ngd.network:10332",
		},
		{
			type: "full",
			host: "http://seed9.ngd.network:10332",
		},
		{
			type: "full",
			host: "https://m2.neo.nash.io",
		},
		{
			type: "full",
			host: "https://m3.neo.nash.io",
		},
		{
			type: "full",
			host: "https://m4.neo.nash.io",
		},
		{
			type: "full",
			host: "https://m5.neo.nash.io",
		},
		{
			type: "full",
			host: "https://mainnet1.neo2.coz.io:443",
		},
		{
			type: "full",
			host: "https://mainnet2.neo2.coz.io:443",
		},
		{
			type: "full",
			host: "https://mainnet3.neo2.coz.io:443",
		},
		{
			type: "explorer",
			host: "https://neotracker.io",
		},
	],
	transactions,
	importMethods,
	featureFlags,
};

export default network;
