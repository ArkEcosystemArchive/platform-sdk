import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.CoinNetwork = {
	id: "sol.mainnet",
	type: "live",
	name: "Mainnet",
	explorer: "https://explorer.solana.com/",
	currency: {
		ticker: "SOL",
		symbol: "SOL",
	},
	crypto: {
		slip44: 501,
	},
	networking: {
		hosts: ["https://api.mainnet-beta.solana.com"],
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
	transactionTypes: ["transfer"],
};

export default network;
