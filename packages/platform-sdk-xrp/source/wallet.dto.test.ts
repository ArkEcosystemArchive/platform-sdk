import "jest-extended";

import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { result as fixture } from "../test/fixtures/client/wallet.json";
import { WalletData } from "./wallet.dto";
import { createService } from "../test/mocking";

describe("WalletData", () => {
	it("should succeed", async () => {
		const result = createService(WalletData).fill(fixture.account_data);

		expect(result).toBeInstanceOf(WalletData);
		expect(result.address()).toEqual("r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59");
		expect(result.publicKey()).toBeUndefined();
		expect(result.balance().available).toEqual(BigNumber.make("92291324300"));
	});
});
