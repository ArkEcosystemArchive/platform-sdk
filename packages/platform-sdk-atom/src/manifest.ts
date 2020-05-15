export const manifest = {
	name: "Cosmos",
	networks: {
		cosmos: {
			mainnet: {
				ticker: "ATOM",
				explorer: "https://stake.id/",
				crypto: {
					chainId: "cosmoshub-3",
					slip44: 118,
					bech32Prefix: "cosmos",
				},
			},
			testnet: {
				ticker: "MUON",
				explorer: "https://gaia.stake.id/",
				crypto: {
					chainId: "gaia-13007",
					slip44: 118,
					bech32Prefix: "cosmos",
				},
			},
		},
		terra: {
			mainnet: {
				ticker: "LUNA",
				explorer: "https://terra.stake.id/",
				crypto: {
					chainId: "columbus-3",
					slip44: 330,
					bech32Prefix: "terra",
				},
			},
			testnet: {
				ticker: "LUNA",
				explorer: "https://soju.stake.id/",
				crypto: {
					chainId: "soju-0014",
					slip44: 330,
					bech32Prefix: "terra",
				},
			},
		},
	},
	behaviours: {
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
			syncing: true,
			broadcast: true,
		},
		Fee: {
			all: false,
		},
		Identity: {
			address: {
				passphrase: true,
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
				passphrase: true,
				wif: false,
			},
			wif: {
				passphrase: false,
			},
			keyPair: {
				passphrase: true,
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
