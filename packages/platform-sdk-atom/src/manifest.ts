export const manifest = {
	name: "ATOM",
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
			hosts: ["https://api.cosmos.network"],
			hostsMultiSignature: [],
			voting: {
				enabled: false,
				singular: false,
			},
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
			hosts: ["https://stargate.cosmos.network"],
			hostsMultiSignature: [],
			voting: {
				enabled: false,
				singular: false,
			},
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
			hostsMultiSignature: [],
			voting: {
				enabled: false,
				singular: false,
			},
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
			hostsMultiSignature: [],
			voting: {
				enabled: false,
				singular: false,
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
			syncing: true,
			broadcast: true,
		},
		Fee: {
			all: false,
		},
		Identity: {
			address: {
				mnemonic: true,
				multiSignature: false,
				publicKey: false,
				privateKey: false,
				wif: false,
			},
			publicKey: {
				mnemonic: true,
				multiSignature: false,
				wif: false,
			},
			privateKey: {
				mnemonic: true,
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
		privateKey: false,
		wif: false,
	},
};
