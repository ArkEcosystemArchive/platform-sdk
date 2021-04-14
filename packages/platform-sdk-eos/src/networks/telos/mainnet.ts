import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.CoinNetwork = {
	id: "telos.mainnet",
	type: "live",
	name: "TELOS Mainnet",
	explorer: "https://telos.bloks.io/",
	currency: {
		ticker: "TLOS",
		symbol: "TLOS",
	},
	crypto: {
		networkId: "4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11",
		slip44: 194,
		bech32: "TLOS",
		signingMethods: {
			privateKey: true,
		},
		expirationType: "height",
	},
	networking: {
		hosts: [
			"https://apinode.telosgermany.io",
			"https://api.telosfoundation.io",
			"https://telos-mainnet.eosblocksmith.io",
			"https://telos.caleos.io",
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
			wallet: true,
			broadcast: true,
		},
		Identity: {
			publicKey: {
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
