import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.CoinNetwork = {
	id: "lsk.testnet",
	type: "test",
	name: "Testnet",
	explorer: "https://testnet-explorer.lisk.io/",
	currency: {
		ticker: "LSK",
		symbol: "LSK",
	},
	crypto: {
		networkId: "da3ed6a45429278bac2666961289ca17ad86595d33b31037615d4b8e8f158bba",
		slip44: 134,
		signingMethods: {
			mnemonic: true,
		},
		expirationType: "height",
	},
	networking: {
		hosts: ["https://testnet.lisk.io"],
	},
	governance: {
		voting: {
			enabled: true,
			delegateCount: 101,
			maximumPerWallet: 101,
			maximumPerTransaction: 33,
		},
	},
	featureFlags: {
		Client: {
			transaction: true,
			transactions: true,
			wallet: true,
			wallets: true,
			delegate: true,
			delegates: true,
			broadcast: true,
		},
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
		Transaction: {
			transfer: true,
			secondSignature: true,
			delegateRegistration: true,
			vote: true,
			multiSignature: true,
		},
		Derivation: {
			bip39: true,
			bip44: true,
		},
	},
	transactionTypes: ["delegate-registration", "multi-signature", "second-signature", "transfer", "vote"],
};

export default network;
