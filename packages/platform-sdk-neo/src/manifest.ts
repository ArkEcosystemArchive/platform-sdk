export const manifest = {
	name: "NEO",
	slip44: 888,
	networks: {
		live: {
			ticker: "NEO",
			explorer: "https://neotracker.io/",
		},
		test: {
			ticker: "NEO",
			explorer: "https://neoscan-testnet.io/",
		},
	},
	behaviours: {
		Client: {
			transaction: false,
			transactions: true,
			wallet: false,
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
				passphrase: true,
				multiSignature: false,
				publicKey: true,
				privateKey: true,
				wif: true,
			},
			publicKey: {
				passphrase: true,
				multiSignature: false,
				wif: true,
			},
			privateKey: {
				passphrase: true,
				wif: true,
			},
			wif: {
				passphrase: true,
			},
			keyPair: {
				passphrase: true,
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
			searchWithPlugin: false,
			searchWithoutEstimates: false,
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
};
