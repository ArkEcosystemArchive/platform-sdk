import "jest-extended";

import { createConfig } from "../../test/helpers";
import { FeeService } from "./fee";

let subject: FeeService;

beforeEach(async () => (subject = await FeeService.__construct(createConfig())));

describe("FeeService", () => {
	describe("#all", () => {
		it("should succeed", async () => {
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

			expect(result.transfer).toEqual({ avg: "10000000", max: "10000000", min: "10000000", static: "10000000" });
		});
	});
});
