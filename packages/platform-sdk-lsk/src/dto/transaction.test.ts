import "jest-extended";

import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import Fixture from "../../test/fixtures/client/transaction.json";
import { TransactionData } from "./transaction";

let subject: TransactionData;

beforeEach(() => (subject = new TransactionData(Fixture.data[0])));

describe("TransactionData", function () {
	test("#id", () => {
		expect(subject.id()).toBe("15210966682544220710");
	});

	test("#type", () => {
		expect(subject.type()).toBe("transfer");
	});

	test("#timestamp", () => {
		expect(subject.timestamp()).toBeInstanceOf(DateTime);
		expect(subject.timestamp()?.toUNIX()).toBe(1585295194);
		expect(subject.timestamp()?.toISOString()).toBe("2020-03-27T07:46:34.000Z");
	});

	test("#confirmations", () => {
		expect(subject.confirmations()).toEqual(BigNumber.make(35754));
	});

	test("#sender", () => {
		expect(subject.sender()).toBe("1a3aec07d0ff815c910d4c707a66b58a692dacb3de9d7d95a085bcee93738a07");
	});

	test("#recipient", () => {
		expect(subject.recipient()).toBe("18218254863282357638L");
	});

	test("#recipients", () => {
		expect(subject.recipients()).toHaveLength(1);
		expect(subject.recipients()[0].address).toBe("18218254863282357638L");
	});

	test("#amount", () => {
		expect(subject.amount()).toEqual(BigNumber.make("1"));
	});

	test("#fee", () => {
		expect(subject.fee()).toEqual(BigNumber.make("10000000"));
	});

	test("#memo", () => {
		expect(subject.memo()).toBe("Account initialization");
	});

	test("#toObject", () => {
		expect(subject.toObject()).toBeObject();
	});

	test("#raw", () => {
		expect(subject.raw()).toEqual(Fixture.data[0]);
	});
});
