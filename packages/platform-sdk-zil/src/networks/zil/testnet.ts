import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.NetworkManifest = {
	id: "zil.testnet",
	type: "test",
	name: "Testnet",
	coin: "Zilliqa",
	hosts: [
		{
			type: "full",
			host: { url: "https://dev-api.zilliqa.com" },
		},
		{
			type: "explorer",
			host: { url: "https://viewblock.io/zilliqa", query: { network: "testnet" } },
		},
	],
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
