import "jest-extended";

import { ARK } from "../../../platform-sdk-ark/source";
import { NetworkRepository } from "./network-repository";

let subject: NetworkRepository;

beforeEach(() => (subject = new NetworkRepository(ARK.manifest.networks)));

test("#all", () => {
	expect(subject.all()).toMatchInlineSnapshot(`
		Object {
		  "ark.devnet": Object {
		    "coin": "ARK",
		    "constants": Object {
		      "slip44": 1,
		    },
		    "currency": Object {
		      "decimals": 8,
		      "symbol": "DѦ",
		      "ticker": "DARK",
		    },
		    "explorer": Object {
		      "block": "block/{0}",
		      "transaction": "transaction/{0}",
		      "wallet": "wallets/{0}",
		    },
		    "featureFlags": Object {
		      "Address": Array [
		        "mnemonic.bip39",
		        "multiSignature",
		        "privateKey",
		        "publicKey",
		        "validate",
		        "wif",
		      ],
		      "Client": Array [
		        "transaction",
		        "transactions",
		        "wallet",
		        "wallets",
		        "delegate",
		        "delegates",
		        "votes",
		        "voters",
		        "broadcast",
		      ],
		      "Fee": Array [
		        "all",
		      ],
		      "KeyPair": Array [
		        "mnemonic.bip39",
		        "privateKey",
		        "wif",
		      ],
		      "Ledger": Array [
		        "getVersion",
		        "getPublicKey",
		        "signTransaction",
		        "signMessage",
		      ],
		      "Message": Array [
		        "sign",
		        "verify",
		      ],
		      "PrivateKey": Array [
		        "mnemonic.bip39",
		        "wif",
		      ],
		      "PublicKey": Array [
		        "mnemonic.bip39",
		        "multiSignature",
		        "wif",
		      ],
		      "Transaction": Array [
		        "delegateRegistration",
		        "delegateResignation",
		        "estimateExpiration",
		        "htlcClaim",
		        "htlcLock",
		        "htlcRefund",
		        "ipfs.ledgerS",
		        "ipfs.ledgerX",
		        "ipfs.musig",
		        "ipfs",
		        "multiPayment.ledgerS",
		        "multiPayment.ledgerX",
		        "multiPayment.musig",
		        "multiPayment",
		        "multiSignature.ledgerX",
		        "multiSignature.musig",
		        "multiSignature",
		        "secondSignature",
		        "transfer.ledgerS",
		        "transfer.ledgerX",
		        "transfer.musig",
		        "transfer",
		        "vote.ledgerS",
		        "vote.ledgerX",
		        "vote.musig",
		        "vote",
		      ],
		      "WIF": Array [
		        "mnemonic.bip39",
		      ],
		    },
		    "governance": Object {
		      "delegateCount": 51,
		      "votesPerTransaction": 1,
		      "votesPerWallet": 1,
		    },
		    "hosts": Array [
		      Object {
		        "host": "https://dwallets.ark.io/api",
		        "type": "full",
		      },
		      Object {
		        "host": "https://dmusig1.ark.io",
		        "type": "musig",
		      },
		      Object {
		        "host": "https://dexplorer.ark.io",
		        "type": "explorer",
		      },
		    ],
		    "id": "ark.devnet",
		    "importMethods": Object {
		      "address": Object {
		        "default": false,
		        "permissions": Array [
		          "read",
		        ],
		      },
		      "bip39": Object {
		        "canBeEncrypted": true,
		        "default": true,
		        "permissions": Array [
		          "read",
		          "write",
		        ],
		      },
		      "publicKey": Object {
		        "default": false,
		        "permissions": Array [
		          "read",
		        ],
		      },
		      "secret": Object {
		        "canBeEncrypted": true,
		        "default": false,
		        "permissions": Array [
		          "read",
		          "write",
		        ],
		      },
		    },
		    "knownWallets": "https://raw.githubusercontent.com/ArkEcosystem/common/master/devnet/known-wallets-extended.json",
		    "meta": Object {
		      "fastDelegateSync": true,
		    },
		    "name": "Devnet",
		    "transactions": Object {
		      "expirationType": "height",
		      "fees": Object {
		        "ticker": "DARK",
		        "type": "dynamic",
		      },
		      "memo": true,
		      "multiPaymentRecipients": 128,
		      "types": Array [
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
		    },
		    "type": "test",
		  },
		  "ark.mainnet": Object {
		    "coin": "ARK",
		    "constants": Object {
		      "slip44": 111,
		    },
		    "currency": Object {
		      "decimals": 8,
		      "symbol": "Ѧ",
		      "ticker": "ARK",
		    },
		    "explorer": Object {
		      "block": "block/{0}",
		      "transaction": "transaction/{0}",
		      "wallet": "wallets/{0}",
		    },
		    "featureFlags": Object {
		      "Address": Array [
		        "mnemonic.bip39",
		        "multiSignature",
		        "privateKey",
		        "publicKey",
		        "validate",
		        "wif",
		      ],
		      "Client": Array [
		        "transaction",
		        "transactions",
		        "wallet",
		        "wallets",
		        "delegate",
		        "delegates",
		        "votes",
		        "voters",
		        "broadcast",
		      ],
		      "Fee": Array [
		        "all",
		      ],
		      "KeyPair": Array [
		        "mnemonic.bip39",
		        "privateKey",
		        "wif",
		      ],
		      "Ledger": Array [
		        "getVersion",
		        "getPublicKey",
		        "signTransaction",
		        "signMessage",
		      ],
		      "Message": Array [
		        "sign",
		        "verify",
		      ],
		      "PrivateKey": Array [
		        "mnemonic.bip39",
		        "wif",
		      ],
		      "PublicKey": Array [
		        "mnemonic.bip39",
		        "multiSignature",
		        "wif",
		      ],
		      "Transaction": Array [
		        "delegateRegistration",
		        "delegateResignation",
		        "estimateExpiration",
		        "htlcClaim",
		        "htlcLock",
		        "htlcRefund",
		        "ipfs.ledgerS",
		        "ipfs.ledgerX",
		        "ipfs.musig",
		        "ipfs",
		        "multiPayment.ledgerS",
		        "multiPayment.ledgerX",
		        "multiPayment.musig",
		        "multiPayment",
		        "multiSignature.ledgerX",
		        "multiSignature.musig",
		        "multiSignature",
		        "secondSignature",
		        "transfer.ledgerS",
		        "transfer.ledgerX",
		        "transfer.musig",
		        "transfer",
		        "vote.ledgerS",
		        "vote.ledgerX",
		        "vote.musig",
		        "vote",
		      ],
		      "WIF": Array [
		        "mnemonic.bip39",
		      ],
		    },
		    "governance": Object {
		      "delegateCount": 51,
		      "votesPerTransaction": 1,
		      "votesPerWallet": 1,
		    },
		    "hosts": Array [
		      Object {
		        "host": "https://wallets.ark.io/api",
		        "type": "full",
		      },
		      Object {
		        "host": "https://musig1.ark.io",
		        "type": "musig",
		      },
		      Object {
		        "host": "https://explorer.ark.io",
		        "type": "explorer",
		      },
		    ],
		    "id": "ark.mainnet",
		    "importMethods": Object {
		      "address": Object {
		        "default": false,
		        "permissions": Array [
		          "read",
		        ],
		      },
		      "bip39": Object {
		        "canBeEncrypted": true,
		        "default": true,
		        "permissions": Array [
		          "read",
		          "write",
		        ],
		      },
		      "publicKey": Object {
		        "default": false,
		        "permissions": Array [
		          "read",
		        ],
		      },
		      "secret": Object {
		        "canBeEncrypted": true,
		        "default": false,
		        "permissions": Array [
		          "read",
		          "write",
		        ],
		      },
		    },
		    "knownWallets": "https://raw.githubusercontent.com/ArkEcosystem/common/master/mainnet/known-wallets-extended.json",
		    "meta": Object {
		      "fastDelegateSync": true,
		    },
		    "name": "Mainnet",
		    "transactions": Object {
		      "expirationType": "height",
		      "fees": Object {
		        "ticker": "ARK",
		        "type": "dynamic",
		      },
		      "memo": true,
		      "multiPaymentRecipients": 64,
		      "types": Array [
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
		    },
		    "type": "live",
		  },
		  "bind.mainnet": Object {
		    "coin": "Compendia",
		    "constants": Object {
		      "slip44": 543,
		    },
		    "currency": Object {
		      "decimals": 8,
		      "symbol": "ß",
		      "ticker": "BIND",
		    },
		    "explorer": Object {
		      "block": "block/{0}",
		      "transaction": "transaction/{0}",
		      "wallet": "wallets/{0}",
		    },
		    "featureFlags": Object {
		      "Address": Array [
		        "mnemonic.bip39",
		        "multiSignature",
		        "privateKey",
		        "publicKey",
		        "validate",
		        "wif",
		      ],
		      "Client": Array [
		        "transaction",
		        "transactions",
		        "wallet",
		        "wallets",
		        "delegate",
		        "delegates",
		        "votes",
		        "voters",
		        "broadcast",
		      ],
		      "Fee": Array [
		        "all",
		      ],
		      "KeyPair": Array [
		        "mnemonic.bip39",
		        "privateKey",
		        "wif",
		      ],
		      "Ledger": Array [
		        "getVersion",
		        "getPublicKey",
		        "signTransaction",
		        "signMessage",
		      ],
		      "Message": Array [
		        "sign",
		        "verify",
		      ],
		      "PrivateKey": Array [
		        "mnemonic.bip39",
		        "wif",
		      ],
		      "PublicKey": Array [
		        "mnemonic.bip39",
		        "multiSignature",
		        "wif",
		      ],
		      "Transaction": Array [
		        "delegateRegistration",
		        "delegateResignation",
		        "estimateExpiration",
		        "htlcClaim",
		        "htlcLock",
		        "htlcRefund",
		        "ipfs.ledgerS",
		        "ipfs.ledgerX",
		        "ipfs.musig",
		        "ipfs",
		        "multiPayment.ledgerS",
		        "multiPayment.ledgerX",
		        "multiPayment.musig",
		        "multiPayment",
		        "multiSignature.ledgerX",
		        "multiSignature.musig",
		        "multiSignature",
		        "secondSignature",
		        "transfer.ledgerS",
		        "transfer.ledgerX",
		        "transfer.musig",
		        "transfer",
		        "vote.ledgerS",
		        "vote.ledgerX",
		        "vote.musig",
		        "vote",
		      ],
		      "WIF": Array [
		        "mnemonic.bip39",
		      ],
		    },
		    "governance": Object {
		      "delegateCount": 47,
		      "votesPerTransaction": 1,
		      "votesPerWallet": 1,
		    },
		    "hosts": Array [
		      Object {
		        "host": "https://apis.compendia.org/api",
		        "type": "full",
		      },
		      Object {
		        "host": "https://bindscan.io",
		        "type": "explorer",
		      },
		    ],
		    "id": "bind.mainnet",
		    "importMethods": Object {
		      "address": Object {
		        "default": false,
		        "permissions": Array [
		          "read",
		        ],
		      },
		      "bip39": Object {
		        "canBeEncrypted": true,
		        "default": true,
		        "permissions": Array [
		          "read",
		          "write",
		        ],
		      },
		      "publicKey": Object {
		        "default": false,
		        "permissions": Array [
		          "read",
		        ],
		      },
		      "secret": Object {
		        "canBeEncrypted": true,
		        "default": false,
		        "permissions": Array [
		          "read",
		          "write",
		        ],
		      },
		    },
		    "meta": Object {
		      "fastDelegateSync": true,
		    },
		    "name": "Mainnet",
		    "transactions": Object {
		      "expirationType": "height",
		      "fees": Object {
		        "ticker": "BIND",
		        "type": "dynamic",
		      },
		      "memo": true,
		      "multiPaymentRecipients": 128,
		      "types": Array [
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
		    },
		    "type": "live",
		  },
		  "bind.testnet": Object {
		    "coin": "Compendia",
		    "constants": Object {
		      "slip44": 1,
		    },
		    "currency": Object {
		      "decimals": 8,
		      "symbol": "Tß",
		      "ticker": "TBIND",
		    },
		    "explorer": Object {
		      "block": "block/{0}",
		      "transaction": "transaction/{0}",
		      "wallet": "wallets/{0}",
		    },
		    "featureFlags": Object {
		      "Address": Array [
		        "mnemonic.bip39",
		        "multiSignature",
		        "privateKey",
		        "publicKey",
		        "validate",
		        "wif",
		      ],
		      "Client": Array [
		        "transaction",
		        "transactions",
		        "wallet",
		        "wallets",
		        "delegate",
		        "delegates",
		        "votes",
		        "voters",
		        "broadcast",
		      ],
		      "Fee": Array [
		        "all",
		      ],
		      "KeyPair": Array [
		        "mnemonic.bip39",
		        "privateKey",
		        "wif",
		      ],
		      "Ledger": Array [
		        "getVersion",
		        "getPublicKey",
		        "signTransaction",
		        "signMessage",
		      ],
		      "Message": Array [
		        "sign",
		        "verify",
		      ],
		      "PrivateKey": Array [
		        "mnemonic.bip39",
		        "wif",
		      ],
		      "PublicKey": Array [
		        "mnemonic.bip39",
		        "multiSignature",
		        "wif",
		      ],
		      "Transaction": Array [
		        "delegateRegistration",
		        "delegateResignation",
		        "estimateExpiration",
		        "htlcClaim",
		        "htlcLock",
		        "htlcRefund",
		        "ipfs.ledgerS",
		        "ipfs.ledgerX",
		        "ipfs.musig",
		        "ipfs",
		        "multiPayment.ledgerS",
		        "multiPayment.ledgerX",
		        "multiPayment.musig",
		        "multiPayment",
		        "multiSignature.ledgerX",
		        "multiSignature.musig",
		        "multiSignature",
		        "secondSignature",
		        "transfer.ledgerS",
		        "transfer.ledgerX",
		        "transfer.musig",
		        "transfer",
		        "vote.ledgerS",
		        "vote.ledgerX",
		        "vote.musig",
		        "vote",
		      ],
		      "WIF": Array [
		        "mnemonic.bip39",
		      ],
		    },
		    "governance": Object {
		      "delegateCount": 47,
		      "votesPerTransaction": 1,
		      "votesPerWallet": 1,
		    },
		    "hosts": Array [
		      Object {
		        "host": "https://apis-testnet.compendia.org/api",
		        "type": "full",
		      },
		      Object {
		        "host": "https://testnet.bindscan.io",
		        "type": "explorer",
		      },
		    ],
		    "id": "bind.testnet",
		    "importMethods": Object {
		      "address": Object {
		        "default": false,
		        "permissions": Array [
		          "read",
		        ],
		      },
		      "bip39": Object {
		        "canBeEncrypted": true,
		        "default": true,
		        "permissions": Array [
		          "read",
		          "write",
		        ],
		      },
		      "publicKey": Object {
		        "default": false,
		        "permissions": Array [
		          "read",
		        ],
		      },
		      "secret": Object {
		        "canBeEncrypted": true,
		        "default": false,
		        "permissions": Array [
		          "read",
		          "write",
		        ],
		      },
		    },
		    "meta": Object {
		      "fastDelegateSync": true,
		    },
		    "name": "Testnet",
		    "transactions": Object {
		      "expirationType": "height",
		      "fees": Object {
		        "ticker": "TBIND",
		        "type": "dynamic",
		      },
		      "memo": true,
		      "multiPaymentRecipients": 64,
		      "types": Array [
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
		    },
		    "type": "test",
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
