import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.NetworkManifest = {
	id: "eth.goerli",
	type: "test",
	name: "Goerli",
	coin: "Ethereum",
	explorer: "https://goerli.etherscan.io/",
	currency: {
		ticker: "ETH",
		symbol: "Ξ",
	},
	crypto: {
		networkId: "5",
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
};

export default network;
