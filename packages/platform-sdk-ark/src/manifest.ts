export const manifest = {
	name: "ARK",
	networks: {
		mainnet: {
			id: "mainnet",
			type: "live",
			name: "Mainnet",
			explorer: "https://explorer.ark.io/",
			currency: {
				ticker: "ARK",
				symbol: "Ѧ",
			},
			crypto: {
				slip44: 111,
			},
			hosts: ["https://wallets.ark.io"],
			hostsMultiSignature: [],
			voting: {
				enabled: true,
				singular: true,
			},
		},
		devnet: {
			id: "devnet",
			type: "test",
			name: "Devnet",
			explorer: "https://dexplorer.ark.io/",
			currency: {
				ticker: "DARK",
				symbol: "DѦ",
			},
			crypto: {
				slip44: 111,
			},
			hosts: ["https://dwallets.ark.io"],
			hostsMultiSignature: [],
			voting: {
				enabled: true,
				singular: true,
			},
		},
	},
	abilities: {
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
			htlcLock: true,
			htlcClaim: true,
			htlcRefund: true,
		},
	},
	signingMethods: {
		mnemonic: true,
		privateKey: false,
		wif: true,
	},
};
