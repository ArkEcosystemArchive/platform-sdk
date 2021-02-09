import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.CoinNetwork = {
	id: "ada.mainnet",
	type: "live",
	name: "Mainnet",
	explorer: "https://explorer.cardano.org/",
	currency: {
		ticker: "ADA",
		symbol: "ADA",
	},
	crypto: {
		networkId: 1,
		signingMethods: {
			mnemonic: false,
			privateKey: false,
			wif: false,
		},
	},
	networking: {
		hosts: [],
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
				privateKey: true,
			},
		},
	},
};

export default network;
