import "jest-extended";

import { BigNumber } from "@arkecosystem/platform-sdk-support";

import Fixture from "../../test/fixtures/client/transaction.json";
import { createService } from "../../test/helpers";
import { TransactionData } from "./transaction";

let subject: TransactionData;

beforeEach(() => {
	subject = createService(TransactionData);
	subject.configure(Fixture);
});

describe("TransactionData", () => {
	test("#id", () => {
		expect(subject.id()).toBe("0xf6ad7f16653a2070f36c5f9c243acb30109da76658b54712745136d8e8236eae");
	});

	test("#type", () => {
		expect(subject.type()).toBe("transfer");
	});

	test("#timestamp", () => {
		expect(subject.timestamp()).toBeUndefined();
	});

	test("#confirmations", () => {
		expect(subject.confirmations()).toEqual(BigNumber.ZERO);
	});

	test("#sender", () => {
		expect(subject.sender()).toBe("0xac1a0f50604c430c25a9fa52078f7f7ec9523519");
	});

	test("#recipient", () => {
		expect(subject.recipient()).toBe("0xb5663d3a23706eb4537ffea78f56948a53ac2ebe");
	});

	test("#amount", () => {
		expect(subject.amount().toString()).toBe("10000000000000000000");
	});

	test("#fee", () => {
		expect(subject.fee().toString()).toBe("28000");
	});

	test("#memo", () => {
		expect(subject.memo()).toBeUndefined();
	});

	test("#toObject", () => {
		expect(subject.toObject()).toBeObject();
	});

	test("#raw", () => {
		expect(subject.raw()).toEqual(Fixture);
	});
});
