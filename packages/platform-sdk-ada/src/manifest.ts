export const manifest = {
	name: "Cardano",
	networks: {
		mainnet: {
			id: "mainnet",
			name: "Mainnet",
			explorer: "https://explorer.cardano.org/",
			currency: {
				ticker: "ADA",
				symbol: "ADA",
			},
			crypto: {
				slip44: 1815,
			},
			hosts: [],
		},
		testnet: {
			id: "testnet",
			name: "Testnet",
			explorer: "https://shelleyexplorer.cardano.org/",
			currency: {
				ticker: "ADA",
				symbol: "ADA",
			},
			crypto: {
				slip44: 1815,
			},
			hosts: [],
		},
	},
	abilities: {
		Client: {
			transaction: false,
			transactions: false,
			wallet: false,
			wallets: false,
			delegate: false,
			delegates: false,
			votes: false,
			voters: false,
			configuration: false,
			fees: false,
			syncing: false,
			broadcast: false,
		},
		Fee: {
			all: false,
		},
		Identity: {
			address: {
				passphrase: false,
				multiSignature: false,
				publicKey: false,
				privateKey: false,
				wif: false,
			},
			publicKey: {
				passphrase: false,
				multiSignature: false,
				wif: false,
			},
			privateKey: {
				passphrase: false,
				wif: false,
			},
			wif: {
				passphrase: false,
			},
			keyPair: {
				passphrase: false,
				privateKey: false,
				wif: false,
			},
		},
		Ledger: {
			getVersion: false,
			getPublicKey: false,
			signTransaction: false,
			signMessage: false,
		},
		Link: {
			block: false,
			transaction: false,
			wallet: false,
		},
		Message: {
			sign: false,
			verify: false,
		},
		Peer: {
			search: false,
		},
		Transaction: {
			transfer: false,
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
};
