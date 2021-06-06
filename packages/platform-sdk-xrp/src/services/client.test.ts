import "jest-extended";

import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import nock from "nock";

import { SignedTransactionData, TransactionData, WalletData } from "../dto";
import { ClientService } from "./client";
import { createService } from "../../test/helpers";
import { IoC } from "@arkecosystem/platform-sdk";
import { DataTransferObjectService } from "./data-transfer-object";

let subject: ClientService;

jest.setTimeout(30000);

beforeAll(async () => {
	subject = createService(ClientService, undefined, (container) => {
		container.constant(IoC.BindingType.Container, container);
		container.singleton(IoC.BindingType.DataTransferObjectService, DataTransferObjectService);
	});
});

afterEach(() => nock.cleanAll());

describe("ClientService", () => {
	describe("#transaction", () => {
		it("should succeed", async () => {
			nock(/.+/)
				.post("/")
				.reply(200, require(`${__dirname}/../../test/fixtures/client/transaction.json`));

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

	describe("#transactions", () => {
		it("should succeed", async () => {
			nock(/.+/)
				.post("/")
				.reply(200, require(`${__dirname}/../../test/fixtures/client/transactions.json`));

			const result = await subject.transactions({
				address: "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
				limit: 10,
			});

			expect(result).toBeObject();
			expect(result.items()[0]).toBeInstanceOf(TransactionData);
			expect(result.items()[0].id()).toBe("08EF5BDA2825D7A28099219621CDBECCDECB828FEA202DEB6C7ACD5222D36C2C");
			expect(result.items()[0].type()).toBe("transfer");
			expect(result.items()[0].timestamp()).toBeInstanceOf(DateTime);
			expect(result.items()[0].confirmations()).toEqual(BigNumber.ZERO);
			expect(result.items()[0].sender()).toBe("rLNaPoKeeBjZe2qs6x52yVPZpZ8td4dc6w");
			expect(result.items()[0].recipient()).toBe("raLPjTYeGezfdb6crXZzcC8RkLBEwbBHJ5");
			expect(result.items()[0].amount()).toEqual(BigNumber.make(100000));
			expect(result.items()[0].fee()).toEqual(BigNumber.make(1000));
		});
	});

	describe("#wallet", () => {
		it("should succeed", async () => {
			nock(/.+/)
				.post("/")
				.reply(200, require(`${__dirname}/../../test/fixtures/client/wallet.json`));

			const result = await subject.wallet("r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59");

			expect(result).toBeInstanceOf(WalletData);
			expect(result.address()).toEqual("r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59");
			expect(result.publicKey()).toBeUndefined();
			expect(result.balance().available).toEqual(BigNumber.make("92291324300"));
		});
	});

	describe("#broadcast", () => {
		const transactionPayload = createService(SignedTransactionData).configure(
			"id",
			"12000322000000002400000017201B0086955468400000000000000C732102F89EAEC7667B30F33D0687BBA86C3FE2A08CCA40A9186C5BDE2DAA6FA97A37D87446304402207660BDEF67105CE1EBA9AD35DC7156BAB43FF1D47633199EE257D70B6B9AAFBF02207F5517BC8AEF2ADC1325897ECDBA8C673838048BCA62F4E98B252F19BE88796D770A726970706C652E636F6D81144FBFF73DA4ECF9B701940F27341FA8020C313443",
			"12000322000000002400000017201B0086955468400000000000000C732102F89EAEC7667B30F33D0687BBA86C3FE2A08CCA40A9186C5BDE2DAA6FA97A37D87446304402207660BDEF67105CE1EBA9AD35DC7156BAB43FF1D47633199EE257D70B6B9AAFBF02207F5517BC8AEF2ADC1325897ECDBA8C673838048BCA62F4E98B252F19BE88796D770A726970706C652E636F6D81144FBFF73DA4ECF9B701940F27341FA8020C313443",
		);

		it("should pass", async () => {
			nock(/.+/)
				.post("/")
				.reply(200, require(`${__dirname}/../../test/fixtures/client/broadcast.json`));

			const result = await subject.broadcast([transactionPayload]);

			expect(result).toEqual({
				accepted: ["2B6928A583A9D14D359E471EB8D8F961CBC1A054EF86845A39790A7912147CD2"],
				rejected: [],
				errors: {},
			});
		});

		it("should fail", async () => {
			nock(/.+/)
				.post("/")
				.reply(200, require(`${__dirname}/../../test/fixtures/client/broadcast-failure.json`));

			const result = await subject.broadcast([transactionPayload]);

			expect(result).toEqual({
				accepted: [],
				rejected: [transactionPayload.id()],
				errors: {
					[transactionPayload.id()]: ["ERR_UNFUNDED_PAYMENT"],
				},
			});
		});
	});
});
