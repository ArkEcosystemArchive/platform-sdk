import "jest-extended";

import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import Fixture from "../../test/fixtures/client/transaction.json";
import { TransactionData } from "./transaction";
import { createService } from "../../test/helpers";

let subject: TransactionData;

beforeEach(() => {
	subject = createService(TransactionData);
	subject.configure(Fixture);
});

describe("TransactionData", () => {
	it("should succeed", async () => {
		expect(subject).toBeInstanceOf(TransactionData);
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
