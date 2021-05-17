import "jest-extended";

import { ARK } from "../../../platform-sdk-ark/src";
import { FeatureFlag } from "./enums";
import { Network } from "./network";

let subject: Network;

beforeEach(() => {
	subject = new Network(ARK.manifest, ARK.manifest.networks["ark.devnet"]);
});

it("should have an coin", () => {
	expect(subject.coin()).toBe("ARK");
});

it("should have an coin name", () => {
	expect(subject.coinName()).toBe("ARK");
});

it("should have an id", () => {
	expect(subject.id()).toBe("ark.devnet");
});

it("should have a name", () => {
	expect(subject.name()).toBe("Devnet");
});

it("should have an explorer", () => {
	expect(subject.explorer()).toBe("https://dexplorer.ark.io/");
});

it("should have a ticker", () => {
	expect(subject.ticker()).toBe("DARK");
});

it("should have a symbol", () => {
	expect(subject.symbol()).toBe("DѦ");
});

it("should determine if the network is a live environment", () => {
	expect(subject.isLive()).toBeFalse();
});

it("should determine if the network is a test environment", () => {
	expect(subject.isTest()).toBeTrue();
});

it("should get the expiration type", () => {
	expect(subject.expirationType()).toBe("height");
});

it("should allows voting", () => {
	expect(subject.allowsVoting()).toBeTrue();

	subject = new Network(ARK.manifest, {
		// @ts-ignore
		"ark.devnet": {
			...ARK.manifest.networks["ark.devnet"],
			governance: {},
		},
	});

	expect(subject.allowsVoting()).toBeFalse();
});

it("should get the delegate count", () => {
	expect(subject.delegateCount()).toBe(51);

	subject = new Network(ARK.manifest, {
		// @ts-ignore
		"ark.devnet": {
			...ARK.manifest.networks["ark.devnet"],
			governance: {},
		},
	});

	expect(subject.delegateCount()).toBe(0);
});

it("should get maximum votes per wallet", () => {
	expect(subject.maximumVotesPerWallet()).toBe(1);

	subject = new Network(ARK.manifest, {
		// @ts-ignore
		"ark.devnet": {
			...ARK.manifest.networks["ark.devnet"],
			governance: {},
		},
	});

	expect(subject.maximumVotesPerWallet()).toBe(0);
});

it("should get maximum votes per transaction", () => {
	expect(subject.maximumVotesPerTransaction()).toBe(1);

	subject = new Network(ARK.manifest, {
		// @ts-ignore
		"ark.devnet": {
			...ARK.manifest.networks["ark.devnet"],
			governance: {},
		},
	});

	expect(subject.maximumVotesPerTransaction()).toBe(0);
});

it("should determine if the network uses extended public keys", () => {
	expect(subject.usesExtendedPublicKey()).toBeFalse();
});

it("should have an object representation", () => {
	expect(subject.toObject()).toMatchInlineSnapshot(`
		Object {
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
		  "fees": Object {
		    "ticker": "DARK",
		    "type": "dynamic",
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
		}
	`);
});

it("should have an string representation", () => {
	expect(subject.toJson()).toMatchInlineSnapshot(
		`"{\\"id\\":\\"ark.devnet\\",\\"type\\":\\"test\\",\\"name\\":\\"Devnet\\",\\"coin\\":\\"ARK\\",\\"explorer\\":\\"https://dexplorer.ark.io/\\",\\"currency\\":{\\"ticker\\":\\"DARK\\",\\"symbol\\":\\"DѦ\\"},\\"fees\\":{\\"type\\":\\"dynamic\\",\\"ticker\\":\\"DARK\\"},\\"crypto\\":{\\"slip44\\":1,\\"signingMethods\\":{\\"mnemonic\\":true,\\"wif\\":true},\\"expirationType\\":\\"height\\"},\\"networking\\":{\\"hosts\\":[\\"https://dwallets.ark.io\\"],\\"hostsMultiSignature\\":[\\"https://dmusig1.ark.io\\"]},\\"governance\\":{\\"voting\\":{\\"enabled\\":true,\\"delegateCount\\":51,\\"maximumPerWallet\\":1,\\"maximumPerTransaction\\":1}},\\"featureFlags\\":{\\"Client\\":{\\"transaction\\":true,\\"transactions\\":true,\\"wallet\\":true,\\"wallets\\":true,\\"delegate\\":true,\\"delegates\\":true,\\"votes\\":true,\\"voters\\":true,\\"configuration\\":true,\\"fees\\":true,\\"syncing\\":true,\\"broadcast\\":true},\\"Fee\\":{\\"all\\":true},\\"Identity\\":{\\"address\\":{\\"mnemonic\\":true,\\"multiSignature\\":true,\\"publicKey\\":true,\\"privateKey\\":true,\\"wif\\":true},\\"publicKey\\":{\\"mnemonic\\":true,\\"multiSignature\\":true,\\"wif\\":true},\\"privateKey\\":{\\"mnemonic\\":true,\\"wif\\":true},\\"wif\\":{\\"mnemonic\\":true},\\"keyPair\\":{\\"mnemonic\\":true,\\"privateKey\\":false,\\"wif\\":true}},\\"Ledger\\":{\\"getVersion\\":true,\\"getPublicKey\\":true,\\"signTransaction\\":true,\\"signMessage\\":true},\\"Link\\":{\\"block\\":true,\\"transaction\\":true,\\"wallet\\":true},\\"Message\\":{\\"sign\\":true,\\"verify\\":true},\\"Peer\\":{\\"search\\":true},\\"Transaction\\":{\\"transfer\\":true,\\"secondSignature\\":true,\\"delegateRegistration\\":true,\\"vote\\":true,\\"multiSignature\\":true,\\"ipfs\\":true,\\"multiPayment\\":true,\\"delegateResignation\\":true,\\"htlcLock\\":true,\\"htlcClaim\\":true,\\"htlcRefund\\":true},\\"Miscellaneous\\":{\\"dynamicFees\\":true,\\"memo\\":true},\\"Derivation\\":{\\"bip39\\":true,\\"bip44\\":true},\\"Internal\\":{\\"fastDelegateSync\\":true}},\\"transactionTypes\\":[\\"delegate-registration\\",\\"delegate-resignation\\",\\"htlc-claim\\",\\"htlc-lock\\",\\"htlc-refund\\",\\"ipfs\\",\\"multi-payment\\",\\"multi-signature\\",\\"second-signature\\",\\"transfer\\",\\"vote\\"],\\"knownWallets\\":\\"https://raw.githubusercontent.com/ArkEcosystem/common/master/devnet/known-wallets-extended.json\\"}"`,
	);
});

it("#allows", () => {
	expect(subject.allows(FeatureFlag.ClientBroadcast)).toBeTrue();
	expect(subject.allows(FeatureFlag.IdentityKeyPairPrivateKey)).toBeFalse();
});

it("#denies", () => {
	expect(subject.denies(FeatureFlag.IdentityKeyPairPrivateKey)).toBeTrue();
	expect(subject.denies(FeatureFlag.ClientBroadcast)).toBeFalse();
});

it("#chargesStaticFees", () => {
	expect(subject.chargesStaticFees()).toBeBoolean();
});

it("#chargesDynamicFees", () => {
	expect(subject.chargesDynamicFees()).toBeBoolean();
});

it("#chargesGasFees", () => {
	expect(subject.chargesGasFees()).toBeBoolean();
});

it("#chargesWeightFees", () => {
	expect(subject.chargesWeightFees()).toBeBoolean();
});

it("#chargesZeroFees", () => {
	expect(subject.chargesZeroFees()).toBeBoolean();
});
