import "jest-extended";

import { HtlcRefundData } from "./htlc-refund";

let subject: HtlcRefundData;

beforeEach(() => (subject = new HtlcRefundData({ asset: { refund: { lockTransactionId: "1", unlockSecret: "2"}}})));

describe("HtlcRefundData", () => {
	test("#lockTransactionId", () => {
		expect(subject.lockTransactionId()).toBe("1");
	});

	test("#type", () => {
		expect(subject.type()).toBe("transfer");
	});
});
