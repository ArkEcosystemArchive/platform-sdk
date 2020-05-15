export const manifest = {
	name: "EOS",
	networks: {
		eos: {
			mainnet: {
				ticker: "EOS",
				explorer: "https://eos.bloks.io/",
				crypto: {
					chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
					slip44: 194,
					bech32: "EOS",
				},
			},
			testnet: {
				ticker: "EOS",
				explorer: "https://eos-test.bloks.io/",
				crypto: {
					chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473",
					slip44: 194,
					bech32: "EOS",
				},
			},
		},
		telos: {
			mainnet: {
				ticker: "TLOS",
				explorer: "https://telos.bloks.io/",
				crypto: {
					chainId: "4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11",
					slip44: 194,
					bech32: "TLOS",
				},
			},
			testnet: {
				ticker: "TLOS",
				explorer: "https://telos-test.bloks.io/",
				crypto: {
					chainId: "e17615decaecd202a365f4c029f206eee98511979de8a5756317e2469f2289e3",
					slip44: 194,
					bech32: "TLOS",
				},
			},
		},
		wax: {
			mainnet: {
				ticker: "WAX",
				explorer: "https://wax.bloks.io/",
				crypto: {
					chainId: "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
					slip44: 194,
					bech32: "WAX",
				},
			},
		},
		worbli: {
			mainnet: {
				ticker: "WBI",
				explorer: "https://worbli.bloks.io/",
				crypto: {
					chainId: "73647cde120091e0a4b85bced2f3cfdb3041e266cbbe95cee59b73235a1b3b6f",
					slip44: 194,
					bech32: "WAX",
				},
			},
			testnet: {
				ticker: "WBI",
				explorer: "https://worbli-test.bloks.io/",
				crypto: {
					chainId: "0d1ba39b44e70e9c36b74d60677ef3b686bd4347ade092b816886a6a35ddb6f7",
					slip44: 194,
					bech32: "WAX",
				},
			},
		},
		meetone: {
			mainnet: {
				ticker: "MEETONE",
				explorer: "https://meetone.bloks.io/",
				crypto: {
					chainId: "cfe6486a83bad4962f232d48003b1824ab5665c36778141034d75e57b956e422",
					slip44: 194,
					bech32: "MEETONE",
				},
			},
		},
		bos: {
			mainnet: {
				ticker: "WBI",
				explorer: "https://bos.bloks.io/",
				crypto: {
					chainId: "d5a3d18fbb3c084e3b1f3fa98c21014b5f3db536cc15d08f9f6479517c6a3d86",
					slip44: 194,
					bech32: "WAX",
				},
			},
		},
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
