import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.NetworkManifest = {
	id: "eos.testnet",
	type: "test",
	name: "Testnet",
	coin: "EOS",
	explorer: "https://eos-test.bloks.io/",
	currency: {
		ticker: "EOS",
		symbol: "EOS",
	},
	fees: {
		type: "free",
		ticker: "EOS",
	},
	crypto: {
		networkId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473",
		slip44: 194,
		bech32: "EOS",
		signingMethods: {
			privateKey: true,
		},
		expirationType: "height",
	},
	networking: {
		hosts: ["https://api.testnet.eos.io"],
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
