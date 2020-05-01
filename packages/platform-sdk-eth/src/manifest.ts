export const manifest = {
	name: "Ethereum",
	ticker: "ETH",
	behaviours: {
		Client: {
			transaction: true,
			transactions: false,
			wallet: true,
			wallets: false,
			delegate: false,
			delegates: false,
			configuration: false,
			cryptoConfiguration: false,
			feesByNode: false,
			feesByType: false,
			syncing: false,
			broadcast: true,
		},
		Crypto: {
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
		Identity: {
			address: {
				passphrase: false,
				multiSignature: false,
				publicKey: true,
				privateKey: true,
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
				privateKey: true,
				wif: false,
			},
		},
		Message: {
			sign: false,
			verify: false,
		},
	},
};
