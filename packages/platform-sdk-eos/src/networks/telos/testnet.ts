import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.NetworkManifest = {
	id: "telos.testnet",
	type: "test",
	name: "Testnet",
	coin: "Telos",
	explorer: "https://telos-test.bloks.io/",
	currency: {
		ticker: "TLOS",
		symbol: "TLOS",
	},
	fees: {
		type: "free",
		ticker: "TLOS",
	},
	crypto: {
		networkId: "e17615decaecd202a365f4c029f206eee98511979de8a5756317e2469f2289e3",
		slip44: 194,
		bech32: "TLOS",
		signingMethods: {
			privateKey: true,
		},
		expirationType: "height",
	},
	networking: {
		hosts: [
			"https://telos-testnet.eosblocksmith.io",
			"https://api.eos.miami",
			"https://testnet.telos.caleos.io",
			"https://api-test.telosfoundation.io",
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
    importMethods: [
        "bip39",
        "bip44",
        "bip49",
        "bip84",
        "bip38",
        "privateKey",
        "secret",
        "wif",
    ],
};

export default network;
