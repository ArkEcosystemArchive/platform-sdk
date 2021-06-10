import "jest-extended";

import { createService } from "../test/helpers";
import { TransferData } from "./transfer";

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
