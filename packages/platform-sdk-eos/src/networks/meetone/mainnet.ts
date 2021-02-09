import { Coins } from "@arkecosystem/platform-sdk";

const network: Coins.CoinNetwork = {
	"id": "meetone.mainnet",
	"type": "live",
	"name": "MEETONE Mainnet",
	"explorer": "https://meetone.bloks.io/",
	"currency": {
		"ticker": "MEETONE",
		"symbol": "MEETONE"
	},
	"crypto": {
		"networkId": "cfe6486a83bad4962f232d48003b1824ab5665c36778141034d75e57b956e422",
		"slip44": 194,
		"bech32": "MEETONE",
		"signingMethods": {
			"mnemonic": false,
			"privateKey": true,
			"wif": false
		}
	},
	"networking": {
		"hosts": ["https://fullnode.meet.one"],
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
