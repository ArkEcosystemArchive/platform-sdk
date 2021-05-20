import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.NetworkManifest = {
	id: "trx.testnet",
	type: "test",
	name: "Testnet",
	coin: "TRON",
	explorer: "https://shasta.tronscan.org/#",
	currency: {
		ticker: "TRX",
		symbol: "TRX",
	},
	fees: {
		type: "free",
		ticker: "TRX",
	},
	crypto: {
		slip44: 195,
		signingMethods: {
			mnemonic: true,
			privateKey: true,
		},
		expirationType: "height",
	},
	networking: {
		hosts: ["https://api.shasta.trongrid.io"],
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
			wallet: true,
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
    importMethods: [
        "bip39",
        "bip44",
        "bip49",
        "bip84",
        "bip38",
        "privateKey",
        "secret",
        "wif",
    ],
};

export default network;
