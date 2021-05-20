import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.NetworkManifest = {
	id: "avax.testnet",
	type: "live",
	name: "Testnet",
	coin: "Avalanche",
	explorer: "https://explorer.avax-test.network/",
	currency: {
		ticker: "FUJI",
		symbol: "FUJI",
	},
	fees: {
		type: "static",
		ticker: "FUJI",
	},
	crypto: {
		networkId: "5",
		blockchainId: "2JVSBoinj9C2J33VntvzYtVJNZdN2NKiwwKjcumHUWEb5DbBrm",
		assetId: "U8iRqJoiJm8xZHAacmvYyZVwqQx6uDNtQeP3CQ6fcgQk3JqnK",
		slip44: 9000,
		signingMethods: {
			privateKey: true,
		},
		expirationType: "height",
	},
	networking: {
		hosts: ["https://api.avax-test.network:443"],
		hostsArchival: ["https://api.avax-test.network:8080"],
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
			transactions: true,
			wallet: true,
			broadcast: true,
		},
		Identity: {
			address: {
				mnemonic: true,
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
		Message: {
			sign: true,
			verify: true,
		},
		Transaction: {
			transfer: true,
			vote: true,
		},
		Miscellaneous: {
			utxo: true,
		},
		Derivation: {
			bip39: true,
			bip44: true,
		},
	},
	transactionTypes: ["transfer", "vote"],
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
