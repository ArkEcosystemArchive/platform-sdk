import { Coins } from "@arkecosystem/platform-sdk";

import { transactions, importMethods, featureFlags } from "../shared";

const network: Coins.NetworkManifest = {
	id: "ksm.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "Kusama",
	explorer: "https://polkascan.io/kusama",
	currency: {
		ticker: "KSM",
		symbol: "KSM",
	},
	fees: {
		type: "weight",
		ticker: "DOT",
	},
	constants: {
		networkId: "2",
		expirationType: "height",
	},
	networking: {
		hosts: ["https://kusama-rpc.polkadot.io/"],
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
			transfer: { default: true },
		},
		Derivation: {
			bip39: true,
			bip44: true,
		},
	},
	transactions,
	importMethods,
	featureFlags,
};

export default network;
