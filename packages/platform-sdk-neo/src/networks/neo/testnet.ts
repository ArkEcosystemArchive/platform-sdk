import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.CoinNetwork = {
	id: "neo.testnet",
	type: "test",
	name: "Testnet",
	coin: "NEO",
	explorer: "https://neoscan-testnet.io/",
	currency: {
		ticker: "NEO",
		symbol: "NEO",
	},
	crypto: {
		slip44: 888,
		signingMethods: {
			mnemonic: true,
		},
		expirationType: "height",
	},
	networking: {
		hosts: [
			"https://test1.cityofzion.io:443",
			"https://test2.cityofzion.io:443",
			"https://test3.cityofzion.io:443",
			"http://seed1.ngd.network:20332",
			"http://seed2.ngd.network:20332",
			"http://seed3.ngd.network:20332",
			"http://seed4.ngd.network:20332",
			"http://seed5.ngd.network:20332",
			"http://seed6.ngd.network:20332",
			"http://seed7.ngd.network:20332",
			"http://seed8.ngd.network:20332",
			"http://seed9.ngd.network:20332",
			"http://seed10.ngd.network:20332",
		],
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
			broadcast: true,
		},
		Identity: {
			address: {
				mnemonic: true,
				publicKey: true,
				privateKey: true,
				wif: true,
			},
			publicKey: {
				mnemonic: true,
				wif: true,
			},
			privateKey: {
				mnemonic: true,
				wif: true,
			},
			wif: {
				mnemonic: true,
			},
			keyPair: {
				mnemonic: true,
				privateKey: true,
				wif: true,
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
