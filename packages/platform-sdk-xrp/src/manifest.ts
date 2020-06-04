export const manifest = {
	name: "XRP",
	networks: {
		mainnet: {
			id: "mainnet",
			name: "Mainnet",
			explorer: "https://livenet.xrpl.org/",
			currency: {
				ticker: "XRP",
				symbol: "XRP",
			},
			crypto: {
				slip44: 144,
			},
			hosts: ["wss://s2.ripple.com/"],
		},
		testnet: {
			id: "testnet",
			name: "Testnet",
			explorer: "https://testnet.xrpl.org/",
			currency: {
				ticker: "XRP",
				symbol: "XRP",
			},
			crypto: {
				slip44: 144,
			},
			hosts: ["wss://s.altnet.rippletest.net/"],
		},
	},
	abilities: {
		Client: {
			transaction: true,
			transactions: true,
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
				multiSignature: false,
				publicKey: true,
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
				mnemonic: true,
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
		privateKey: true,
		wif: false,
	},
};
