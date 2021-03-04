import { hasUncaughtExceptionCaptureCallback } from "process";
import { AddressList } from "./address-list";

describe("AddressList", function () {
	it("should generate 20 addresses", async () => {
		const subject = new AddressList();

		expect(subject.make("secret", 20)).toHaveLength(20);
	});
});
