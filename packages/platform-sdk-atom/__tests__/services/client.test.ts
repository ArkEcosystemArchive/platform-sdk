import "jest-extended";

import { Utils } from "@arkecosystem/platform-sdk";
import nock from "nock";

import { ClientService } from "../../src/services/client";
import { TransactionData, WalletData } from "../../src/dto";

let subject: ClientService;

beforeEach(async () => (subject = await ClientService.construct({ peer: "https://stargate.cosmos.network" })));

beforeAll(() => nock.disableNetConnect());

describe("ClientService", function () {
	describe("#transaction", () => {
		it("should succeed", async () => {
			nock("https://stargate.cosmos.network")
				.get("/txs/B0DB35EADB3655E954A785B1ED0402222EF8C7061B22E52720AB1CE027ADBD11")
				.reply(200, require(`${__dirname}/../__fixtures__/client/transaction.json`));

			const result = await subject.transaction(
				"B0DB35EADB3655E954A785B1ED0402222EF8C7061B22E52720AB1CE027ADBD11",
			);

			expect(result).toBeInstanceOf(TransactionData);
			expect(result.id()).toBe("B0DB35EADB3655E954A785B1ED0402222EF8C7061B22E52720AB1CE027ADBD11");
			expect(result.type()).toBeUndefined();
			expect(result.typeGroup()).toBeUndefined();
			expect(result.timestamp()).toBe(1576957341000);
			expect(result.confirmations()).toEqual(Utils.BigNumber.ZERO);
			expect(result.nonce()).toEqual(Utils.BigNumber.ZERO);
			expect(result.sender()).toBe("cosmos1de7pk372jkp9vrul0gv5j6r3l9mt3wa6m4h6h0");
			expect(result.recipient()).toBe("cosmos14ddvyl5t0hzmknceuv3zzu5szuum4rkygpq5ln");
			expect(result.amount()).toEqual(Utils.BigNumber.make(10680));
			expect(result.fee()).toEqual(Utils.BigNumber.make(36875));
			expect(result.memo()).toBe("Hello World");
		});
	});

	describe("#transactions", () => {
		it("should succeed", async () => {
			nock("https://stargate.cosmos.network")
				.get(
					"/txs?message.action=send&message.sender=cosmos1de7pk372jkp9vrul0gv5j6r3l9mt3wa6m4h6h0&page=1&limit=100",
				)
				.reply(200, require(`${__dirname}/../__fixtures__/client/transactions.json`));

			const result = await subject.transactions({ address: "cosmos1de7pk372jkp9vrul0gv5j6r3l9mt3wa6m4h6h0" });

			expect(result.data).toBeArray();
			expect(result.data[0]).toBeInstanceOf(TransactionData);
			expect(result.data[0].id()).toBe("B0DB35EADB3655E954A785B1ED0402222EF8C7061B22E52720AB1CE027ADBD11");
			expect(result.data[0].type()).toBeUndefined();
			expect(result.data[0].typeGroup()).toBeUndefined();
			expect(result.data[0].timestamp()).toBe(1576957341000);
			expect(result.data[0].confirmations()).toEqual(Utils.BigNumber.ZERO);
			expect(result.data[0].nonce()).toEqual(Utils.BigNumber.ZERO);
			expect(result.data[0].sender()).toBe("cosmos1de7pk372jkp9vrul0gv5j6r3l9mt3wa6m4h6h0");
			expect(result.data[0].recipient()).toBe("cosmos14ddvyl5t0hzmknceuv3zzu5szuum4rkygpq5ln");
			expect(result.data[0].amount()).toEqual(Utils.BigNumber.make(10680));
			expect(result.data[0].fee()).toEqual(Utils.BigNumber.make(36875));
			expect(result.data[0].memo()).toBe("Hello World");
		});
	});

	describe("#wallet", () => {
		it("should succeed", async () => {
			nock("https://stargate.cosmos.network")
				.get("/auth/accounts/cosmos1de7pk372jkp9vrul0gv5j6r3l9mt3wa6m4h6h0")
				.reply(200, require(`${__dirname}/../__fixtures__/client/wallet.json`));

			const result = await subject.wallet("cosmos1de7pk372jkp9vrul0gv5j6r3l9mt3wa6m4h6h0");

			expect(result).toBeInstanceOf(WalletData);
			expect(result.address()).toBe("cosmos1de7pk372jkp9vrul0gv5j6r3l9mt3wa6m4h6h0");
			expect(result.publicKey()).toBe("Ap65s+Jdgo8BtvTbkc7GyUti8yJ7RpZ7cE1zCuKgNeXY");
			expect(result.balance()).toEqual(Utils.BigNumber.make(69519574));
			expect(result.nonce()).toEqual(Utils.BigNumber.make(24242));
		});
	});

	describe("#syncing", () => {
		it("should succeed", async () => {
			nock("https://stargate.cosmos.network")
				.get("/syncing")
				.reply(200, require(`${__dirname}/../__fixtures__/client/syncing.json`));

			const result = await subject.syncing();

			expect(result).toBeBoolean();
		});
	});

	describe("#broadcast", () => {
		const transactionPayload = {
			msg: [
				{
					type: "cosmos-sdk/MsgSend",
					value: {
						amount: [{ amount: "1", denom: "umuon" }],
						from_address: "cosmos1pnc559thh9ks4crsp5p3wta2f2m09t4gluyl2l",
						to_address: "cosmos1xvt4e7xd0j9dwv2w83g50tpcltsl90h52003e2",
					},
				},
			],
			fee: { amount: [{ amount: "5000", denom: "umuon" }], gas: "200000" },
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
		};

		it("should pass", async () => {
			nock("https://stargate.cosmos.network")
				.post("/txs")
				.reply(200, require(`${__dirname}/../__fixtures__/client/broadcast.json`));

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
				.reply(200, require(`${__dirname}/../__fixtures__/client/broadcast-failure.json`));

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
