import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "lsk.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Lisk",
	currency: {
		ticker: "LSK",
		symbol: "LSK",
		decimals: 7,
	},
	constants: {
		slip44: 134,
	},
	hosts: [
		{
			type: "full",
			host: "https://hub21.lisk.io",
		},
		{
			type: "full",
			host: "https://hub22.lisk.io",
		},
		{
			type: "full",
			host: "https://hub23.lisk.io",
		},
		{
			type: "full",
			host: "https://hub24.lisk.io",
		},
		{
			type: "full",
			host: "https://hub25.lisk.io",
		},
		{
			type: "full",
			host: "https://hub26.lisk.io",
		},
		{
			type: "full",
			host: "https://hub27.lisk.io",
		},
		{
			type: "full",
			host: "https://hub28.lisk.io",
		},
		{
			type: "full",
			host: "https://hub31.lisk.io",
		},
		{
			type: "full",
			host: "https://hub32.lisk.io",
		},
		{
			type: "full",
			host: "https://hub33.lisk.io",
		},
		{
			type: "full",
			host: "https://hub34.lisk.io",
		},
		{
			type: "full",
			host: "https://hub35.lisk.io",
		},
		{
			type: "full",
			host: "https://hub36.lisk.io",
		},
		{
			type: "full",
			host: "https://hub37.lisk.io",
		},
		{
			type: "full",
			host: "https://hub38.lisk.io",
		},
		{
			type: "explorer",
			host: "https://explorer.lisk.io/",
		},
	],
	governance: {
		delegateCount: 101,
		votesPerWallet: 101,
		votesPerTransaction: 33,
	},
	transactions,
	importMethods,
	featureFlags,
	meta: {
		// @TODO
		networkId: "ed14889723f24ecc54871d058d98ce91ff2f973192075c0155ba2b7b70ad2511",
	},
};

export default network;
