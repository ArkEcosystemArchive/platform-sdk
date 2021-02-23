import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.CoinNetwork = {
	id: "egld.mainnet",
	type: "live",
	name: "Mainnet",
	explorer: "https://explorer.elrond.com/",
	currency: {
		ticker: "EGLD",
		symbol: "EGLD",
	},
	crypto: {
		slip44: 508,
	},
	networking: {
		hosts: ["https://gateway.elrond.com"],
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
	},
	transactionTypes: ["transfer"],
};

export default network;
