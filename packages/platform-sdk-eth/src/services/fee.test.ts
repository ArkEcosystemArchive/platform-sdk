import "jest-extended";

import nock from "nock";

import { createConfig } from "../../test/helpers";
import { FeeService } from "./fee";

let subject: FeeService;

beforeEach(async () => (subject = await FeeService.__construct(createConfig())));

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

describe("FeeService", function () {
	it("should fetch all available fees", async () => {
		nock("https://platform.ark.io/api/eth")
			.get("/fees")
			.reply(200, require(`${__dirname}/../../test/fixtures/client/fees.json`));

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

		expect(result.transfer).toEqual({
			avg: "105000000000",
			max: "105000000000",
			min: "105000000000",
			static: "105000000000",
		});
	});
});
