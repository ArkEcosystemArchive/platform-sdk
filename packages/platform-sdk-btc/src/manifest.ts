export const manifest = {
	name: "BTC",
	networks: {
		"btc.livenet": {
			id: "btc.livenet",
			type: "live",
			name: "Livenet",
			explorer: "https://blockstream.info/",
			currency: {
				ticker: "BTC",
				symbol: "Ƀ",
			},
			crypto: {
				slip44: 0,
			},
			hosts: ["https://coins.com/api/btc"],
			hostsMultiSignature: [],
			voting: {
				enabled: false,
				maximum: 0,
				maximumPerTransaction: 0,
			},
		},
		"btc.testnet": {
			id: "btc.testnet",
			type: "test",
			name: "Testnet",
			explorer: "https://blockstream.info/testnet/",
			currency: {
				ticker: "BTC",
				symbol: "Ƀ",
			},
			crypto: {
				slip44: 0,
			},
			hosts: ["https://coins.com/api/btc"],
			hostsMultiSignature: [],
			voting: {
				enabled: false,
				maximum: 0,
				maximumPerTransaction: 0,
			},
		},
	},
	abilities: {
		Client: {
			transaction: true,
			transactions: false,
			wallet: true,
			wallets: false,
			delegate: false,
			delegates: false,
			votes: false,
			voters: false,
			configuration: false,
			fees: false,
			syncing: false,
			broadcast: true,
		},
		Fee: {
			all: false,
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
				multiSignature: false,
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
				privateKey: true,
				wif: true,
			},
		},
		Ledger: {
			getVersion: false,
			getPublicKey: false,
			signTransaction: false,
			signMessage: false,
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
			search: false,
		},
		Transaction: {
			transfer: true,
			secondSignature: false,
			delegateRegistration: false,
			vote: false,
			multiSignature: false,
			ipfs: false,
			multiPayment: false,
			delegateResignation: false,
			htlcLock: false,
			htlcClaim: false,
			htlcRefund: false,
		},
	},
	signingMethods: {
		mnemonic: true,
		privateKey: false,
		wif: true,
	},
};
