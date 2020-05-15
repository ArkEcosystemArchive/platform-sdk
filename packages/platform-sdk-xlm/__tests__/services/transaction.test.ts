import "jest-extended";
import nock from "nock";

import { TransactionService } from "../../src/services/transaction";
import { identity } from "../__fixtures__/identity";

let subject: TransactionService;

beforeEach(async () => (subject = await TransactionService.construct({ network: "testnet" })));

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

describe("TransactionService", () => {
	describe("#transfer", () => {
		it("should verify", async () => {
			nock("https://horizon-testnet.stellar.org")
				.get("/accounts/GCGYSPQBSQCJKNDXDISBSXAM3THK7MACUVZGEMXF6XRZCPGAWCUGXVNC")
				.query(true)
				.reply(200, require(`${__dirname}/../__fixtures__/client/wallet.json`));

			const result: any = await subject.transfer({
				sign: {
					passphrase: identity.passphrase,
				},
				data: {
					amount: "10000000",
					to: identity.address,
				},
			});

			expect(result).toBeObject();
		});
	});
});
