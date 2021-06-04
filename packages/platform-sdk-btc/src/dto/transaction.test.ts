import "jest-extended";

import { Test } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import Fixture from "../../test/fixtures/client/transaction.json";
import { TransactionData } from "./transaction";
import { container } from "../../src/container";

beforeAll(() => {
	Test.bindBigNumberService(container);
});

describe("TransactionData", () => {
	it("should succeed", async () => {
		const result = new TransactionData(Fixture);

		expect(result).toBeInstanceOf(TransactionData);
		expect(result.id()).toBe("68ad0264053ab94fa7749e78d2f728911d166ca9af8dbb68e6ee264958ca7f32");
		expect(result.type()).toBe("transfer");
		expect(result.timestamp()).toBeInstanceOf(DateTime);
		expect(result.confirmations()).toEqual(BigNumber.make(159414));
		// expect(result.sender()).toBe("...");
		// expect(result.recipient()).toBe("...");
		expect(result.amount()).toEqual(BigNumber.make(3050000));
		expect(result.fee()).toEqual(BigNumber.make(10000));
	});
});
