import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "eth.rinkeby",
	type: "test",
	name: "Rinkeby",
	coin: "Ethereum",
	explorer: "https://rinkeby.etherscan.io/",
	currency: {
		ticker: "ETH",
		symbol: "Ξ",
	},
	fees: {
		type: "gas",
		ticker: "ETH",
	},
	constants: {
		networkId: "4",
		slip44: 60,
		signingMethods: {
			mnemonic: true,
			privateKey: true,
		},
		expirationType: "height",
	},
	networking: {
		hosts: ["https://coins.com/api/eth"],
	},
	featureFlags: {
		Identity: {
			address: {
				publicKey: true,
				privateKey: true,
			},
			keyPair: {
				privateKey: true,
			},
		},
		Link: {
			block: true,
			transaction: true,
			wallet: true,
		},
		Message: {
			sign: true,
			verify: true,
		},
		Transaction: {
			transfer: { default: true },
		},
		Derivation: {
			bip39: true,
			bip44: true,
		},
	},
	transactions,
	importMethods,
	featureFlags,
};

export default network;
