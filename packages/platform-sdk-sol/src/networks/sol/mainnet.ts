import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.NetworkManifest = {
	id: "sol.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Solana",
	explorer: "https://explorer.solana.com/",
	currency: {
		ticker: "SOL",
		symbol: "SOL",
	},
	crypto: {
		slip44: 501,
		expirationType: "height",
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
			broadcast: true,
		},
		Identity: {
			address: {
				mnemonic: true,
				publicKey: true,
				privateKey: true,
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
		Link: {
			block: true,
			transaction: true,
			wallet: true,
		},
		Transaction: {
			transfer: true,
		},
		Derivation: {
			bip39: true,
			bip44: true,
		},
	},
	transactionTypes: ["transfer"],
};

export default network;
