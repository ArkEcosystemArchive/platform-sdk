import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.CoinNetwork = {
	"id": "bos.mainnet",
	"type": "live",
	"name": "BOS Mainnet",
	"explorer": "https://bos.bloks.io/",
	"currency": {
		"ticker": "BOS",
		"symbol": "BOS"
	},
	"crypto": {
		"networkId": "d5a3d18fbb3c084e3b1f3fa98c21014b5f3db536cc15d08f9f6479517c6a3d86",
		"slip44": 194,
		"bech32": "BOS",
		"signingMethods": {
			"mnemonic": false,
			"privateKey": true,
			"wif": false
		}
	},
	"networking": {
		"hosts": ["https://api.boscore.io"],
		"hostsMultiSignature": []
	},
	"governance": {
		"voting": {
			"enabled": false,
			"delegateCount": 0,
			"maximumPerWallet": 0,
			"maximumPerTransaction": 0
		}
	},
	"featureFlags": {
		"Client": {
			"wallet": true,
			"broadcast": true
		},
		"Identity": {
			"publicKey": {
				"mnemonic": true
			}
		},
		"Link": {
			"block": true,
			"transaction": true,
			"wallet": true
		},
		"Message": {
			"sign": true,
			"verify": true
		}
	}
}

export default network;
