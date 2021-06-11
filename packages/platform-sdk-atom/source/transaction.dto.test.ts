import "jest-extended";

import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import Fixture from "../test/fixtures/client/transaction.json";
import { createService } from "../test/mocking";
import { TransactionData } from "./transaction.dto";

let subject: TransactionData;

beforeEach(() => {
	subject = createService(TransactionData);
	subject.configure(Fixture);
});

describe("TransactionData", () => {
	it("should succeed", async () => {
		expect(subject).toBeInstanceOf(TransactionData);
		expect(subject.id()).toBe("B0DB35EADB3655E954A785B1ED0402222EF8C7061B22E52720AB1CE027ADBD11");
		expect(subject.type()).toBe("transfer");
		expect(subject.timestamp()).toBeInstanceOf(DateTime);
		expect(subject.confirmations()).toEqual(BigNumber.ZERO);
		expect(subject.sender()).toBe("cosmos1de7pk372jkp9vrul0gv5j6r3l9mt3wa6m4h6h0");
		expect(subject.recipient()).toBe("cosmos14ddvyl5t0hzmknceuv3zzu5szuum4rkygpq5ln");
		expect(subject.amount()).toEqual(BigNumber.make(10680));
		expect(subject.fee()).toEqual(BigNumber.make(36875));
		expect(subject.memo()).toBe("Hello World");
	});
});
