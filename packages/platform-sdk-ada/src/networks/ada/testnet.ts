import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.CoinNetwork = {
	id: "ada.testnet",
	type: "test",
	name: "Testnet",
	explorer: "https://shelleyexplorer.cardano.org/",
	currency: {
		ticker: "ADA",
		symbol: "ADA",
	},
	crypto: {
		networkId: "0",
	},
	networking: {
		hosts: ["http://51.75.183.27:3100"],
	},
	governance: {
		voting: {
			enabled: false,
			delegateCount: 0,
			maximumPerWallet: 0,
			maximumPerTransaction: 0,
		},
	},
	featureFlags: {
		Client: {
			wallet: true,
		},
		Identity: {
			address: {
				mnemonic: true,
				publicKey: true,
			},
			publicKey: {
				mnemonic: true,
			},
			privateKey: {
				mnemonic: true,
			},
			keyPair: {
				mnemonic: true,
			},
		},
	},
};

export default network;
