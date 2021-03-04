import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.CoinNetwork = {
	id: "ada.mainnet",
	type: "live",
	name: "Mainnet",
	explorer: "https://explorer.cardano.org/",
	currency: {
		ticker: "ADA",
		symbol: "ADA",
	},
	crypto: {
		networkId: "1",
		slip44: 1815,
	},
	networking: {
		hosts: [],
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
		Miscellaneous: {
			utxo: true,
		},
		Derivation: {
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
