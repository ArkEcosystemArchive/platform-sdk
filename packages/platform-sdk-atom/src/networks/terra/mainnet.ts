import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.CoinNetwork = {
	id: "terra.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Terra",
	explorer: "https://terra.stake.id/",
	currency: {
		ticker: "LUNA",
		symbol: "LUNA",
	},
	crypto: {
		networkId: "columbus-3",
		slip44: 330,
		bech32: "terra",
		signingMethods: {
			mnemonic: true,
		},
		expirationType: "height",
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
			syncing: true,
			broadcast: true,
		},
		Identity: {
			address: {
				mnemonic: true,
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
			transfer: true,
		},
	},
	transactionTypes: ["transfer"],
};

export default network;
