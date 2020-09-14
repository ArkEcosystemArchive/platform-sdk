export const manifest = {
	name: "ETH",
	networks: {
		mainnet: {
			id: "mainnet",
			type: "live",
			name: "Mainnet",
			explorer: "https://etherscan.io/",
			currency: {
				ticker: "ETH",
				symbol: "Ξ",
			},
			crypto: {
				networkId: "1",
				slip44: 60,
			},
			hosts: ["https://platform.ark.io/api/eth"],
			hostsMultiSignature: [],
			voting: {
				enabled: false,
				maximum: 0,
				maximumPerTransaction: 0,
			},
		},
		// kovan: {
		// 	id: "kovan",
		// 	type: "test",
		// 	name: "Kovan",
		// 	explorer: "https://kovan.etherscan.io/",
		// 	currency: {
		// 		ticker: "ETH",
		// 		symbol: "Ξ",
		// 	},
		// 	crypto: {
		// 		networkId: "2",
		// 		slip44: 60,
		// 	},
		// 	hosts: ["https://coins.com/api/eth"],
		// 	hostsMultiSignature: [],
		// 	voting: {
		// 		enabled: false,
		// 		maximum: 0,
		// 		maximumPerTransaction: 0,
		// 	},
		// },
		// ropsten: {
		// 	id: "ropsten",
		// 	type: "test",
		// 	name: "Ropsten",
		// 	explorer: "https://ropsten.etherscan.io/",
		// 	currency: {
		// 		ticker: "ETH",
		// 		symbol: "Ξ",
		// 	},
		// 	crypto: {
		// 		networkId: "3",
		// 		slip44: 60,
		// 	},
		// 	hosts: ["https://coins.com/api/eth"],
		// 	hostsMultiSignature: [],
		// 	voting: {
		// 		enabled: false,
		// 		maximum: 0,
		// 		maximumPerTransaction: 0,
		// 	},
		// },
		// rinkeby: {
		// 	id: "rinkeby",
		// 	type: "test",
		// 	name: "Rinkeby",
		// 	explorer: "https://rinkeby.etherscan.io/",
		// 	currency: {
		// 		ticker: "ETH",
		// 		symbol: "Ξ",
		// 	},
		// 	crypto: {
		// 		networkId: "4",
		// 		slip44: 60,
		// 	},
		// 	hosts: ["https://coins.com/api/eth"],
		// 	hostsMultiSignature: [],
		// 	voting: {
		// 		enabled: false,
		// 		maximum: 0,
		// 		maximumPerTransaction: 0,
		// 	},
		// },
		// goerli: {
		// 	id: "goerli",
		// 	type: "test",
		// 	name: "Goerli",
		// 	explorer: "https://goerli.etherscan.io/",
		// 	currency: {
		// 		ticker: "ETH",
		// 		symbol: "Ξ",
		// 	},
		// 	crypto: {
		// 		networkId: "5",
		// 		slip44: 60,
		// 	},
		// 	hosts: ["https://coins.com/api/eth"],
		// 	hostsMultiSignature: [],
		// 	voting: {
		// 		enabled: false,
		// 		maximum: 0,
		// 		maximumPerTransaction: 0,
		// 	},
		// },
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
				mnemonic: false,
				multiSignature: false,
				publicKey: true,
				privateKey: true,
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
				mnemonic: false,
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
