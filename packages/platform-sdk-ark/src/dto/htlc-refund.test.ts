import "jest-extended";

import { createService } from "../../test/helpers";
import { HtlcRefundData } from "./htlc-refund";

let subject: HtlcRefundData;

beforeEach(() => {
	subject = createService(HtlcRefundData);
	subject.configure({ asset: { refund: { lockTransactionId: "1", unlockSecret: "2" } } });
});

describe("HtlcRefundData", () => {
	test("#lockTransactionId", () => {
		expect(subject.lockTransactionId()).toBe("1");
	});

	test("#type", () => {
		expect(subject.type()).toBe("transfer");
	});
});
