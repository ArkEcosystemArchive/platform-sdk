import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.NetworkManifest = {
	id: "xrp.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "XRP",
	explorer: "https://livenet.xrpl.org/",
	currency: {
		ticker: "XRP",
		symbol: "XRP",
	},
	fees: {
		type: "free",
		ticker: "xrp",
	},
	crypto: {
		slip44: 144,
		signingMethods: {
			mnemonic: true,
			privateKey: true,
		},
		expirationType: "height",
	},
	networking: {
		hosts: ["wss://s2.ripple.com/"],
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
			transaction: true,
			transactions: true,
			wallet: true,
			broadcast: true,
		},
		Identity: {
			address: {
				mnemonic: true,
				publicKey: true,
				secret: true,
			},
			publicKey: {
				mnemonic: true,
				secret: true,
			},
			privateKey: {
				mnemonic: true,
				secret: true,
			},
			wif: {
				mnemonic: true,
				secret: true,
			},
			keyPair: {
				mnemonic: true,
				secret: true,
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
