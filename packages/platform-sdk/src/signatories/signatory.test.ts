import "jest-extended";

import { MnemonicSignatory } from "./mnemonic";
import { MultiMnemonicSignatory } from "./multi-mnemonic";
import { MultiSignatureSignatory } from "./multi-signature";
import { PrivateKeySignatory } from "./private-key";
import { PrivateMultiSignatureSignatory } from "./private-multi-signature";
import { SecondaryMnemonicSignatory } from "./secondary-mnemonic";
import { SecondaryWIFSignatory } from "./secondary-wif";
import { SenderPublicKeySignatory } from "./sender-public-key";
import { Signatory } from "./signatory";
import { SignatureSignatory } from "./signature";
import { WIFSignatory } from "./wif";

describe("MnemonicSignatory", () => {
	test("#signingKey", () => {
		const subject = new Signatory(
			new MnemonicSignatory({
				signingKey: "signingKey",
				address: "identifier",
				publicKey: "publicKey",
				privateKey: "privateKey",
			}),
		);

		expect(subject.signingKey()).toMatchInlineSnapshot(`"signingKey"`);
	});

	test("#signingKeys", () => {
		const subject = new Signatory(
			new MnemonicSignatory({
				signingKey: "signingKey",
				address: "identifier",
				publicKey: "publicKey",
				privateKey: "privateKey",
			}),
		);

		expect(() => subject.signingKeys()).toThrow(/cannot be called/);
	});

	test("#signingList", () => {
		const subject = new Signatory(
			new MnemonicSignatory({
				signingKey: "signingKey",
				address: "identifier",
				publicKey: "publicKey",
				privateKey: "privateKey",
			}),
		);

		expect(() => subject.signingList()).toThrow(/cannot be called/);
	});

	test("#confirmKey", () => {
		const subject = new Signatory(
			new MnemonicSignatory({
				signingKey: "signingKey",
				address: "identifier",
				publicKey: "publicKey",
				privateKey: "privateKey",
			}),
		);

		expect(() => subject.confirmKey()).toThrow(/cannot be called/);
	});

	test("#identifier", () => {
		const subject = new Signatory(
			new MnemonicSignatory({
				signingKey: "signingKey",
				address: "identifier",
				publicKey: "publicKey",
				privateKey: "privateKey",
			}),
		);

		expect(subject.identifier()).toMatchInlineSnapshot(`"identifier"`);
	});

	test("#identifiers", () => {
		const subject = new Signatory(
			new MnemonicSignatory({
				signingKey: "signingKey",
				address: "identifier",
				publicKey: "publicKey",
				privateKey: "privateKey",
			}),
		);

		expect(() => subject.identifiers()).toThrow(/cannot be called/);
	});
});

describe("MultiMnemonicSignatory", () => {
	test("#signingKey", () => {
		const subject = new Signatory(new MultiMnemonicSignatory(["signingKey"], ["identifier"]));

		expect(() => subject.signingKey()).toThrow(/cannot be called/);
	});

	test("#signingKeys", () => {
		const subject = new Signatory(new MultiMnemonicSignatory(["signingKey"], ["identifier"]));

		expect(subject.signingKeys()).toMatchInlineSnapshot(`
		Array [
		  "signingKey",
		]
	`);
	});

	test("#signingList", () => {
		const subject = new Signatory(new MultiMnemonicSignatory(["signingKey"], ["identifier"]));

		expect(() => subject.signingList()).toThrow(/cannot be called/);
	});

	test("#confirmKey", () => {
		const subject = new Signatory(new MultiMnemonicSignatory(["signingKey"], ["identifier"]));

		expect(() => subject.confirmKey()).toThrow(/cannot be called/);
	});

	test("#identifier", () => {
		const subject = new Signatory(new MultiMnemonicSignatory(["signingKey"], ["identifier"]));

		expect(() => subject.identifier()).toThrow(/cannot be called/);
	});

	test("#identifiers", () => {
		const subject = new Signatory(new MultiMnemonicSignatory(["signingKey"], ["identifier"]));

		expect(subject.identifiers()).toMatchInlineSnapshot(`
		Array [
		  "identifier",
		]
	`);
	});
});

describe("SecondaryMnemonicSignatory", () => {
	test("#signingKey", () => {
		const subject = new Signatory(
			new SecondaryMnemonicSignatory({
				signingKey: "signingKey",
				confirmKey: "confirmKey",
				address: "identifier",
				publicKey: "publicKey",
				privateKey: "privateKey",
			}),
		);

		expect(subject.signingKey()).toMatchInlineSnapshot(`"signingKey"`);
	});

	test("#signingKeys", () => {
		const subject = new Signatory(
			new SecondaryMnemonicSignatory({
				signingKey: "signingKey",
				confirmKey: "confirmKey",
				address: "identifier",
				publicKey: "publicKey",
				privateKey: "privateKey",
			}),
		);

		expect(() => subject.signingKeys()).toThrow(/cannot be called/);
	});

	test("#signingList", () => {
		const subject = new Signatory(
			new SecondaryMnemonicSignatory({
				signingKey: "signingKey",
				confirmKey: "confirmKey",
				address: "identifier",
				publicKey: "publicKey",
				privateKey: "privateKey",
			}),
		);

		expect(() => subject.signingList()).toThrow(/cannot be called/);
	});

	test("#confirmKey", () => {
		const subject = new Signatory(
			new SecondaryMnemonicSignatory({
				signingKey: "signingKey",
				confirmKey: "confirmKey",
				address: "identifier",
				publicKey: "publicKey",
				privateKey: "privateKey",
			}),
		);

		expect(subject.confirmKey()).toMatchInlineSnapshot(`"confirmKey"`);
	});

	test("#identifier", () => {
		const subject = new Signatory(
			new SecondaryMnemonicSignatory({
				signingKey: "signingKey",
				confirmKey: "confirmKey",
				address: "identifier",
				publicKey: "publicKey",
				privateKey: "privateKey",
			}),
		);

		expect(subject.identifier()).toMatchInlineSnapshot(`"identifier"`);
	});

	test("#identifiers", () => {
		const subject = new Signatory(
			new SecondaryMnemonicSignatory({
				signingKey: "signingKey",
				confirmKey: "confirmKey",
				address: "identifier",
				publicKey: "publicKey",
				privateKey: "privateKey",
			}),
		);

		expect(() => subject.identifiers()).toThrow(/cannot be called/);
	});
});

describe("WIFSignatory", () => {
	test("#signingKey", () => {
		const subject = new Signatory(
			new WIFSignatory({
				signingKey: "signingKey",
				address: "identifier",
				publicKey: "publicKey",
				privateKey: "privateKey",
			}),
		);

		expect(subject.signingKey()).toMatchInlineSnapshot(`"signingKey"`);
	});

	test("#signingKeys", () => {
		const subject = new Signatory(
			new WIFSignatory({
				signingKey: "signingKey",
				address: "identifier",
				publicKey: "publicKey",
				privateKey: "privateKey",
			}),
		);

		expect(() => subject.signingKeys()).toThrow(/cannot be called/);
	});

	test("#signingList", () => {
		const subject = new Signatory(
			new WIFSignatory({
				signingKey: "signingKey",
				address: "identifier",
				publicKey: "publicKey",
				privateKey: "privateKey",
			}),
		);

		expect(() => subject.signingList()).toThrow(/cannot be called/);
	});

	test("#confirmKey", () => {
		const subject = new Signatory(
			new WIFSignatory({
				signingKey: "signingKey",
				address: "identifier",
				publicKey: "publicKey",
				privateKey: "privateKey",
			}),
		);

		expect(() => subject.confirmKey()).toThrow(/cannot be called/);
	});

	test("#identifier", () => {
		const subject = new Signatory(
			new WIFSignatory({
				signingKey: "signingKey",
				address: "identifier",
				publicKey: "publicKey",
				privateKey: "privateKey",
			}),
		);

		expect(subject.identifier()).toMatchInlineSnapshot(`"identifier"`);
	});

	test("#identifiers", () => {
		const subject = new Signatory(
			new WIFSignatory({
				signingKey: "signingKey",
				address: "identifier",
				publicKey: "publicKey",
				privateKey: "privateKey",
			}),
		);

		expect(() => subject.identifiers()).toThrow(/cannot be called/);
	});
});

describe("SecondaryWIFSignatory", () => {
	test("#signingKey", () => {
		const subject = new Signatory(
			new SecondaryWIFSignatory({
				signingKey: "signingKey",
				confirmKey: "confirmKey",
				address: "identifier",
				publicKey: "publicKey",
				privateKey: "privateKey",
			}),
		);

		expect(subject.signingKey()).toMatchInlineSnapshot(`"signingKey"`);
	});

	test("#signingKeys", () => {
		const subject = new Signatory(
			new SecondaryWIFSignatory({
				signingKey: "signingKey",
				confirmKey: "confirmKey",
				address: "identifier",
				publicKey: "publicKey",
				privateKey: "privateKey",
			}),
		);

		expect(() => subject.signingKeys()).toThrow(/cannot be called/);
	});

	test("#signingList", () => {
		const subject = new Signatory(
			new SecondaryWIFSignatory({
				signingKey: "signingKey",
				confirmKey: "confirmKey",
				address: "identifier",
				publicKey: "publicKey",
				privateKey: "privateKey",
			}),
		);

		expect(() => subject.signingList()).toThrow(/cannot be called/);
	});

	test("#confirmKey", () => {
		const subject = new Signatory(
			new SecondaryWIFSignatory({
				signingKey: "signingKey",
				confirmKey: "confirmKey",
				address: "identifier",
				publicKey: "publicKey",
				privateKey: "privateKey",
			}),
		);

		expect(subject.confirmKey()).toMatchInlineSnapshot(`"confirmKey"`);
	});

	test("#identifier", () => {
		const subject = new Signatory(
			new SecondaryWIFSignatory({
				signingKey: "signingKey",
				confirmKey: "confirmKey",
				address: "identifier",
				publicKey: "publicKey",
				privateKey: "privateKey",
			}),
		);

		expect(subject.identifier()).toMatchInlineSnapshot(`"identifier"`);
	});

	test("#identifiers", () => {
		const subject = new Signatory(
			new SecondaryWIFSignatory({
				signingKey: "signingKey",
				confirmKey: "confirmKey",
				address: "identifier",
				publicKey: "publicKey",
				privateKey: "privateKey",
			}),
		);

		expect(() => subject.identifiers()).toThrow(/cannot be called/);
	});
});

describe("PrivateKeySignatory", () => {
	test("#signingKey", () => {
		const subject = new Signatory(
			new PrivateKeySignatory({
				signingKey: "signingKey",
				address: "identifier",
				privateKey: "privateKey",
			}),
		);

		expect(subject.signingKey()).toMatchInlineSnapshot(`"signingKey"`);
	});

	test("#signingKeys", () => {
		const subject = new Signatory(
			new PrivateKeySignatory({
				signingKey: "signingKey",
				address: "identifier",
				privateKey: "privateKey",
			}),
		);

		expect(() => subject.signingKeys()).toThrow(/cannot be called/);
	});

	test("#signingList", () => {
		const subject = new Signatory(
			new PrivateKeySignatory({
				signingKey: "signingKey",
				address: "identifier",
				privateKey: "privateKey",
			}),
		);

		expect(() => subject.signingList()).toThrow(/cannot be called/);
	});

	test("#confirmKey", () => {
		const subject = new Signatory(
			new PrivateKeySignatory({
				signingKey: "signingKey",
				address: "identifier",
				privateKey: "privateKey",
			}),
		);

		expect(() => subject.confirmKey()).toThrow(/cannot be called/);
	});

	test("#identifier", () => {
		const subject = new Signatory(
			new PrivateKeySignatory({
				signingKey: "signingKey",
				address: "identifier",
				privateKey: "privateKey",
			}),
		);

		expect(subject.identifier()).toMatchInlineSnapshot(`"identifier"`);
	});

	test("#identifiers", () => {
		const subject = new Signatory(
			new PrivateKeySignatory({
				signingKey: "signingKey",
				address: "identifier",
				privateKey: "privateKey",
			}),
		);

		expect(() => subject.identifiers()).toThrow(/cannot be called/);
	});
});

describe("SignatureSignatory", () => {
	test("#signingKey", () => {
		const subject = new Signatory(
			new SignatureSignatory({
				signingKey: "signingKey",
				address: "identifier",
				publicKey: "publicKey",
			}),
		);

		expect(subject.signingKey()).toMatchInlineSnapshot(`"signingKey"`);
	});

	test("#signingKeys", () => {
		const subject = new Signatory(
			new SignatureSignatory({
				signingKey: "signingKey",
				address: "identifier",
				publicKey: "publicKey",
			}),
		);

		expect(() => subject.signingKeys()).toThrow(/cannot be called/);
	});

	test("#signingList", () => {
		const subject = new Signatory(
			new SignatureSignatory({
				signingKey: "signingKey",
				address: "identifier",
				publicKey: "publicKey",
			}),
		);

		expect(() => subject.signingList()).toThrow(/cannot be called/);
	});

	test("#confirmKey", () => {
		const subject = new Signatory(
			new SignatureSignatory({
				signingKey: "signingKey",
				address: "identifier",
				publicKey: "publicKey",
			}),
		);

		expect(() => subject.confirmKey()).toThrow(/cannot be called/);
	});

	test("#identifier", () => {
		const subject = new Signatory(
			new SignatureSignatory({
				signingKey: "signingKey",
				address: "identifier",
				publicKey: "publicKey",
			}),
		);

		expect(subject.identifier()).toMatchInlineSnapshot(`"identifier"`);
	});

	test("#identifiers", () => {
		const subject = new Signatory(
			new SignatureSignatory({
				signingKey: "signingKey",
				address: "identifier",
				publicKey: "publicKey",
			}),
		);

		expect(() => subject.identifiers()).toThrow(/cannot be called/);
	});
});

describe("SenderPublicKeySignatory", () => {
	test("#signingKey", () => {
		const subject = new Signatory(
			new SenderPublicKeySignatory({
				signingKey: "signingKey",
				address: "identifier",
				publicKey: "publicKey",
			}),
		);

		expect(subject.signingKey()).toMatchInlineSnapshot(`"signingKey"`);
	});

	test("#signingKeys", () => {
		const subject = new Signatory(
			new SenderPublicKeySignatory({
				signingKey: "signingKey",
				address: "identifier",
				publicKey: "publicKey",
			}),
		);

		expect(() => subject.signingKeys()).toThrow(/cannot be called/);
	});

	test("#signingList", () => {
		const subject = new Signatory(
			new SenderPublicKeySignatory({
				signingKey: "signingKey",
				address: "identifier",
				publicKey: "publicKey",
			}),
		);

		expect(() => subject.signingList()).toThrow(/cannot be called/);
	});

	test("#confirmKey", () => {
		const subject = new Signatory(
			new SenderPublicKeySignatory({
				signingKey: "signingKey",
				address: "identifier",
				publicKey: "publicKey",
			}),
		);

		expect(() => subject.confirmKey()).toThrow(/cannot be called/);
	});

	test("#identifier", () => {
		const subject = new Signatory(
			new SenderPublicKeySignatory({
				signingKey: "signingKey",
				address: "identifier",
				publicKey: "publicKey",
			}),
		);

		expect(subject.identifier()).toMatchInlineSnapshot(`"identifier"`);
	});

	test("#identifiers", () => {
		const subject = new Signatory(
			new SenderPublicKeySignatory({
				signingKey: "signingKey",
				address: "identifier",
				publicKey: "publicKey",
			}),
		);

		expect(() => subject.identifiers()).toThrow(/cannot be called/);
	});
});

describe("MultiSignatureSignatory", () => {
	test("#signingKey", () => {
		const subject = new Signatory(
			new MultiSignatureSignatory({ min: 5, publicKeys: ["identifier"] }, "identifier"),
		);

		expect(() => subject.signingKey()).toThrow(/cannot be called/);
	});

	test("#signingKeys", () => {
		const subject = new Signatory(
			new MultiSignatureSignatory({ min: 5, publicKeys: ["identifier"] }, "identifier"),
		);

		expect(() => subject.signingKeys()).toThrow(/cannot be called/);
	});

	test("#signingList", () => {
		const subject = new Signatory(
			new MultiSignatureSignatory({ min: 5, publicKeys: ["identifier"] }, "identifier"),
		);

		expect(subject.signingList()).toMatchInlineSnapshot(`
		Object {
		  "min": 5,
		  "publicKeys": Array [
		    "identifier",
		  ],
		}
	`);
	});

	test("#confirmKey", () => {
		const subject = new Signatory(
			new MultiSignatureSignatory({ min: 5, publicKeys: ["identifier"] }, "identifier"),
		);

		expect(() => subject.confirmKey()).toThrow(/cannot be called/);
	});

	test("#identifier", () => {
		const subject = new Signatory(
			new MultiSignatureSignatory({ min: 5, publicKeys: ["identifier"] }, "identifier"),
		);

		expect(subject.identifier()).toMatchInlineSnapshot(`"identifier"`);
	});

	test("#identifiers", () => {
		const subject = new Signatory(
			new MultiSignatureSignatory({ min: 5, publicKeys: ["identifier"] }, "identifier"),
		);

		expect(() => subject.identifiers()).toThrow(/cannot be called/);
	});
});

describe("PrivateMultiSignatureSignatory", () => {
	test("#signingKey", () => {
		const subject = new Signatory(
			new PrivateMultiSignatureSignatory("this is a top secret passphrase 1", [
				"this is a top secret passphrase 1",
				"this is a top secret passphrase 2",
			]),
		);

		expect(subject.signingKey()).toMatchInlineSnapshot(`"this is a top secret passphrase 1"`);
	});

	test("#signingKeys", () => {
		const subject = new Signatory(
			new PrivateMultiSignatureSignatory("this is a top secret passphrase 1", [
				"this is a top secret passphrase 1",
				"this is a top secret passphrase 2",
			]),
		);

		expect(subject.signingKeys()).toMatchInlineSnapshot(`
		Array [
		  "this is a top secret passphrase 1",
		  "this is a top secret passphrase 2",
		]
	`);
	});

	test("#signingList", () => {
		const subject = new Signatory(
			new PrivateMultiSignatureSignatory("this is a top secret passphrase 1", [
				"this is a top secret passphrase 1",
				"this is a top secret passphrase 2",
			]),
		);

		expect(() => subject.confirmKey()).toThrow(/cannot be called/);
	});

	test("#confirmKey", () => {
		const subject = new Signatory(
			new PrivateMultiSignatureSignatory("this is a top secret passphrase 1", [
				"this is a top secret passphrase 1",
				"this is a top secret passphrase 2",
			]),
		);

		expect(() => subject.confirmKey()).toThrow(/cannot be called/);
	});

	test("#identifier", () => {
		const subject = new Signatory(
			new PrivateMultiSignatureSignatory("this is a top secret passphrase 1", [
				"this is a top secret passphrase 1",
				"this is a top secret passphrase 2",
			]),
		);

		expect(() => subject.identifier()).toThrow(/cannot be called/);
	});

	test("#identifiers", () => {
		const subject = new Signatory(
			new PrivateMultiSignatureSignatory("this is a top secret passphrase 1", [
				"this is a top secret passphrase 1",
				"this is a top secret passphrase 2",
			]),
		);

		expect(() => subject.identifiers()).toThrow(/cannot be called/);
	});
});

test("#actsWithMnemonic", () => {
	const subject = new Signatory(
		new PrivateMultiSignatureSignatory("this is a top secret passphrase 1", [
			"this is a top secret passphrase 1",
			"this is a top secret passphrase 2",
		]),
	);

	expect(subject.actsWithMnemonic()).toBeBoolean();
});

test("#actsWithMultiMnemonic", () => {
	const subject = new Signatory(
		new PrivateMultiSignatureSignatory("this is a top secret passphrase 1", [
			"this is a top secret passphrase 1",
			"this is a top secret passphrase 2",
		]),
	);

	expect(subject.actsWithMultiMnemonic()).toBeBoolean();
});

test("#actsWithSecondaryMnemonic", () => {
	const subject = new Signatory(
		new PrivateMultiSignatureSignatory("this is a top secret passphrase 1", [
			"this is a top secret passphrase 1",
			"this is a top secret passphrase 2",
		]),
	);

	expect(subject.actsWithSecondaryMnemonic()).toBeBoolean();
});

test("#actsWithWif", () => {
	const subject = new Signatory(
		new PrivateMultiSignatureSignatory("this is a top secret passphrase 1", [
			"this is a top secret passphrase 1",
			"this is a top secret passphrase 2",
		]),
	);

	expect(subject.actsWithWif()).toBeBoolean();
});

test("#actsWithSecondaryWif", () => {
	const subject = new Signatory(
		new PrivateMultiSignatureSignatory("this is a top secret passphrase 1", [
			"this is a top secret passphrase 1",
			"this is a top secret passphrase 2",
		]),
	);

	expect(subject.actsWithSecondaryWif()).toBeBoolean();
});

test("#actsWithPrivateKey", () => {
	const subject = new Signatory(
		new PrivateMultiSignatureSignatory("this is a top secret passphrase 1", [
			"this is a top secret passphrase 1",
			"this is a top secret passphrase 2",
		]),
	);

	expect(subject.actsWithPrivateKey()).toBeBoolean();
});

test("#actsWithSignature", () => {
	const subject = new Signatory(
		new PrivateMultiSignatureSignatory("this is a top secret passphrase 1", [
			"this is a top secret passphrase 1",
			"this is a top secret passphrase 2",
		]),
	);

	expect(subject.actsWithSignature()).toBeBoolean();
});

test("#actsWithSenderPublicKey", () => {
	const subject = new Signatory(
		new PrivateMultiSignatureSignatory("this is a top secret passphrase 1", [
			"this is a top secret passphrase 1",
			"this is a top secret passphrase 2",
		]),
	);

	expect(subject.actsWithSenderPublicKey()).toBeBoolean();
});

test("#actsWithMultiSignature", () => {
	const subject = new Signatory(
		new PrivateMultiSignatureSignatory("this is a top secret passphrase 1", [
			"this is a top secret passphrase 1",
			"this is a top secret passphrase 2",
		]),
	);

	expect(subject.actsWithMultiSignature()).toBeBoolean();
});

test("#actsWithPrivateMultiSignature", () => {
	const subject = new Signatory(
		new PrivateMultiSignatureSignatory("this is a top secret passphrase 1", [
			"this is a top secret passphrase 1",
			"this is a top secret passphrase 2",
		]),
	);

	expect(subject.actsWithPrivateMultiSignature()).toBeBoolean();
});
