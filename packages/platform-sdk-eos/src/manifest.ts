export const manifest = {
	name: "EOS",
	networks: {
		live: {
			ticker: "EOS",
			explorer: "https://eosauthority.com?network=eos",
		},
		test: {
			ticker: "EOS",
			explorer: "https://eosauthority.com?network=eosiotest",
		},
	},
	crypto: {
		slip44: 194,
	},
	behaviours: {
		Client: {
			transaction: false,
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
				passphrase: false,
				multiSignature: false,
				publicKey: false,
				privateKey: false,
				wif: false,
			},
			publicKey: {
				passphrase: true,
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
