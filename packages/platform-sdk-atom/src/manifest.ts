export const manifest = {
	name: "Cosmos",
	networks: {
		"cosmos.mainnet": {
			id: "cosmos.mainnet",
			name: "Cosmos Mainnet",
			explorer: "https://stake.id/",
			currency: {
				ticker: "ATOM",
				symbol: "ATOM",
			},
			crypto: {
				networkId: "cosmoshub-3",
				slip44: 118,
				bech32: "cosmos",
			},
			hosts: [],
		},
		"cosmos.testnet": {
			id: "cosmos.testnet",
			name: "Cosmos Testnet",
			explorer: "https://gaia.stake.id/",
			currency: {
				ticker: "MUON",
				symbol: "MUON",
			},
			crypto: {
				networkId: "gaia-13007",
				slip44: 118,
				bech32: "cosmos",
			},
			hosts: [],
		},
		"terra.mainnet": {
			id: "terra.mainnet",
			name: "Terra Mainnet",
			explorer: "https://terra.stake.id/",
			currency: {
				ticker: "LUNA",
				symbol: "LUNA",
			},
			crypto: {
				networkId: "columbus-3",
				slip44: 330,
				bech32: "terra",
			},
			hosts: [],
		},
		"terra.testnet": {
			id: "terra.testnet",
			name: "Terra Testnet",
			explorer: "https://soju.stake.id/",
			currency: {
				ticker: "LUNA",
				symbol: "LUNA",
			},
			crypto: {
				networkId: "soju-0014",
				slip44: 330,
				bech32: "terra",
			},
			hosts: [],
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
