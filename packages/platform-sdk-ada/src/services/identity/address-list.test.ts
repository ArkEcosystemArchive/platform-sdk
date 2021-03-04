import { hasUncaughtExceptionCaptureCallback } from "process";
import { AddressList } from "./address-list";
import { identity } from "../../../test/fixtures/identity";

describe("AddressList", function () {
	it("should generate 20 addresses", async () => {
		const subject = new AddressList();

		expect(subject.make(identity.mnemonic, 20)).toHaveLength(20);
	});
});
