import "jest-extended";

import { Exceptions } from "@arkecosystem/platform-sdk";

import { createService } from "../test/mocking";
import { SignedTransactionData } from "./signed-transaction.dto";

let subject: SignedTransactionData;

beforeEach(() => {
	subject = createService(SignedTransactionData);

	subject.configure(
		"3e3817fd0c35bc36674f3874c2953fa3e35877cbcdb44a08bdc6083dbd39d572",
		{
			timestamp: "1970-01-01T00:00:00.000Z",
		},
		"",
	);
});

describe("SignedTransactionData", () => {
	test("#sender", () => {
		expect(() => subject.sender()).toThrowError(Exceptions.NotImplemented);
	});

	test("#recipient", () => {
		expect(() => subject.recipient()).toThrowError(Exceptions.NotImplemented);
	});

	test("#amount", () => {
		expect(() => subject.amount()).toThrowError(Exceptions.NotImplemented);
	});

	test("#fee", () => {
		expect(() => subject.fee()).toThrowError(Exceptions.NotImplemented);
	});

	test("#timestamp", () => {
		expect(() => subject.timestamp()).toThrowError(Exceptions.NotImplemented);
	});
});
