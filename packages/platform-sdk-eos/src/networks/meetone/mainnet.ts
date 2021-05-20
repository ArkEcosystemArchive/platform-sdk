import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.NetworkManifest = {
	id: "meetone.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "MEET.ONE",
	explorer: "https://meetone.bloks.io/",
	currency: {
		ticker: "MEETONE",
		symbol: "MEETONE",
	},
	fees: {
		type: "free",
		ticker: "MEETONE",
	},
	crypto: {
		networkId: "cfe6486a83bad4962f232d48003b1824ab5665c36778141034d75e57b956e422",
		slip44: 194,
		bech32: "MEETONE",
		signingMethods: {
			privateKey: true,
		},
		expirationType: "height",
	},
	networking: {
		hosts: ["https://fullnode.meet.one"],
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
        "bip38",
        "bip39",
        "bip44",
        "bip49",
        "bip84",
        "privateKey",
        "secret",
        "wif",
    ],
};

export default network;
