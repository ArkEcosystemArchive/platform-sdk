import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.NetworkManifest = {
	id: "zil.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Zilliqa",
	explorer: "https://viewblock.io/zilliqa",
	currency: {
		ticker: "ZIL",
		symbol: "ZIL",
	},
	fees: {
		type: "gas",
		ticker: "ZIL",
	},
	crypto: {
		slip44: 313,
		expirationType: "height",
	},
	networking: {
		hosts: ["https://api.zilliqa.com"],
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
