export const manifest = {
	name: "ARK",
	ticker: "ARK",
	behaviours: {
		Client: {
			transaction: true,
			transactions: true,
			wallet: true,
			wallets: true,
			delegate: true,
			delegates: true,
			configuration: true,
			feesByNode: true,
			feesByType: true,
			syncing: true,
			broadcast: true,
		},
		Crypto: {
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
				multiSignature: true,
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
				privateKey: false,
				wif: true,
			},
		},
		Message: {
			sign: true,
			verify: true,
		},
	},
};
