export const manifest = {
	name: "Ripple",
	ticker: "XRP",
	behaviours: {
		Client: {
			transaction: false,
			transactions: false,
			wallet: false,
			wallets: false,
			delegate: false,
			delegates: false,
			configuration: false,
			fees: false,
			syncing: false,
			broadcast: false,
		},
		Crypto: {
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
				publicKey: false,
				privateKey: false,
				wif: false,
			},
		},
		Message: {
			sign: false,
			verify: false,
		},
	},
};
