export const manifest = {
	name: "XMR",
	networks: {
		mainnet: {
			id: "mainnet",
			type: "live",
			name: "Mainnet",
			explorer: "https://moneroblocks.info/",
			currency: {
				ticker: "XMR",
				symbol: "XMR",
			},
			crypto: {
				slip44: 123,
			},
			hosts: [],
			hostsMultiSignature: [],
			voting: {
				enabled: false,
				maximum: 0,
				maximumPerTransaction: 0,
			},
		},
		testnet: {
			id: "testnet",
			type: "test",
			name: "Testnet",
			explorer: "https://dexplorer.ark.io/",
			currency: {
				ticker: "XMR",
				symbol: "XMR",
			},
			crypto: {
				slip44: 123,
			},
			hosts: [],
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
	signingMethods: {
		mnemonic: false,
		privateKey: false,
		wif: false,
	},
};
