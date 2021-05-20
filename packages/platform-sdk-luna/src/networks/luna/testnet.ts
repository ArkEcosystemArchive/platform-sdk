import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.NetworkManifest = {
	id: "luna.testnet",
	type: "test",
	name: "Testnet",
	coin: "Luna",
	explorer: "TODO",
	currency: {
		ticker: "SOJU",
		symbol: "SOJU",
	},
	fees: {
		type: "dynamic",
		ticker: "SOJU",
	},
	crypto: {
		slip44: 330,
		expirationType: "height",
	},
	networking: {
		hosts: ["https://soju-lcd.terra.dev"],
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
		Transaction: {
			transfer: true,
		},
		Derivation: {
			bip39: true,
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
