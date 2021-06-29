import "jest-extended";

import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import Fixture from "../test/fixtures/client/transaction.json";
import { createService } from "../test/mocking";
import { ConfirmedTransactionData } from "./transaction.dto";

let subject: ConfirmedTransactionData;

beforeEach(() => {
	subject = createService(ConfirmedTransactionData);
	subject.configure(Fixture);
});

describe("ConfirmedTransactionData", () => {
	it("should succeed", async () => {
		expect(subject).toBeInstanceOf(ConfirmedTransactionData);
		expect(subject.id()).toBe("68ad0264053ab94fa7749e78d2f728911d166ca9af8dbb68e6ee264958ca7f32");
		expect(subject.type()).toBe("transfer");
		expect(subject.timestamp()).toBeInstanceOf(DateTime);
		expect(subject.confirmations()).toEqual(BigNumber.make(159414));
		// expect(subject.sender()).toBe("...");
		// expect(subject.recipient()).toBe("...");
		expect(subject.amount()).toEqual(BigNumber.make(3050000));
		expect(subject.fee()).toEqual(BigNumber.make(10000));
	});
});
