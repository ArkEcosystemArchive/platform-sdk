import "jest-extended";

import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { TransactionData } from "../../src/dto/transaction";
import Fixture from "../__fixtures__/client/transaction.json";

describe("TransactionData", function () {
	it("should succeed", async () => {
		const result = new TransactionData(Fixture);

		expect(result).toBeInstanceOf(TransactionData);
		expect(result.id()).toBe("68ad0264053ab94fa7749e78d2f728911d166ca9af8dbb68e6ee264958ca7f32");
		expect(result.type()).toBe("transfer");
		expect(result.timestamp()).toBe(1561095453000);
		expect(result.confirmations()).toEqual(BigNumber.make(159414));
		// expect(result.sender()).toBe("...");
		// expect(result.recipient()).toBe("...");
		expect(result.amount()).toEqual(BigNumber.make(3050000));
		expect(result.fee()).toEqual(BigNumber.make(10000));
		expect(result.memo()).toBeUndefined();
	});
});
