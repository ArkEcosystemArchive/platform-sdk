import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { createNetworkConfig } from "../../../test/helpers";
import { PrivateKeyService } from "./private-key";

let subject: PrivateKeyService;

beforeEach(async () => (subject = new PrivateKeyService(createNetworkConfig())));

describe("PrivateKey", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toEqual({ privateKey: "d8839c2432bfd0a67ef10a804ba991eabba19f154a3d707917681d45822a5712" });
	});

	it("should generate an output from a wif", async () => {
		const result = await subject.fromWIF(identity.wif);

		expect(result).toEqual({ privateKey: "d8839c2432bfd0a67ef10a804ba991eabba19f154a3d707917681d45822a5712" });
	});
});
