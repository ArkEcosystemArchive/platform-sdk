import "jest-extended";

import { HtlcClaimData } from "./htlc-claim";

let subject: HtlcClaimData;

beforeEach(() => (subject = new HtlcClaimData({ asset: { lock: { lockTransactionId: "1", unlockSecret: "2"}}})));

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
