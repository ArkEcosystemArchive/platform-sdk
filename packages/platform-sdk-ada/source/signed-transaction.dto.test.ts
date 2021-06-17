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
			id: "3e3817fd0c35bc36674f3874c2953fa3e35877cbcdb44a08bdc6083dbd39d572",
			amount: "12500000000000000",
			fee: "0",
			timestamp: "1970-01-01T00:00:00.000Z",
			sender: "0208e6835a8f020cfad439c059b89addc1ce21f8cab0af6e6957e22d3720bff8a4",
			recipient: "D6Z26L69gdk9qYmTv5uzk3uGepigtHY4ax",
		},
		"",
	);
});

describe("SignedTransactionData", () => {
	test("#sender", () => {
		expect(subject.sender()).toEqual("0208e6835a8f020cfad439c059b89addc1ce21f8cab0af6e6957e22d3720bff8a4");
	});

	test("#recipient", () => {
		expect(subject.recipient()).toEqual("D6Z26L69gdk9qYmTv5uzk3uGepigtHY4ax");
	});

	test("#amount", () => {
		expect(subject.amount().toHuman()).toEqual(12500000000);
	});

	test("#fee", () => {
		expect(subject.fee().toNumber()).toEqual(0);
	});

	test("#timestamp", () => {
		expect(DateTime.make(0).isSame(subject.timestamp())).toBeTrue();
	});
});
