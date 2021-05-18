import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.NetworkManifest = {
	id: "nano.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Nano",
	explorer: "https://nanocrawler.cc",
	currency: {
		ticker: "NANO",
		symbol: "NANO",
	},
	fees: {
		type: "free",
		ticker: "NANO",
	},
	crypto: {
		slip44: 165,
		expirationType: "height",
	},
	networking: {
		hosts: ["https://proxy.nanos.cc/proxy"],
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
		Link: {
			block: true,
			transaction: true,
			wallet: true,
		},
		Message: {
			sign: true,
			verify: true,
		},
		Derivation: {
			bip39: true,
			bip44: true,
		},
	},
	transactionTypes: [],
};

export default network;
