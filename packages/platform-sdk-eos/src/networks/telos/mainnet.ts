import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "telos.mainnet",
	type: "live",
	name: "Mainnet",
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
			host: "https://apinode.telosgermany.io",
		},
		{
			type: "full",
			host: "https://api.telosfoundation.io",
		},
		{
			type: "full",
			host: "https://telos-mainnet.eosblocksmith.io",
		},
		{
			type: "full",
			host: "https://telos.caleos.io",
		},
		{
			type: "explorer",
			host: "https://telos.bloks.io",
		},
	],
	transactions: {
		...transactions,
		...{
			fees: {
				type: "free",
				ticker: "TLOS",
			},
		},
	},
	importMethods,
	featureFlags,
	meta: {
		// @TODO
		networkId: "4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11",
	},
};

export default network;
