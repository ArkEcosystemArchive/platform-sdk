import "jest-extended";

import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

// import fixtures from "../../test/fixtures/services/rippled";
import { createConfig } from "../../test/helpers";
import { SignedTransactionData, TransactionData, WalletData } from "../dto";
import { ClientService } from "./client";

let subject: ClientService;

jest.setTimeout(30000);

beforeAll(async () => {
	subject = await ClientService.__construct(createConfig());
});

describe("ClientService", function () {
	describe("#transaction", () => {
		it("should succeed", async () => {
			const result = await subject.transaction(
				"F4AB442A6D4CBB935D66E1DA7309A5FC71C7143ED4049053EC14E3875B0CF9BF",
			);

			expect(result).toBeInstanceOf(TransactionData);
			expect(result.id()).toBe("F4AB442A6D4CBB935D66E1DA7309A5FC71C7143ED4049053EC14E3875B0CF9BF");
			expect(result.type()).toBe("transfer");
			expect(result.timestamp()).toBeInstanceOf(DateTime);
			expect(result.confirmations()).toEqual(BigNumber.ZERO);
			expect(result.sender()).toBe("r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59");
			expect(result.recipient()).toBe("r3PDtZSa5LiYp1Ysn1vMuMzB59RzV3W9QH");
			expect(result.amount()).toEqual(BigNumber.make(100000));
			expect(result.fee()).toEqual(BigNumber.make(1000));
			// @ts-ignore - Better types so that memo gets detected on TransactionDataType
			expect(result.memo()).toBeUndefined();
		});
	});

	describe.only("#transactions", () => {
		it("should succeed", async () => {
			const result = await subject.transactions({
				address: "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
				limit: 10,
			});

			expect(result).toBeObject();
			expect(result.items()[0]).toBeInstanceOf(TransactionData);
			expect(result.items()[0].id()).toBe("99404A34E8170319521223A6C604AF48B9F1E3000C377E6141F9A1BF60B0B865");
			expect(result.items()[0].type()).toBe("transfer");
			expect(result.items()[0].timestamp()).toBeUndefined();
			expect(result.items()[0].confirmations()).toEqual(BigNumber.ZERO);
			expect(result.items()[0].sender()).toBe("r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59");
			expect(result.items()[0].recipient()).toBe("rMH4UxPrbuMa1spCBR98hLLyNJp4d8p4tM");
			expect(result.items()[0].amount()).toEqual(BigNumber.make(100000));
			expect(result.items()[0].fee()).toEqual(BigNumber.make(1000));
			// @ts-ignore - Better types so that memo gets detected on TransactionDataType
			expect(result.items()[0].memo()).toBeUndefined();
		});
	});

	describe("#wallet", () => {
		it("should succeed", async () => {
			const result = await subject.wallet("r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59");

			expect(result).toBeInstanceOf(WalletData);
			expect(result.address()).toEqual("r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59");
			// expect(result.publicKey()).toBeUndefined();
			expect(result.balance().available).toEqual(BigNumber.make("92291324300"));
		});
	});

	// describe("#broadcast", () => {
	// 	const transactionPayload = new SignedTransactionData(
	// 		"id",
	// 		"12000322000000002400000017201B0086955468400000000000000C732102F89EAEC7667B30F33D0687BBA86C3FE2A08CCA40A9186C5BDE2DAA6FA97A37D87446304402207660BDEF67105CE1EBA9AD35DC7156BAB43FF1D47633199EE257D70B6B9AAFBF02207F5517BC8AEF2ADC1325897ECDBA8C673838048BCA62F4E98B252F19BE88796D770A726970706C652E636F6D81144FBFF73DA4ECF9B701940F27341FA8020C313443",
	// 		"12000322000000002400000017201B0086955468400000000000000C732102F89EAEC7667B30F33D0687BBA86C3FE2A08CCA40A9186C5BDE2DAA6FA97A37D87446304402207660BDEF67105CE1EBA9AD35DC7156BAB43FF1D47633199EE257D70B6B9AAFBF02207F5517BC8AEF2ADC1325897ECDBA8C673838048BCA62F4E98B252F19BE88796D770A726970706C652E636F6D81144FBFF73DA4ECF9B701940F27341FA8020C313443",
	// 	);

	// 	it("should pass", async () => {
	// 		const result = await subject.broadcast([transactionPayload]);

	// 		expect(result).toEqual({
	// 			accepted: ["4D5D90890F8D49519E4151938601EF3D0B30B16CD6A519D9C99102C9FA77F7E0"],
	// 			rejected: [],
	// 			errors: {},
	// 		});
	// 	});

	// 	it("should fail", async () => {
	// 		const result = await subject.broadcast([transactionPayload]);

	// 		expect(result).toEqual({
	// 			accepted: [],
	// 			rejected: [transactionPayload.id()],
	// 			errors: {
	// 				[transactionPayload.id()]: ["ERR_BAD_FEE"],
	// 			},
	// 		});
	// 	});
	// });
});
