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
			sender: "zil1ua64tlepq090nw8dttzxyaa9q5zths8w4m9qun",
			recipient: "zil1ua64tlepq090nw8dttzxyaa9q5zths8w4m9123",
			amount: "420690000000000",
			fee: "25",
			timestamp: "1970-01-01T00:00:00.000Z",
		},
		"",
	);
});

describe("SignedTransactionData", () => {
	test("#sender", () => {
		expect(subject.sender()).toEqual("zil1ua64tlepq090nw8dttzxyaa9q5zths8w4m9qun");
	});

	test("#recipient", () => {
		expect(subject.recipient()).toEqual("zil1ua64tlepq090nw8dttzxyaa9q5zths8w4m9123");
	});

	test("#amount", () => {
		expect(subject.amount().toHuman()).toEqual("420.69");
	});

	test("#fee", () => {
		expect(subject.fee().toString()).toEqual("25");
	});

	test("#timestamp", () => {
		expect(DateTime.make(0).isSame(subject.timestamp())).toBeTrue();
	});
});
