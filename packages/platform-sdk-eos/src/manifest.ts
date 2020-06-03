export const manifest = {
	name: "EOS",
	networks: {
		"eos.mainnet": {
			id: "eos.mainnet",
			name: "EOS Mainnet",
			explorer: "https://eos.bloks.io/",
			currency: {
				ticker: "EOS",
				symbol: "EOS",
			},
			crypto: {
				networkId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
				slip44: 194,
				bech32: "EOS",
			},
			hosts: ["https://eos.greymass.com", "https://api.eosn.io", "https://mainnet.genereos.io"],
		},
		"eos.testnet": {
			id: "eos.testnet",
			name: "EOS Testnet",
			explorer: "https://eos-test.bloks.io/",
			currency: {
				ticker: "EOS",
				symbol: "EOS",
			},
			crypto: {
				networkId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473",
				slip44: 194,
				bech32: "EOS",
			},
			hosts: ["https://api.testnet.eos.io"],
		},
		"telos.mainnet": {
			id: "telos.mainnet",
			name: "TELOS Mainnet",
			explorer: "https://telos.bloks.io/",
			currency: {
				ticker: "TLOS",
				symbol: "TLOS",
			},
			crypto: {
				networkId: "4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11",
				slip44: 194,
				bech32: "TLOS",
			},
			hosts: [
				"https://apinode.telosgermany.io",
				"https://api.telosfoundation.io",
				"https://telos-mainnet.eosblocksmith.io",
				"https://telos.caleos.io",
			],
		},
		"telos.testnet": {
			id: "telos.testnet",
			name: "TELOS Testnet",
			explorer: "https://telos-test.bloks.io/",
			currency: {
				ticker: "TLOS",
				symbol: "TLOS",
			},
			crypto: {
				networkId: "e17615decaecd202a365f4c029f206eee98511979de8a5756317e2469f2289e3",
				slip44: 194,
				bech32: "TLOS",
			},
			hosts: [
				"https://telos-testnet.eosblocksmith.io",
				"https://api.eos.miami",
				"https://testnet.telos.caleos.io",
				"https://api-test.telosfoundation.io",
			],
		},
		"wax.mainnet": {
			id: "wax.mainnet",
			name: "WAX Mainnet",
			explorer: "https://wax.bloks.io/",
			currency: {
				ticker: "WAX",
				symbol: "WAX",
			},
			crypto: {
				networkId: "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
				slip44: 194,
				bech32: "WAX",
			},
			hosts: ["https://wax.eosphere.io"],
		},
		"worbli.mainnet": {
			id: "worbli.mainnet",
			name: "WORBLI Mainnet",
			explorer: "https://worbli.bloks.io/",
			currency: {
				ticker: "WBI",
				symbol: "WBI",
			},
			crypto: {
				networkId: "73647cde120091e0a4b85bced2f3cfdb3041e266cbbe95cee59b73235a1b3b6f",
				slip44: 194,
				bech32: "WBI",
			},
			hosts: ["https://api.worbli.io", "https://worbli-mainnet.eosblocksmith.io"],
		},
		"worbli.testnet": {
			id: "worbli.testnet",
			name: "WORBLI Testnet",
			explorer: "https://worbli-test.bloks.io/",
			currency: {
				ticker: "WBI",
				symbol: "WBI",
			},
			crypto: {
				networkId: "0d1ba39b44e70e9c36b74d60677ef3b686bd4347ade092b816886a6a35ddb6f7",
				slip44: 194,
				bech32: "WBI",
			},
			hosts: ["https://worbli-testnet.eosblocksmith.io", "https://worbli-testnet.eosphere.io"],
		},
		"meetone.mainnet": {
			id: "meetone.mainnet",
			name: "MEETONE Mainnet",
			explorer: "https://meetone.bloks.io/",
			currency: {
				ticker: "MEETONE",
				symbol: "MEETONE",
			},
			crypto: {
				networkId: "cfe6486a83bad4962f232d48003b1824ab5665c36778141034d75e57b956e422",
				slip44: 194,
				bech32: "MEETONE",
			},
			hosts: ["https://fullnode.meet.one"],
		},
		"bos.mainnet": {
			id: "bos.mainnet",
			name: "BOS Mainnet",
			explorer: "https://bos.bloks.io/",
			currency: {
				ticker: "BOS",
				symbol: "BOS",
			},
			crypto: {
				networkId: "d5a3d18fbb3c084e3b1f3fa98c21014b5f3db536cc15d08f9f6479517c6a3d86",
				slip44: 194,
				bech32: "BOS",
			},
			hosts: ["https://api.boscore.io"],
		},
	},
	abilities: {
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
				mnemonic: false,
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
				mnemonic: false,
				wif: false,
			},
			wif: {
				mnemonic: false,
			},
			keyPair: {
				mnemonic: false,
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
	signingMethods: {
		mnemonic: false,
		privateKey: true,
		wif: false,
	},
};
