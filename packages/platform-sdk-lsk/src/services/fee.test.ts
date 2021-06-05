import "jest-extended";

import { Test } from "@arkecosystem/platform-sdk";

import { createConfig } from "../../test/helpers";
import { container } from "../container";
import { FeeService } from "./fee";

let subject: FeeService;

beforeEach(async () => {
	subject = await FeeService.__construct(createConfig());

	Test.bindBigNumberService(container);
});

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

			expect(result.transfer.min.toString()).toBe("10000000");
			expect(result.transfer.avg.toString()).toBe("10000000");
			expect(result.transfer.max.toString()).toBe("10000000");
			expect(result.transfer.static.toString()).toBe("10000000");
		});
	});
});
