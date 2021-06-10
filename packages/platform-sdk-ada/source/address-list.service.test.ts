import { identity } from "../test/fixtures/identity";
import { ExtendedAddressService } from "./address-list.service";

describe("ExtendedAddressService", function () {
	test("#fromMnemonic", async () => {
		const subject = new ExtendedAddressService();

		await expect(subject.fromMnemonic(identity.mnemonic, 20)).resolves.toHaveLength(20);
	});
});
