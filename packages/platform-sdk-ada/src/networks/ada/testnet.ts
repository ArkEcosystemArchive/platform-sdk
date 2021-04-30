import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.CoinNetwork = {
	id: "ada.testnet",
	type: "test",
	name: "Testnet",
	coin: "Cardano",
	explorer: "https://shelleyexplorer.cardano.org/",
	currency: {
		ticker: "ADA",
		symbol: "ADA",
	},
	crypto: {
		networkId: "0",
		slip44: 1815,
		expirationType: "height",
		derivation: {
			extendedPublicKey: true,
		}
	},
	networking: {
		hosts: ["http://51.75.183.27:3100"],
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
			wallet: true,
		},
		Identity: {
			address: {
				mnemonic: true,
				publicKey: true,
				validate: true,
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
		Miscellaneous: {
			utxo: true,
		},
		Derivation: {
			bip39: true,
			bip44: true,
		},
	},
	meta: {
		minFeeA: 44,
		minFeeB: 155381,
		minUTxOValue: 1000000,
		poolDeposit: 500000000,
		keyDeposit: 2000000,
	},
	transactionTypes: ["transfer"],
};

export default network;
