import "jest-extended";

import { BigNumber } from "@arkecosystem/platform-sdk-support";

import Fixture from "../../test/fixtures/client/wallet.json";
import { WalletData } from "./wallet";

describe("WalletData", function () {
	it("should succeed", async () => {
		const result = new WalletData(Fixture);

		expect(result).toBeInstanceOf(WalletData);
		expect(result.address()).toBe("my48EN4kDnGEpRZMBfiDS65wdfwfgCGZRz");
		expect(result.publicKey()).toBe("76a914c05f53de525d80151e209a729cf1c7909c88f88e88ac");
		expect(result.balance()).toEqual(BigNumber.make(3050000));
	});
});
