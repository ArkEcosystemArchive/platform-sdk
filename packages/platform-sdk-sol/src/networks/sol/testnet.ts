import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.NetworkManifest = {
	id: "sol.testnet",
	type: "test",
	name: "Testnet",
	coin: "Solana",
	hosts: [
		{
			type: "full",
			host: { url: "https://testnet.solana.com" },
		},
		{
			type: "explorer",
			host: { url: "https://explorer.solana.com/", query: { cluster: "testnet" } },
		},
	],
	currency: {
		ticker: "SOL",
		symbol: "SOL",
	},
	fees: {
		type: "dynamic",
		ticker: "SOL",
	},
	crypto: {
		slip44: 501,
		expirationType: "height",
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
			transfer: { default: true },
		},
		Derivation: {
			bip39: true,
			bip44: true,
		},
	},
	transactionTypes: ["transfer"],
};

export default network;
