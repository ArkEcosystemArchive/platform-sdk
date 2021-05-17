import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.NetworkManifest = {
	id: "cosmos.testnet",
	type: "test",
	name: "Testnet",
	coin: "Cosmos",
	explorer: "https://gaia.stake.id/",
	currency: {
		ticker: "MUON",
		symbol: "MUON",
	},
	fees: {
		type: "static",
		ticker: "MUON",
	},
	crypto: {
		networkId: "gaia-13007",
		slip44: 118,
		bech32: "cosmos",
		signingMethods: {
			mnemonic: true,
		},
		expirationType: "height",
	},
	networking: {
		hosts: ["https://stargate.cosmos.network"],
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
};

export default network;
