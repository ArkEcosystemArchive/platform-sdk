import "jest-extended";
import nock from "nock";

import { FeeService } from "../../src/services/fee";

let subject: FeeService;

beforeEach(async () => (subject = await FeeService.construct({ peer: "https://dexplorer.ark.io/api" })));

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

describe("FeeService", function () {
	describe("#fees", () => {
		it("should succeed", async () => {
			nock("https://dexplorer.ark.io/api")
				.get("/node/fees?days=7")
				.reply(200, require(`${__dirname}/../__fixtures__/client/feesByNode.json`))
				.get("/transactions/fees")
				.reply(200, require(`${__dirname}/../__fixtures__/client/feesByType.json`));

			const result = await subject.all(7);

			expect(result).toContainAllKeys([
				"transfer",
				"secondSignature",
				"delegateRegistration",
				"vote",
				"multiSignature",
				"ipfs",
				"multiPayment",
				"delegateResignation",
				"htlcLock",
				"htlcClaim",
				"htlcRefund",
			]);

			expect(result.transfer).toEqual({ avg: "9878740", max: "10000000", min: "3627425", static: "10000000" });
		});
	});
});
