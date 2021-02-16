import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.CoinNetwork = {
	id: "dot.mainnet",
	type: "live",
	name: "Mainnet",
	explorer: "https://polkascan.io/polkadot",
	currency: {
		ticker: "DOT",
		symbol: "DOT",
	},
	crypto: {
		networkId: "0",
	},
	networking: {
		hosts: ["https://rpc.polkadot.io/"],
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
		Identity: {
			address: {
				mnemonic: true,
				multiSignature: true,
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
		Ledger: {
			getVersion: true,
			getPublicKey: true,
			signTransaction: true,
		},
	},
	transactionTypes: ["transfer"],
};

export default network;
