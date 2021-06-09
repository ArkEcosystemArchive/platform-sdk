import "jest-extended";

import nock from "nock";

import { createService } from "../test/helpers";
import { FeeService } from "./fee.service";

let subject: FeeService;

beforeEach(async () => {
	subject = createService(FeeService);
});

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

describe("FeeService", () => {
	describe("#all", () => {
		it("should succeed", async () => {
			nock(/.+/)
				.get("/api/node/fees")
				.reply(200, require(`${__dirname}/../../test/fixtures/client/feesByNode.json`))
				.get("/api/transactions/fees")
				.reply(200, require(`${__dirname}/../../test/fixtures/client/feesByType.json`));

			const result = await subject.all();

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

			expect(result.transfer.min.toString()).toBe("3627425");
			expect(result.transfer.avg.toString()).toBe("9878740");
			expect(result.transfer.max.toString()).toBe("10000000");
			expect(result.transfer.static.toString()).toBe("10000000");
		});
	});
});
