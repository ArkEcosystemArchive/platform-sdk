import { Coins } from "@arkecosystem/platform-sdk";

import { constants, transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "ada.testnet",
	type: "test",
	name: "Testnet",
	coin: "Cardano",
	currency: {
		ticker: "ADA",
		symbol: "ADA",
	},
	constants,
	hosts: [
		{
			type: "full",
			host: { url: "http://51.75.183.27:3100" },
		},
		{
			type: "explorer",
			host: { url: "https://shelleyexplorer.cardano.org/" },
		},
	],
	meta: {
		minFeeA: 44,
		minFeeB: 155381,
		minUTxOValue: 1000000,
		poolDeposit: 500000000,
		keyDeposit: 2000000,
		// @TODO
		networkId: "0",
		extendedPublicKey: true,
	},
};

export default network;
