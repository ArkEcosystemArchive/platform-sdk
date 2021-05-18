import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.NetworkManifest = {
	id: "egld.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Elrond",
	explorer: "https://explorer.elrond.com",
	currency: {
		ticker: "EGLD",
		symbol: "EGLD",
	},
	fees: {
		type: "gas",
		ticker: "EGLD",
	},
	crypto: {
		slip44: 508,
		expirationType: "height",
	},
	networking: {
		hosts: ["https://gateway.elrond.com"],
	},
	featureFlags: {
		Client: {
			transaction: true,
			transactions: true,
			wallet: true,
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
