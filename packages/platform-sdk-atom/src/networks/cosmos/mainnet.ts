import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.NetworkManifest = {
	id: "cosmos.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Cosmos",
	explorer: "https://stake.id/",
	currency: {
		ticker: "ATOM",
		symbol: "ATOM",
	},
	fees: {
		type: "static",
		ticker: "ATOM",
	},
	crypto: {
		networkId: "cosmoshub-3",
		slip44: 118,
		bech32: "cosmos",
		signingMethods: {
			mnemonic: true,
		},
		expirationType: "height",
	},
	networking: {
		// @NOTE: no longer responsive even though it should be official
		// hosts: ["https://api.cosmos.network"],
		hosts: ["https://node.atomscan.com"],
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
			broadcast: true,
			syncing: true,
			transaction: true,
			transactions: true,
			wallet: true,
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
		Derivation: {
			bip39: true,
			bip44: true,
		},
	},
	transactionTypes: ["transfer"],
	importMethods: ["bip38", "bip39", "bip44", "bip49", "bip84", "privateKey", "secret", "wif"],
};

export default network;
