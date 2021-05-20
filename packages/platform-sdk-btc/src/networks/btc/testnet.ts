import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.NetworkManifest = {
	id: "btc.testnet",
	type: "test",
	name: "Testnet",
	coin: "Bitcoin",
	explorer: "https://blockstream.info/testnet/",
	currency: {
		ticker: "BTC",
		symbol: "Ƀ",
	},
	fees: {
		type: "dynamic",
		ticker: "BTC",
	},
	crypto: {
		slip44: 0,
		signingMethods: {
			mnemonic: true,
			wif: true,
		},
		expirationType: "height",
	},
	networking: {
		hosts: ["https://coins.com/api/btc"],
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
			broadcast: true,
		},
		Identity: {
			address: {
				mnemonic: true,
				multiSignature: true,
				publicKey: true,
				privateKey: true,
				wif: true,
			},
			publicKey: {
				mnemonic: true,
				wif: true,
			},
			privateKey: {
				mnemonic: true,
				wif: true,
			},
			wif: {
				mnemonic: true,
			},
			keyPair: {
				mnemonic: true,
				privateKey: true,
				wif: true,
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
		Miscellaneous: {
			utxo: true,
		},
		Derivation: {
			bip39: true,
			bip44: true,
			bip49: true,
			bip84: true,
		},
	},
	transactionTypes: ["transfer"],
    importMethods: [
        "bip38",
        "bip39",
        "bip44",
        "bip49",
        "bip84",
        "privateKey",
        "secret",
        "wif",
    ],
};

export default network;
