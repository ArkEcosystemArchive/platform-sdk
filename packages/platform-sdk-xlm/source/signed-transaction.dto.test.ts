import "jest-extended";

import { DateTime } from "@arkecosystem/platform-sdk-intl";

import { createService } from "../test/mocking";
import { SignedTransactionData } from "./signed-transaction.dto";

let subject: SignedTransactionData;

beforeEach(() => {
	subject = createService(SignedTransactionData);

	subject.configure(
		"3e3817fd0c35bc36674f3874c2953fa3e35877cbcdb44a08bdc6083dbd39d572",
		{
			_source: "0xdeadbeef",
			_operations: [
				{
					destination: "0xfoobar",
					amount: "1200000000",
				},
			],
			_fee: "6",
			created_at: "1970-01-01T00:00:00.000Z",
		},
		"",
	);
});

describe("SignedTransactionData", () => {
	test("#sender", () => {
		expect(subject.sender()).toEqual("0xdeadbeef");
	});

	test("#recipient", () => {
		expect(subject.recipient()).toEqual("0xfoobar");
	});

	test("#amount", () => {
		expect(subject.amount().toHuman()).toEqual(120);
	});

	test("#fee", () => {
		expect(subject.fee().toNumber()).toEqual(6);
	});

	test("#timestamp", () => {
		expect(DateTime.make(0).isSame(subject.timestamp())).toBeTrue();
	});
});
