import { hasUncaughtExceptionCaptureCallback } from "process";
import { AddressList } from "./address-list";
import { identity } from "../../../test/fixtures/identity";

describe("AddressList", function () {
	test("#fromMnemonic", async () => {
		const subject = new AddressList();

		expect(subject.fromMnemonic(identity.mnemonic, 20)).toHaveLength(20);
	});
});
