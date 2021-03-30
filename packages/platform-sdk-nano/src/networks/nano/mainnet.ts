import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.CoinNetwork = {
	id: "nano.mainnet",
	type: "live",
	name: "Mainnet",
	explorer: "TODO",
	currency: {
		ticker: "LUNA",
		symbol: "LUNA",
	},
	crypto: {
		slip44: 330,
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
	meta: {
		minFeeA: 44,
		minFeeB: 155381,
		minUTxOValue: 1000000,
		poolDeposit: 500000000,
		keyDeposit: 2000000,
	},
	transactionTypes: ["transfer"],
};

export default network;
