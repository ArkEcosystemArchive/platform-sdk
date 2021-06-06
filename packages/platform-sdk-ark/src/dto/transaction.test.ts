import "jest-extended";

import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import Fixture from "../../test/fixtures/client/transaction.json";
import { TransactionData } from "./transaction";

let subject: TransactionData;

beforeEach(() => {
	subject = new TransactionData(Fixture.data);
});

describe("TransactionData", () => {
	test("#id", () => {
		expect(subject.id()).toBe("3e3817fd0c35bc36674f3874c2953fa3e35877cbcdb44a08bdc6083dbd39d572");
	});

	test("#type", () => {
		expect(subject.type()).toBe("transfer");
	});

	test("#timestamp", () => {
		expect(subject.timestamp()).toBeInstanceOf(DateTime);
		expect(subject.timestamp()?.toUNIX()).toBe(Fixture.data.timestamp.unix);
		expect(subject.timestamp()?.toISOString()).toBe(Fixture.data.timestamp.human);
	});

	test("#confirmations", () => {
		expect(subject.confirmations()).toEqual(BigNumber.make(4636121));
	});

	test("#sender", () => {
		expect(subject.sender()).toBe("DLK7ts2DpkbeBjFamuFtHLoDAq5upDhCmf");
	});

	test("#recipient", () => {
		expect(subject.recipient()).toBe("D6Z26L69gdk9qYmTv5uzk3uGepigtHY4ax");
	});

	test("#amount", () => {
		expect(subject.amount()).toEqual(BigNumber.make("12500000000000000"));
	});

	test("#fee", () => {
		expect(subject.fee()).toEqual(BigNumber.ZERO);
	});

	test("#toObject", () => {
		expect(subject.toObject()).toBeObject();
	});

	test("#raw", () => {
		expect(subject.raw()).toEqual(Fixture.data);
	});
});
