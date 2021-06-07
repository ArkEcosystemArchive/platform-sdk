import "jest-extended";

import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { WalletData } from "./wallet";

const { result: fixture } = require("../../test/fixtures/client/wallet.json");

describe("WalletData", () => {
	it("should succeed", async () => {
		const result = new WalletData(fixture.account_data);

		expect(result).toBeInstanceOf(WalletData);
		expect(result.address()).toEqual("r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59");
		expect(result.publicKey()).toBeUndefined();
		expect(result.balance().available).toEqual(BigNumber.make("92291324300"));
	});
});
