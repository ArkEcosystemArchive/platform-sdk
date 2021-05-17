import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.NetworkManifest = {
	id: "luna.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Luna",
	explorer: "TODO",
	currency: {
		ticker: "LUNA",
		symbol: "LUNA",
	},
	fees: {
		type: "dynamic",
		ticker: "LUNA",
	},
	crypto: {
		slip44: 330,
		expirationType: "height",
	},
	networking: {
		hosts: ["https://luna-lcd.terra.dev/"],
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
			broadcast: true,
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
				privateKey: true,
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
