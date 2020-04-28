import "jest-extended";

import { Client } from "../src/client";

let subject: Client;

beforeEach(() => (subject = new Client("https://api.testnet.eos.io")));

describe("Client", function () {
	describe("#postTransactions", () => {
		it("should succeed", async () => {
			const result = await subject.postTransactions([]);

			expect(result).toBeUndefined();
		});
	});
});
