import "jest-extended";

import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { TransactionData } from "./transaction";
import Fixture from "../../test/fixtures/client/transaction.json";

let subject: TransactionData;

beforeEach(() => (subject = new TransactionData(Fixture)));

describe("TransactionData", function () {
	test("#id", () => {
		expect(subject.id()).toBe("0x35a28a5b1785d3729afc809851466fcc9971d09922196a1ca6d155756c222435");
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
		expect(subject.sender()).toBe("0x4581A610f96878266008993475F1476cA9997081");
	});

	test("#recipient", () => {
		expect(subject.recipient()).toBe("0x230b2A8C0CcE28fd6eFF491c47aeBa244b10A12c");
	});

	test("#amount", () => {
		expect(subject.amount()).toEqual(BigNumber.make("79000000000000"));
	});

	test("#fee", () => {
		expect(subject.fee()).toEqual(BigNumber.make("21000"));
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
