import "jest-extended";

import { Utils } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../../src/dto/transaction";
import fixtures from "../services/fixtures/responses";

describe("TransactionData", function () {
	it("should succeed", async () => {
		const result = new TransactionData(fixtures.getTransaction.payment);

		expect(result).toBeInstanceOf(TransactionData);
		expect(result.id()).toBe("F4AB442A6D4CBB935D66E1DA7309A5FC71C7143ED4049053EC14E3875B0CF9BF");
		// expect(result.type()).toBeUndefined();
		// expect(result.typeGroup()).toBeUndefined();
		expect(result.timestamp()).toBe(1363132610000);
		expect(result.confirmations()).toEqual(Utils.BigNumber.ZERO);
		expect(result.nonce()).toEqual(Utils.BigNumber.make(4));
		expect(result.sender()).toBe("r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59");
		expect(result.recipient()).toBe("rMH4UxPrbuMa1spCBR98hLLyNJp4d8p4tM");
		expect(result.amount()).toEqual(Utils.BigNumber.make(100000));
		expect(result.fee()).toEqual(Utils.BigNumber.make(1000));
		// expect(result.memo()).toBeUndefined();
	});
});
