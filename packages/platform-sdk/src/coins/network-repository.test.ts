import "jest-extended";

import { ARK } from "../../../platform-sdk-ark/src";
import { NetworkRepository } from "./network-repository";

let subject: NetworkRepository;

beforeEach(() => (subject = new NetworkRepository(ARK.manifest.networks)));

test("#all", () => {
	expect(subject.all()).toMatchInlineSnapshot(`
		Object {
		  "ark.devnet": Object {
		    "coin": "ARK",
		    "crypto": Object {
		      "expirationType": "height",
		      "signingMethods": Object {
		        "mnemonic": true,
		        "wif": true,
		      },
		      "slip44": 1,
		    },
		    "currency": Object {
		      "symbol": "DѦ",
		      "ticker": "DARK",
		    },
		    "explorer": "https://dexplorer.ark.io/",
		    "featureFlags": Object {
		      "Client": Object {
		        "broadcast": true,
		        "configuration": true,
		        "delegate": true,
		        "delegates": true,
		        "fees": true,
		        "syncing": true,
		        "transaction": true,
		        "transactions": true,
		        "voters": true,
		        "votes": true,
		        "wallet": true,
		        "wallets": true,
		      },
		      "Derivation": Object {
		        "bip39": true,
		        "bip44": true,
		      },
		      "Fee": Object {
		        "all": true,
		      },
		      "Identity": Object {
		        "address": Object {
		          "mnemonic": true,
		          "multiSignature": true,
		          "privateKey": true,
		          "publicKey": true,
		          "wif": true,
		        },
		        "keyPair": Object {
		          "mnemonic": true,
		          "privateKey": false,
		          "wif": true,
		        },
		        "privateKey": Object {
		          "mnemonic": true,
		          "wif": true,
		        },
		        "publicKey": Object {
		          "mnemonic": true,
		          "multiSignature": true,
		          "wif": true,
		        },
		        "wif": Object {
		          "mnemonic": true,
		        },
		      },
		      "Internal": Object {
		        "fastDelegateSync": true,
		      },
		      "Ledger": Object {
		        "getPublicKey": true,
		        "getVersion": true,
		        "signMessage": true,
		        "signTransaction": true,
		      },
		      "Link": Object {
		        "block": true,
		        "transaction": true,
		        "wallet": true,
		      },
		      "Message": Object {
		        "sign": true,
		        "verify": true,
		      },
		      "Miscellaneous": Object {
		        "customPeer": true,
		        "dynamicFees": true,
		        "memo": true,
		      },
		      "Peer": Object {
		        "search": true,
		      },
		      "Transaction": Object {
		        "delegateRegistration": true,
		        "delegateResignation": true,
		        "htlcClaim": true,
		        "htlcLock": true,
		        "htlcRefund": true,
		        "ipfs": true,
		        "multiPayment": true,
		        "multiSignature": true,
		        "secondSignature": true,
		        "transfer": true,
		        "vote": true,
		      },
		    },
		    "governance": Object {
		      "voting": Object {
		        "delegateCount": 51,
		        "enabled": true,
		        "maximumPerTransaction": 1,
		        "maximumPerWallet": 1,
		      },
		    },
		    "id": "ark.devnet",
		    "knownWallets": "https://raw.githubusercontent.com/ArkEcosystem/common/master/devnet/known-wallets-extended.json",
		    "name": "Devnet",
		    "networking": Object {
		      "hosts": Array [
		        "https://dwallets.ark.io",
		      ],
		      "hostsMultiSignature": Array [
		        "https://dmusig1.ark.io",
		      ],
		    },
		    "transactionTypes": Array [
		      "delegate-registration",
		      "delegate-resignation",
		      "htlc-claim",
		      "htlc-lock",
		      "htlc-refund",
		      "ipfs",
		      "multi-payment",
		      "multi-signature",
		      "second-signature",
		      "transfer",
		      "vote",
		    ],
		    "type": "test",
		  },
		  "ark.mainnet": Object {
		    "coin": "ARK",
		    "crypto": Object {
		      "expirationType": "height",
		      "signingMethods": Object {
		        "mnemonic": true,
		        "wif": true,
		      },
		      "slip44": 111,
		    },
		    "currency": Object {
		      "symbol": "Ѧ",
		      "ticker": "ARK",
		    },
		    "explorer": "https://explorer.ark.io/",
		    "featureFlags": Object {
		      "Client": Object {
		        "broadcast": true,
		        "configuration": true,
		        "delegate": true,
		        "delegates": true,
		        "fees": true,
		        "syncing": true,
		        "transaction": true,
		        "transactions": true,
		        "voters": true,
		        "votes": true,
		        "wallet": true,
		        "wallets": true,
		      },
		      "Derivation": Object {
		        "bip39": true,
		        "bip44": true,
		      },
		      "Fee": Object {
		        "all": true,
		      },
		      "Identity": Object {
		        "address": Object {
		          "mnemonic": true,
		          "multiSignature": true,
		          "privateKey": true,
		          "publicKey": true,
		          "wif": true,
		        },
		        "keyPair": Object {
		          "mnemonic": true,
		          "privateKey": false,
		          "wif": true,
		        },
		        "privateKey": Object {
		          "mnemonic": true,
		          "wif": true,
		        },
		        "publicKey": Object {
		          "mnemonic": true,
		          "multiSignature": true,
		          "wif": true,
		        },
		        "wif": Object {
		          "mnemonic": true,
		        },
		      },
		      "Internal": Object {
		        "fastDelegateSync": true,
		      },
		      "Ledger": Object {
		        "getPublicKey": true,
		        "getVersion": true,
		        "signMessage": true,
		        "signTransaction": true,
		      },
		      "Link": Object {
		        "block": true,
		        "transaction": true,
		        "wallet": true,
		      },
		      "Message": Object {
		        "sign": true,
		        "verify": true,
		      },
		      "Miscellaneous": Object {
		        "customPeer": true,
		        "dynamicFees": true,
		        "memo": true,
		      },
		      "Peer": Object {
		        "search": true,
		      },
		      "Transaction": Object {
		        "delegateRegistration": true,
		        "delegateResignation": true,
		        "htlcClaim": false,
		        "htlcLock": false,
		        "htlcRefund": false,
		        "ipfs": true,
		        "multiPayment": true,
		        "multiSignature": true,
		        "secondSignature": true,
		        "transfer": true,
		        "vote": true,
		      },
		    },
		    "governance": Object {
		      "voting": Object {
		        "delegateCount": 51,
		        "enabled": true,
		        "maximumPerTransaction": 1,
		        "maximumPerWallet": 1,
		      },
		    },
		    "id": "ark.mainnet",
		    "knownWallets": "https://raw.githubusercontent.com/ArkEcosystem/common/master/mainnet/known-wallets-extended.json",
		    "name": "Mainnet",
		    "networking": Object {
		      "hosts": Array [
		        "https://wallets.ark.io",
		      ],
		      "hostsMultiSignature": Array [
		        "https://musig1.ark.io",
		      ],
		    },
		    "transactionTypes": Array [
		      "delegate-registration",
		      "delegate-resignation",
		      "htlc-claim",
		      "htlc-lock",
		      "htlc-refund",
		      "ipfs",
		      "multi-payment",
		      "multi-signature",
		      "second-signature",
		      "transfer",
		      "vote",
		    ],
		    "type": "live",
		  },
		  "compendia.mainnet": Object {
		    "coin": "Compendia",
		    "crypto": Object {
		      "expirationType": "height",
		      "signingMethods": Object {
		        "mnemonic": true,
		        "wif": true,
		      },
		      "slip44": 543,
		    },
		    "currency": Object {
		      "symbol": "ß",
		      "ticker": "BIND",
		    },
		    "explorer": "https://bindscan.io/",
		    "featureFlags": Object {
		      "Client": Object {
		        "broadcast": true,
		        "configuration": true,
		        "delegate": true,
		        "delegates": true,
		        "fees": true,
		        "syncing": true,
		        "transaction": true,
		        "transactions": true,
		        "voters": true,
		        "votes": true,
		        "wallet": true,
		        "wallets": true,
		      },
		      "Derivation": Object {
		        "bip39": true,
		        "bip44": true,
		      },
		      "Fee": Object {
		        "all": true,
		      },
		      "Identity": Object {
		        "address": Object {
		          "mnemonic": true,
		          "multiSignature": true,
		          "privateKey": true,
		          "publicKey": true,
		          "wif": true,
		        },
		        "keyPair": Object {
		          "mnemonic": true,
		          "privateKey": false,
		          "wif": true,
		        },
		        "privateKey": Object {
		          "mnemonic": true,
		          "wif": true,
		        },
		        "publicKey": Object {
		          "mnemonic": true,
		          "multiSignature": true,
		          "wif": true,
		        },
		        "wif": Object {
		          "mnemonic": true,
		        },
		      },
		      "Internal": Object {
		        "fastDelegateSync": true,
		      },
		      "Ledger": Object {
		        "getPublicKey": true,
		        "getVersion": true,
		        "signMessage": true,
		        "signTransaction": true,
		      },
		      "Link": Object {
		        "block": true,
		        "transaction": true,
		        "wallet": true,
		      },
		      "Message": Object {
		        "sign": true,
		        "verify": true,
		      },
		      "Miscellaneous": Object {
		        "customPeer": true,
		        "dynamicFees": true,
		        "memo": true,
		      },
		      "Peer": Object {
		        "search": true,
		      },
		      "Transaction": Object {
		        "delegateRegistration": true,
		        "delegateResignation": true,
		        "htlcClaim": false,
		        "htlcLock": false,
		        "htlcRefund": false,
		        "ipfs": true,
		        "multiPayment": true,
		        "multiSignature": true,
		        "secondSignature": true,
		        "transfer": true,
		        "vote": true,
		      },
		    },
		    "governance": Object {
		      "voting": Object {
		        "delegateCount": 47,
		        "enabled": true,
		        "maximumPerTransaction": 1,
		        "maximumPerWallet": 1,
		      },
		    },
		    "id": "compendia.mainnet",
		    "name": "Mainnet",
		    "networking": Object {
		      "hosts": Array [
		        "https://apis.compendia.org",
		      ],
		    },
		    "transactionTypes": Array [
		      "delegate-registration",
		      "delegate-resignation",
		      "htlc-claim",
		      "htlc-lock",
		      "htlc-refund",
		      "ipfs",
		      "multi-payment",
		      "multi-signature",
		      "second-signature",
		      "transfer",
		      "vote",
		    ],
		    "type": "live",
		  },
		}
	`);
});

test("#get | #push | #forget", () => {
	expect(subject.get("ark.devnet")).toBeObject();

	subject.push("ark.devnet", ARK.manifest.networks["ark.devnet"]);

	expect(subject.get("ark.devnet")).toBeObject();

	subject.forget("ark.devnet");

	expect(() => subject.get("ark.devnet")).toThrow("The [ark.devnet] network is not supported.");
});
