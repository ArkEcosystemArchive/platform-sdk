import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.CoinNetwork = {
	id: "terra.testnet",
	type: "test",
	name: "Testnet",
	explorer: "TODO",
	currency: {
		ticker: "SOJU",
		symbol: "SOJU",
	},
	crypto: {
		slip44: 330,
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
			wallet: true,
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
};

export default network;
