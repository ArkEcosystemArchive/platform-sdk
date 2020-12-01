import "jest-extended";

import { identity } from "../../test/fixtures/identity";
import { createConfig } from "../../test/helpers";
import { IdentityService } from "./identity";

let subject: IdentityService;

beforeEach(async () => {
	subject = await IdentityService.construct(createConfig());
});

describe("IdentityService", () => {
	describe("#address", () => {
		it("should generate an output from a mnemonic", async () => {
			const result: any = await subject.address().fromMnemonic(identity.mnemonic);

			expect(result).toBe(
				"addr1qqy6nhfyks7wdu3dudslys37v252w2nwhv0fw2nfawemmn8k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33su9wxrs",
			);
		});
	});
});
