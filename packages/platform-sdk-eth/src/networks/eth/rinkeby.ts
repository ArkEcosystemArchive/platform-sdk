import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.NetworkManifest = {
	id: "eth.rinkeby",
	type: "test",
	name: "Rinkeby",
	coin: "Ethereum",
	explorer: "https://rinkeby.etherscan.io/",
	currency: {
		ticker: "ETH",
		symbol: "Ξ",
	},
	fees: {
		type: "gas",
		ticker: "ETH",
	},
	crypto: {
		networkId: "4",
		slip44: 60,
		signingMethods: {
			mnemonic: true,
			privateKey: true,
		},
		expirationType: "height",
	},
	networking: {
		hosts: ["https://coins.com/api/eth"],
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
				publicKey: true,
				privateKey: true,
			},
			keyPair: {
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
		},
		Derivation: {
			bip39: true,
			bip44: true,
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
