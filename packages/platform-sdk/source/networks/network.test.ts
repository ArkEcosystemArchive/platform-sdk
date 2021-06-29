import "jest-extended";

import { ARK } from "../../../platform-sdk-ark/source";
import { FeatureFlag } from "../enums";
import { Network } from "./network";

let subject: Network;

beforeEach(() => (subject = new Network(ARK.manifest, ARK.manifest.networks["ark.devnet"])));

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
	expect(subject.explorer()).toBe("https://dexplorer.ark.io");
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
		}
	`);
});

it("should have an string representation", () => {
	expect(subject.toJson()).toMatchInlineSnapshot(
		`"{\\"id\\":\\"ark.devnet\\",\\"type\\":\\"test\\",\\"name\\":\\"Devnet\\",\\"coin\\":\\"ARK\\",\\"currency\\":{\\"ticker\\":\\"DARK\\",\\"symbol\\":\\"DѦ\\",\\"decimals\\":8},\\"constants\\":{\\"slip44\\":1},\\"hosts\\":[{\\"type\\":\\"full\\",\\"host\\":\\"https://dwallets.ark.io/api\\"},{\\"type\\":\\"musig\\",\\"host\\":\\"https://dmusig1.ark.io\\"},{\\"type\\":\\"explorer\\",\\"host\\":\\"https://dexplorer.ark.io\\"}],\\"governance\\":{\\"delegateCount\\":51,\\"votesPerWallet\\":1,\\"votesPerTransaction\\":1},\\"transactions\\":{\\"expirationType\\":\\"height\\",\\"types\\":[\\"delegate-registration\\",\\"delegate-resignation\\",\\"htlc-claim\\",\\"htlc-lock\\",\\"htlc-refund\\",\\"ipfs\\",\\"multi-payment\\",\\"multi-signature\\",\\"second-signature\\",\\"transfer\\",\\"vote\\"],\\"fees\\":{\\"type\\":\\"dynamic\\",\\"ticker\\":\\"DARK\\"},\\"memo\\":true,\\"multiPaymentRecipients\\":128},\\"importMethods\\":{\\"address\\":{\\"default\\":false,\\"permissions\\":[\\"read\\"]},\\"bip39\\":{\\"default\\":true,\\"permissions\\":[\\"read\\",\\"write\\"],\\"canBeEncrypted\\":true},\\"publicKey\\":{\\"default\\":false,\\"permissions\\":[\\"read\\"]}},\\"featureFlags\\":{\\"Client\\":[\\"transaction\\",\\"transactions\\",\\"wallet\\",\\"wallets\\",\\"delegate\\",\\"delegates\\",\\"votes\\",\\"voters\\",\\"broadcast\\"],\\"Fee\\":[\\"all\\"],\\"Address\\":[\\"mnemonic.bip39\\",\\"multiSignature\\",\\"privateKey\\",\\"publicKey\\",\\"validate\\",\\"wif\\"],\\"KeyPair\\":[\\"mnemonic.bip39\\",\\"privateKey\\",\\"wif\\"],\\"PrivateKey\\":[\\"mnemonic.bip39\\",\\"wif\\"],\\"PublicKey\\":[\\"mnemonic.bip39\\",\\"multiSignature\\",\\"wif\\"],\\"WIF\\":[\\"mnemonic.bip39\\"],\\"Ledger\\":[\\"getVersion\\",\\"getPublicKey\\",\\"signTransaction\\",\\"signMessage\\"],\\"Message\\":[\\"sign\\",\\"verify\\"],\\"Transaction\\":[\\"delegateRegistration\\",\\"delegateResignation\\",\\"estimateExpiration\\",\\"htlcClaim\\",\\"htlcLock\\",\\"htlcRefund\\",\\"ipfs.ledgerS\\",\\"ipfs.ledgerX\\",\\"ipfs.musig\\",\\"ipfs\\",\\"multiPayment.ledgerS\\",\\"multiPayment.ledgerX\\",\\"multiPayment.musig\\",\\"multiPayment\\",\\"multiSignature.ledgerX\\",\\"multiSignature.musig\\",\\"multiSignature\\",\\"secondSignature\\",\\"transfer.ledgerS\\",\\"transfer.ledgerX\\",\\"transfer.musig\\",\\"transfer\\",\\"vote.ledgerS\\",\\"vote.ledgerX\\",\\"vote.musig\\",\\"vote\\"]},\\"explorer\\":{\\"block\\":\\"block/{0}\\",\\"transaction\\":\\"transaction/{0}\\",\\"wallet\\":\\"wallets/{0}\\"},\\"knownWallets\\":\\"https://raw.githubusercontent.com/ArkEcosystem/common/master/devnet/known-wallets-extended.json\\",\\"meta\\":{\\"fastDelegateSync\\":true}}"`,
	);
});

it("#allows", () => {
	expect(subject.allows(FeatureFlag.ClientBroadcast)).toBeTrue();
	expect(subject.allows(FeatureFlag.AddressMnemonicBip84)).toBeFalse();

	expect(subject.allows(FeatureFlag.TransactionDelegateRegistration)).toBeTrue();
	expect(subject.allows(FeatureFlag.TransactionDelegateResignation)).toBeTrue();
	expect(subject.allows(FeatureFlag.TransactionHtlcClaim)).toBeTrue();
	expect(subject.allows(FeatureFlag.TransactionHtlcLock)).toBeTrue();
	expect(subject.allows(FeatureFlag.TransactionHtlcRefund)).toBeTrue();
	expect(subject.allows(FeatureFlag.TransactionIpfs)).toBeTrue();
	expect(subject.allows(FeatureFlag.TransactionMultiPayment)).toBeTrue();
	expect(subject.allows(FeatureFlag.TransactionMultiSignature)).toBeTrue();
	expect(subject.allows(FeatureFlag.TransactionSecondSignature)).toBeTrue();
	expect(subject.allows(FeatureFlag.TransactionTransfer)).toBeTrue();
	expect(subject.allows(FeatureFlag.TransactionVote)).toBeTrue();

	expect(subject.allows("randomKey")).toBeFalse();
});

it("#denies", () => {
	expect(subject.denies(FeatureFlag.AddressMnemonicBip84)).toBeTrue();
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

it("#importMethods", () => {
	expect(subject.importMethods()).toBeObject();
});

it("#meta", () => {
	expect(subject.meta()).toBeObject();
});

it("#feeType", () => {
	expect(subject.feeType()).toBe("dynamic");
});

it("#usesMemo", () => {
	expect(subject.usesMemo()).toBeBoolean();
});

it("#usesUTXO", () => {
	expect(subject.usesUTXO()).toBeBoolean();
});

it("#tokens", () => {
	expect(subject.tokens()).toBeArray();
});

it("#multiPaymentRecipients", () => {
	expect(subject.multiPaymentRecipients()).toBeNumber();
});

it("#wordCount", () => {
	expect(subject.wordCount()).toBe(24);
});
