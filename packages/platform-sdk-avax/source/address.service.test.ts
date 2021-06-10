import "jest-extended";

import { identity } from "../test/fixtures/identity";
import { createService } from "../test/helpers";
import { AddressService } from "./address.service";

let subject: AddressService;

beforeEach(async () => {
	subject = createService(AddressService);
});

describe("Address", () => {
	it("should generate an output from a mnemonic", async () => {
		await expect(subject.fromMnemonic(identity.mnemonic)).resolves.toMatchInlineSnapshot(`
					Object {
					  "address": "X-fuji1rusf9c2uwlqxg5crfrqr8xrt4r49yk6rskehvm",
					  "path": "m/44'/9000'/0'/0/0",
					  "type": "bip44",
					}
				`);
	});

	it("should fail to generate an output from a privateKey", async () => {
		await expect(subject.fromPrivateKey(identity.privateKey)).resolves.toEqual({
			type: "bip44",
			address: identity.address,
		});
	});

	it("should fail to validate an address", async () => {
		await expect(subject.validate(identity.address)).resolves.toBeTrue();
	});
});
