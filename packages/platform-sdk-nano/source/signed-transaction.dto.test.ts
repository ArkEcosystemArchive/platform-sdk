import "jest-extended";

import { DateTime } from "@arkecosystem/platform-sdk-intl";

import { createService } from "../test/mocking";
import { SignedTransactionData } from "./signed-transaction.dto";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

let subject: SignedTransactionData;

beforeEach(() => {
	subject = createService(SignedTransactionData);

	subject.configure(
		"3e3817fd0c35bc36674f3874c2953fa3e35877cbcdb44a08bdc6083dbd39d572",
		{
			fromAddress: "123456",
			toAddress: "456789",
			amountRaw: "420690000000000000000000000000000",
			timestamp: "1970-01-01T00:00:00.000Z",
		},
		"",
	);
});

describe("SignedTransactionData", () => {
	test("#sender", () => {
		expect(subject.sender()).toEqual("123456");
	});

	test("#recipient", () => {
		expect(subject.recipient()).toEqual("456789");
	});

	test("#amount", () => {
		expect(subject.amount().toHuman()).toEqual("420.69");
	});

	test("#fee", () => {
		expect(subject.fee()).toEqual(BigNumber.ZERO);
	});

	test("#timestamp", () => {
		expect(DateTime.make(0).isSame(subject.timestamp())).toBeTrue();
	});
});
