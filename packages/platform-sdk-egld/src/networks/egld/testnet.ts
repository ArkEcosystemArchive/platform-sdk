import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.CoinNetwork = {
	id: "egld.testnet",
	type: "live",
	name: "Mainnet",
	explorer: "https://testnet-explorer.elrond.com/",
	currency: {
		ticker: "EGLD",
		symbol: "EGLD",
	},
	crypto: {
		slip44: 508,
	},
	networking: {
		hosts: ["https://testnet-gateway.elrond.com"],
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
	},
	transactionTypes: ["transfer"],
};

export default network;
