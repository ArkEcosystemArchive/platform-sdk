import "jest-extended";

import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { result as fixture } from "../../test/fixtures/client/transaction.json";
import { TransactionData } from "./transaction";

describe("TransactionData", function () {
	it("should succeed", async () => {
		const result = new TransactionData(fixture);

		expect(result).toBeInstanceOf(TransactionData);
		expect(result.id()).toBe("F4AB442A6D4CBB935D66E1DA7309A5FC71C7143ED4049053EC14E3875B0CF9BF");
		expect(result.type()).toBe("transfer");
		expect(result.timestamp()).toBeInstanceOf(DateTime);
		expect(result.confirmations()).toEqual(BigNumber.ZERO);
		expect(result.sender()).toBe("r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59");
		expect(result.recipient()).toBe("r3PDtZSa5LiYp1Ysn1vMuMzB59RzV3W9QH");
		expect(result.amount()).toEqual(BigNumber.make(100000));
		expect(result.fee()).toEqual(BigNumber.make(1000));
		expect(result.memo()).toBeUndefined();
	});
});
