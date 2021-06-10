import "jest-extended";

import { createService } from "../test/mocking";
import { TransferData } from "./transfer.dto";

let subject: TransferData;

beforeEach(() => {
	subject = createService(TransferData);
	subject.configure({ vendorField: "X" });
});

describe("TransferData", () => {
	test("#memo", () => {
		expect(subject.memo()).toEqual("X");
	});

	test("#type", () => {
		expect(subject.type()).toBe("transfer");
	});
});
