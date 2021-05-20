import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.NetworkManifest = {
	id: "ark.mainnet",
	type: "live",
	name: "Mainnet",
	coin: "ARK",
	explorer: "https://explorer.ark.io/",
	currency: {
		ticker: "ARK",
		symbol: "Ѧ",
	},
	fees: {
		type: "dynamic",
		ticker: "ARK",
	},
	crypto: {
		slip44: 111,
		signingMethods: {
			mnemonic: true,
			wif: true,
		},
		expirationType: "height",
	},
	networking: {
		hosts: ["https://wallets.ark.io"],
		hostsMultiSignature: ["https://musig1.ark.io"],
	},
	governance: {
		voting: {
			enabled: true,
			delegateCount: 51,
			maximumPerWallet: 1,
			maximumPerTransaction: 1,
		},
	},
	featureFlags: {
		Client: {
			transaction: true,
			transactions: true,
			wallet: true,
			wallets: true,
			delegate: true,
			delegates: true,
			votes: true,
			voters: true,
			configuration: true,
			fees: true,
			syncing: true,
			broadcast: true,
		},
		Fee: {
			all: true,
		},
		Identity: {
			address: {
				mnemonic: true,
				multiSignature: true,
				publicKey: true,
				privateKey: true,
				wif: true,
			},
			publicKey: {
				mnemonic: true,
				multiSignature: true,
				wif: true,
			},
			privateKey: {
				mnemonic: true,
				wif: true,
			},
			wif: {
				mnemonic: true,
			},
			keyPair: {
				mnemonic: true,
				privateKey: false,
				wif: true,
			},
		},
		Ledger: {
			getVersion: true,
			getPublicKey: true,
			signTransaction: true,
			signMessage: true,
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
		Peer: {
			search: true,
		},
		Transaction: {
			transfer: true,
			secondSignature: true,
			delegateRegistration: true,
			vote: true,
			multiSignature: true,
			ipfs: true,
			multiPayment: true,
			delegateResignation: true,
			htlcLock: false,
			htlcClaim: false,
			htlcRefund: false,
		},
		Miscellaneous: {
			dynamicFees: true,
			memo: true,
		},
		Derivation: {
			bip39: true,
			bip44: true,
		},
		Internal: {
			fastDelegateSync: true,
		},
	},
	transactionTypes: [
		"delegate-registration",
		"delegate-resignation",
		"htlc-claim",
		"htlc-lock",
		"htlc-refund",
		"ipfs",
		"multi-payment",
		"multi-signature",
		"second-signature",
		"transfer",
		"vote",
	],
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
	knownWallets: "https://raw.githubusercontent.com/ArkEcosystem/common/master/mainnet/known-wallets-extended.json",
};

export default network;
