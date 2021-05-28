import "jest-extended";

import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import Fixture from "../../test/fixtures/client/transaction.json";
import { TransactionData } from "./transaction";

describe("TransactionData", () => {
	it("should succeed", async () => {
		const result = new TransactionData(Fixture);

		expect(result).toBeInstanceOf(TransactionData);
		expect(result.id()).toBe("B0DB35EADB3655E954A785B1ED0402222EF8C7061B22E52720AB1CE027ADBD11");
		expect(result.type()).toBe("transfer");
		expect(result.timestamp()).toBeInstanceOf(DateTime);
		expect(result.confirmations()).toEqual(BigNumber.ZERO);
		expect(result.sender()).toBe("cosmos1de7pk372jkp9vrul0gv5j6r3l9mt3wa6m4h6h0");
		expect(result.recipient()).toBe("cosmos14ddvyl5t0hzmknceuv3zzu5szuum4rkygpq5ln");
		expect(result.amount()).toEqual(BigNumber.make(10680));
		expect(result.fee()).toEqual(BigNumber.make(36875));
		expect(result.memo()).toBe("Hello World");
	});
});
