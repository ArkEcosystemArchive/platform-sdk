import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { createConfig } from "../../../test/config";
import { getZilliqa } from "../../zilliqa";
import { PublicKey } from "./public-key";

let subject: PublicKey;

beforeEach(async () => (subject = new PublicKey(getZilliqa(createConfig()).wallet)));

describe("PublicKey", () => {
	it("should generate an output from a mnemonic", async () => {
		const result: any = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toBe(identity.publicKey);
	});

	it("should fail to generate an output from an invalid mnemonic", async () => {
		await expect(subject.fromMnemonic(identity.mnemonic.slice(0, 10))).rejects.toThrowError();
	});

	it("should fail to generate an output from a multiSignature", async () => {
		await expect(
			subject.fromMultiSignature(identity.multiSignature.min, identity.multiSignature.publicKeys),
		).rejects.toThrow(/is not supported/);
	});

	it("should fail to generate an output from a wif", async () => {
		await expect(subject.fromWIF(identity.wif)).rejects.toThrow(/is not supported/);
	});
});
