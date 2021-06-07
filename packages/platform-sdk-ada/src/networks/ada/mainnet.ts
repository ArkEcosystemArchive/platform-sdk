import { Networks } from "@arkecosystem/platform-sdk";

import { explorer, constants, transactions, importMethods, featureFlags } from "../shared";

const network: Networks.NetworkManifest = {
	id: "ada.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Cardano",
	currency: {
		ticker: "ADA",
		symbol: "ADA",
		decimals: 6,
	},
	constants,
	hosts: [
		{
			type: "explorer",
			host: "https://explorer.cardano.org",
		},
	],
	transactions,
	importMethods,
	featureFlags,
	explorer,
	meta: {
		minFeeA: 44,
		minFeeB: 155381,
		minUTxOValue: 1000000,
		poolDeposit: 500000000,
		keyDeposit: 2000000,
		// @TODO
		networkId: "1",
		extendedPublicKey: true,
	},
};

export default network;
