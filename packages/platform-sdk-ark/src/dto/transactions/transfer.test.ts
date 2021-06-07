import "jest-extended";

import { TransferData } from "./transfer";

let subject: TransferData;

beforeEach(() => (subject = new TransferData({ vendorField: "X" })));

describe("TransferData", () => {
	test("#memo", () => {
		expect(subject.memo()).toEqual("X");
	});

	test("#type", () => {
		expect(subject.type()).toBe("transfer");
	});
});
