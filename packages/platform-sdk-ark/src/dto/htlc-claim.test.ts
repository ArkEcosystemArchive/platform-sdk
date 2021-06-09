import "jest-extended";
import { createService } from "../../test/helpers";

import { HtlcClaimData } from "./htlc-claim";

let subject: HtlcClaimData;

beforeEach(() => {
	subject = createService(HtlcClaimData);
	subject.configure({ asset: { lock: { lockTransactionId: "1", unlockSecret: "2" } } });
});

describe("HtlcClaimData", () => {
	test("#lockTransactionId", () => {
		expect(subject.lockTransactionId()).toBe("1");
	});

	test("#unlockSecret", () => {
		expect(subject.unlockSecret()).toBe("2");
	});

	test("#type", () => {
		expect(subject.type()).toBe("transfer");
	});
});
