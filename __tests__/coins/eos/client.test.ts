import "jest-extended";

import { EOS } from "../../../src/coins/eos/client";

let subject: EOS;

beforeEach(() => (subject = new EOS("https://api.testnet.eos.io")));

describe("EOS", function () {
	describe("#postTransactions", () => {
		it("should succeed", async () => {
			const result = await subject.postTransactions([]);

			expect(result).toBeObject();
		});
	});
});
