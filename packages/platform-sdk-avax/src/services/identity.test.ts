import "jest-extended";

import { identity } from "../../test/fixtures/identity";
import { createConfig } from "../../test/helpers";
import { IdentityService } from "./identity";

let subject: IdentityService;

beforeEach(async () => {
	subject = await IdentityService.__construct(createConfig());
});

describe("IdentityService", () => {
	describe("#address", () => {
		it("should generate an output from a mnemonic", async () => {
			await expect(subject.address().fromMnemonic(identity.mnemonic)).resolves.toBe(identity.address);
		});

		it("should fail to generate an output from a multiSignature", async () => {
			await expect(subject.address().fromMultiSignature(0, [])).rejects.toThrow(/is not supported/);
		});

		it("should fail to generate an output from a privateKey", async () => {
			await expect(subject.address().fromPrivateKey(identity.privateKey)).rejects.toThrow(/is not supported/);
		});

		it("should fail to generate an output from a publicKey", async () => {
			await expect(subject.address().fromPublicKey(identity.publicKey)).rejects.toThrow(/is not supported/);
		});

		it("should fail to generate an output from a wif", async () => {
			await expect(subject.address().fromWIF(identity.wif)).rejects.toThrow(/is not supported/);
		});

		it("should fail to validate an address", async () => {
			await expect(subject.address().validate(identity.address)).rejects.toThrow(/is not supported/);
		});
	});

	describe("#keys", () => {
		it("should generate an output from a mnemonic", async () => {
			await expect(subject.keys().fromMnemonic(identity.mnemonic)).rejects.toThrow(/is not supported/);
		});

		it("should generate an output from a privateKey", async () => {
			await expect(subject.keys().fromPrivateKey(identity.privateKey)).resolves.toEqual({
				privateKey: "24jUJ9vZexUM6expyMcT48LBx27k1m7xpraoV62oSQAHdziao5",
				publicKey: "7i8kVz6d6FsACnGUEbjyivaULARjmXaaJDzTFUpPjuBwecpmtF",
			});
		});

		it("should generate an output from a wif", async () => {
			await expect(subject.keys().fromWIF(identity.wif)).rejects.toThrow(/is not supported/);
		});
	});

	describe("#privateKey", () => {
		it("should generate an output from a mnemonic", async () => {
			await expect(subject.privateKey().fromMnemonic(identity.mnemonic)).resolves.toBe(
				"PrivateKey-rC7DsPL1zKuPnwnqHSnShdXxeMReKWLBJgKcuJ1ZLUCUrzRni",
			);
		});

		it("should fail to generate an output from a wif", async () => {
			await expect(subject.privateKey().fromWIF(identity.wif)).rejects.toThrow(/is not supported/);
		});
	});

	describe("#publicKey", () => {
		it("should generate an output from a mnemonic", async () => {
			await expect(subject.publicKey().fromMnemonic(identity.mnemonic)).resolves.toBe(
				"7qobgTQPiy3mH4tvjabDjapPVrh9Tnkb3tpn2yY37hsEyxaSjW",
			);
		});

		it("should fail to generate an output from a multiSignature", async () => {
			await expect(subject.publicKey().fromMultiSignature(0, [])).rejects.toThrow(/is not supported/);
		});

		it("should fail to generate an output from a wif", async () => {
			await expect(subject.publicKey().fromWIF(identity.wif)).rejects.toThrow(/is not supported/);
		});
	});

	describe("#wif", () => {
		it("should fail to generate an output from a mnemonic", async () => {
			await expect(subject.wif().fromMnemonic(identity.mnemonic)).rejects.toThrow(/is not supported/);
		});
	});

	it("should do nothing on destruct", async () => {
		await expect(subject.__destruct()).resolves.toBeUndefined();
	});
});
