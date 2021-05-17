import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.NetworkManifest = {
	id: "neo.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "NEO",
	explorer: "https://neotracker.io/",
	currency: {
		ticker: "NEO",
		symbol: "NEO",
	},
	fees: {
		type: "zero",
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
			"https://seed1.switcheo.network:10331",
			"https://seed3.switcheo.network:10331",
			"http://seed1.ngd.network:10332",
			"http://seed2.ngd.network:10332",
			"http://seed3.ngd.network:10332",
			"http://seed4.ngd.network:10332",
			"http://seed5.ngd.network:10332",
			"http://seed6.ngd.network:10332",
			"http://seed7.ngd.network:10332",
			"http://seed8.ngd.network:10332",
			"http://seed9.ngd.network:10332",
			"https://m2.neo.nash.io",
			"https://m3.neo.nash.io",
			"https://m4.neo.nash.io",
			"https://m5.neo.nash.io",
			"https://mainnet1.neo2.coz.io:443",
			"https://mainnet2.neo2.coz.io:443",
			"https://mainnet3.neo2.coz.io:443",
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
