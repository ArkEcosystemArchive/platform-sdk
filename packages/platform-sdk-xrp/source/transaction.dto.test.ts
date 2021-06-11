import "jest-extended";

import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { result as fixture } from "../test/fixtures/client/transaction.json";
import { createService } from "../test/mocking";
import { TransactionData } from "./transaction.dto";

let subject: TransactionData;

beforeEach(() => {
	subject = createService(TransactionData);
	subject.configure(fixture);
});

describe("TransactionData", () => {
	it("should succeed", async () => {
		expect(subject).toBeInstanceOf(TransactionData);
		expect(subject.id()).toBe("F4AB442A6D4CBB935D66E1DA7309A5FC71C7143ED4049053EC14E3875B0CF9BF");
		expect(subject.type()).toBe("transfer");
		expect(subject.timestamp()).toBeInstanceOf(DateTime);
		expect(subject.confirmations()).toEqual(BigNumber.ZERO);
		expect(subject.sender()).toBe("r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59");
		expect(subject.recipient()).toBe("r3PDtZSa5LiYp1Ysn1vMuMzB59RzV3W9QH");
		expect(subject.amount()).toEqual(BigNumber.make(100000));
		expect(subject.fee()).toEqual(BigNumber.make(1000));
		expect(subject.memo()).toBeUndefined();
	});
});
