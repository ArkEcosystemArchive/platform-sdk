import "jest-extended";

import { Test } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import nock from "nock";

import { createService } from "../../test/helpers";
import { container } from "../container";
import { SignedTransactionData, TransactionData, WalletData } from "../dto";
import { ClientService } from "./client";

let subject: ClientService;

beforeAll(() => {
	nock.disableNetConnect();

	subject = createService(ClientService, undefined, (container) => {
		container.constant(IoC.BindingType.Container, container);
		container.singleton(IoC.BindingType.DataTransferObjectService, DataTransferObjectService);
	});
});

beforeAll(() => {
	nock.disableNetConnect();

	Test.bindBigNumberService(container);
});

describe("ClientService", () => {
	describe("#transaction", () => {
		it("should succeed", async () => {
			nock("https://stargate.cosmos.network")
				.get("/txs/B0DB35EADB3655E954A785B1ED0402222EF8C7061B22E52720AB1CE027ADBD11")
				.reply(200, require(`${__dirname}/../../test/fixtures/client/transaction.json`));

			const result = await subject.transaction(
				"B0DB35EADB3655E954A785B1ED0402222EF8C7061B22E52720AB1CE027ADBD11",
			);

			expect(result).toBeInstanceOf(TransactionData);
			expect(result.id()).toBe("B0DB35EADB3655E954A785B1ED0402222EF8C7061B22E52720AB1CE027ADBD11");
			expect(result.type()).toBe("transfer");
			expect(result.timestamp()).toBeInstanceOf(DateTime);
			expect(result.confirmations()).toEqual(BigNumber.ZERO);
			expect(result.sender()).toBe("cosmos1de7pk372jkp9vrul0gv5j6r3l9mt3wa6m4h6h0");
			expect(result.recipient()).toBe("cosmos14ddvyl5t0hzmknceuv3zzu5szuum4rkygpq5ln");
			expect(result.amount()).toEqual(BigNumber.make(10680));
			expect(result.fee()).toEqual(BigNumber.make(36875));
			// @ts-ignore - Better types so that memo gets detected on TransactionDataType
			expect(result.memo()).toBe("Hello World");
		});
	});

	describe("#transactions", () => {
		it("should succeed", async () => {
			nock("https://stargate.cosmos.network")
				.get(
					"/txs?message.action=send&message.sender=cosmos1de7pk372jkp9vrul0gv5j6r3l9mt3wa6m4h6h0&page=1&limit=100",
				)
				.reply(200, require(`${__dirname}/../../test/fixtures/client/transactions.json`));

			const result = await subject.transactions({ address: "cosmos1de7pk372jkp9vrul0gv5j6r3l9mt3wa6m4h6h0" });

			expect(result).toBeObject();
			expect(result.items()[0]).toBeInstanceOf(TransactionData);
			expect(result.items()[0].id()).toBe("B0DB35EADB3655E954A785B1ED0402222EF8C7061B22E52720AB1CE027ADBD11");
			expect(result.items()[0].type()).toBe("transfer");
			expect(result.items()[0].timestamp()).toBeInstanceOf(DateTime);
			expect(result.items()[0].confirmations()).toEqual(BigNumber.ZERO);
			expect(result.items()[0].sender()).toBe("cosmos1de7pk372jkp9vrul0gv5j6r3l9mt3wa6m4h6h0");
			expect(result.items()[0].recipient()).toBe("cosmos14ddvyl5t0hzmknceuv3zzu5szuum4rkygpq5ln");
			expect(result.items()[0].amount()).toEqual(BigNumber.make(10680));
			expect(result.items()[0].fee()).toEqual(BigNumber.make(36875));
			// @ts-ignore - Better types so that memo gets detected on TransactionDataType
			expect(result.items()[0].memo()).toBe("Hello World");
		});
	});

	describe("#wallet", () => {
		it("should succeed", async () => {
			nock("https://stargate.cosmos.network")
				.get("/auth/accounts/cosmos1de7pk372jkp9vrul0gv5j6r3l9mt3wa6m4h6h0")
				.reply(200, require(`${__dirname}/../../test/fixtures/client/wallet.json`))
				.get("/bank/balances/cosmos1de7pk372jkp9vrul0gv5j6r3l9mt3wa6m4h6h0")
				.reply(200, require(`${__dirname}/../../test/fixtures/client/wallet.json`));

			const result = await subject.wallet("cosmos1de7pk372jkp9vrul0gv5j6r3l9mt3wa6m4h6h0");

			expect(result).toBeInstanceOf(WalletData);
			expect(result.address()).toBe("cosmos1de7pk372jkp9vrul0gv5j6r3l9mt3wa6m4h6h0");
			expect(result.publicKey()).toBe("Ap65s+Jdgo8BtvTbkc7GyUti8yJ7RpZ7cE1zCuKgNeXY");
			expect(result.balance().available).toEqual(BigNumber.make(22019458509));
			expect(result.nonce()).toEqual(BigNumber.make(24242));
		});
	});

	describe("#broadcast", () => {
		const transactionPayload = new SignedTransactionData(
			"id",
			{
				msg: [
					{
						type: "cosmos-sdk/MsgSend",
						value: {
							amount: [{ amount: 1, denom: "umuon" }],
							from_address: "cosmos1pnc559thh9ks4crsp5p3wta2f2m09t4gluyl2l",
							to_address: "cosmos1xvt4e7xd0j9dwv2w83g50tpcltsl90h52003e2",
						},
					},
				],
				fee: { amount: [{ amount: 5000, denom: "umuon" }], gas: "200000" },
				signatures: [
					{
						signature:
							"naiy71Wa8hPC8wMj2/J4CwnqtR8RThv9Cy3y1EGJVowVtDWJQoUmy3KfYneA2wwLQUlgI/UWgNMClCzbJdD8Ew==",
						account_number: "58976",
						sequence: "16",
						pub_key: {
							type: "tendermint/PubKeySecp256k1",
							value: "A1wiLscFDRRdEuWx5WmXbXVbMszN2cBHaJFWfJm399Yy",
						},
					},
				],
				memo: "",
			},
			"",
		);

		it("should pass", async () => {
			nock("https://stargate.cosmos.network")
				.post("/txs")
				.reply(200, require(`${__dirname}/../../test/fixtures/client/broadcast.json`));

			const result = await subject.broadcast([transactionPayload]);

			expect(result).toEqual({
				accepted: ["25E82BD7E457147DA29FD39E6C155365F07559A7834C7FBB4E9B21DE6A65BFC7"],
				rejected: [],
				errors: {},
			});
		});

		it("should fail", async () => {
			nock("https://stargate.cosmos.network")
				.post("/txs")
				.reply(200, require(`${__dirname}/../../test/fixtures/client/broadcast-failure.json`));

			const result = await subject.broadcast([transactionPayload]);

			expect(result).toEqual({
				accepted: [],
				rejected: ["535C0F6E94506C2D579CCAC76A155472394062FD2D712C662745D93E951164FB"],
				errors: {
					"535C0F6E94506C2D579CCAC76A155472394062FD2D712C662745D93E951164FB": ["ERR_INSUFFICIENT_FUNDS"],
				},
			});
		});
	});
});
