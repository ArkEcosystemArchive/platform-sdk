export const manifest = {
	name: "TRX",
	networks: {
		mainnet: {
			id: "mainnet",
			name: "Mainnet",
			explorer: "https://tronscan.org/#/",
			currency: {
				ticker: "TRX",
				symbol: "TRX",
			},
			crypto: {
				slip44: 195,
			},
			hosts: ["https://api.trongrid.io"],
			hostsMultiSignature: [],
			voting: {
				enabled: false,
				singular: false,
			},
		},
		testnet: {
			id: "testnet",
			name: "Testnet",
			explorer: "https://shasta.tronscan.org/#/",
			currency: {
				ticker: "TRX",
				symbol: "TRX",
			},
			crypto: {
				slip44: 195,
			},
			hosts: ["https://api.shasta.trongrid.io"],
			hostsMultiSignature: [],
			voting: {
				enabled: false,
				singular: false,
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
			broadcast: false,
		},
		Fee: {
			all: false,
		},
		Identity: {
			address: {
				mnemonic: false,
				multiSignature: false,
				publicKey: false,
				privateKey: false,
				wif: false,
			},
			publicKey: {
				mnemonic: false,
				multiSignature: false,
				wif: false,
			},
			privateKey: {
				mnemonic: false,
				wif: false,
			},
			wif: {
				mnemonic: false,
			},
			keyPair: {
				mnemonic: false,
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
			block: true,
			transaction: true,
			wallet: true,
		},
		Message: {
			sign: false,
			verify: false,
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
		privateKey: true,
		wif: false,
	},
};
