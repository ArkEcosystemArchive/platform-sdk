export const manifest = {
	name: "Bitcoin",
	networks: {
		livenet: {
			id: "livenet",
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
		},
		testnet: {
			id: "testnet",
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
		mnemonic: false,
		privateKey: false,
		wif: true,
	},
};
