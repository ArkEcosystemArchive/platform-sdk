import "jest-extended";
import nock from "nock";

import { FeeService } from "./fee";
import { createConfig } from "../../test/helpers";

let subject: FeeService;

beforeEach(async () => (subject = await FeeService.construct(createConfig())));

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

describe("FeeService", function () {
	describe("#all", () => {
		it("should succeed", async () => {
			nock(/.+/)
				.get("/api/node/fees?days=7")
				.reply(200, require(`${__dirname}/../../test/fixtures/client/feesByNode.json`))
				.get("/api/transactions/fees")
				.reply(200, require(`${__dirname}/../../test/fixtures/client/feesByType.json`));

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
				"businessRegistration",
				"businessResignation",
				"businessUpdate",
				"bridgechainRegistration",
				"bridgechainResignation",
				"bridgechainUpdate",
			]);

			expect(result.transfer).toEqual({ avg: "9878740", max: "10000000", min: "3627425", static: "10000000" });
		});
	});
});
