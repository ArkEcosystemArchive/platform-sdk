import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.NetworkManifest = {
	id: "neo.testnet",
	type: "test",
	name: "Testnet",
	coin: "NEO",
	explorer: "https://neoscan-testnet.io/",
	currency: {
		ticker: "NEO",
		symbol: "NEO",
	},
	fees: {
		type: "free",
		ticker: "GAS",
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
			"https://testnet1.neo2.coz.io:443",
			"https://testnet2.neo2.coz.io:443",
			"https://testnet3.neo2.coz.io:443",
			"http://seed1.ngd.network:20332",
			"http://seed2.ngd.network:20332",
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
