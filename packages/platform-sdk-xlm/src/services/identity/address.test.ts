import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { Address } from "./address";

let subject: Address;

beforeEach(async () => (subject = new Address()));

describe("Address", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toBe(identity.address);
	});

	it("should generate an output from a private key", async () => {
		const result = await subject.fromPrivateKey(identity.privateKey);

		expect(result).toBe(identity.address);
	});
});
