import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { AddressService } from "./address";

let subject: AddressService;

beforeEach(async () => (subject = new AddressService()));

describe("Address", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).expect(result).toMatchInlineSnapshot();
	});

	it("should generate an output from a private key", async () => {
		const result = await subject.fromPrivateKey(identity.privateKey);

		expect(result).expect(result).toMatchInlineSnapshot();
	});
});
