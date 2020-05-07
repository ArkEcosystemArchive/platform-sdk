export const manifest = {
	name: "Bitcoin",
	ticker: "BTC",
	networks: {
		live: {
			ticker: "BTC",
			explorer: "https://blockstream.info/",
		},
		test: {
			ticker: "BTC",
			explorer: "https://blockstream.info/testnet/",
		},
	},
	behaviours: {
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
				passphrase: true,
				multiSignature: true,
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
				publicKey: false,
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
