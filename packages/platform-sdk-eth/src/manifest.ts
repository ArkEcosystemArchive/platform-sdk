export const manifest = {
	name: "Ethereum",
	networks: {
		mainnet: {
			explorer: "https://etherscan.io/",
			currency: {
				ticker: "ETH",
				symbol: "Ξ",
			},
			crypto: {
				networkId: 1,
				slip44: 60,
			},
			hosts: [],
		},
		ropsten: {
			explorer: "https://ropsten.etherscan.io/",
			currency: {
				ticker: "ETH",
				symbol: "Ξ",
			},
			crypto: {
				networkId: 3,
				slip44: 60,
			},
			hosts: [],
		},
		rinkeby: {
			rinkeby: "ETH",
			explorer: "https://rinkeby.etherscan.io/",
			crypto: {
				networkId: 4,
				slip44: 60,
			},
			hosts: [],
		},
		goerli: {
			explorer: "https://goerli.etherscan.io/",
			currency: {
				ticker: "ETH",
				symbol: "Ξ",
			},
			crypto: {
				networkId: 5,
				slip44: 60,
			},
			hosts: [],
		},
		kovan: {
			explorer: "https://kovan.etherscan.io/",
			currency: {
				ticker: "ETH",
				symbol: "Ξ",
			},
			crypto: {
				networkId: 42,
				slip44: 60,
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
			syncing: false,
			broadcast: false,
		},
		Fee: {
			all: false,
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
				privateKey: true,
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
