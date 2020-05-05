import "jest-extended";

import { BigNumber } from "@arkecosystem/utils";
import nock from "nock";

import { ClientService } from "../../src/services/client";
import { TransactionService } from "../../src/services/transaction";
import { IdentityService } from "../../src/services/identity";
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
			expect(result.confirmations()).toEqual(BigNumber.ZERO);
			expect(result.nonce()).toBeUndefined();
			expect(result.sender()).toBe("cosmos1de7pk372jkp9vrul0gv5j6r3l9mt3wa6m4h6h0");
			expect(result.recipient()).toBe("cosmos14ddvyl5t0hzmknceuv3zzu5szuum4rkygpq5ln");
			expect(result.amount()).toEqual(BigNumber.make(10680));
			expect(result.fee()).toEqual(BigNumber.make(36875));
			expect(result.memo()).toBe("Hello World");
			expect(result.blockId()).toBe("14990");
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
			expect(result.data[0].confirmations()).toEqual(BigNumber.ZERO);
			expect(result.data[0].nonce()).toBeUndefined();
			expect(result.data[0].sender()).toBe("cosmos1de7pk372jkp9vrul0gv5j6r3l9mt3wa6m4h6h0");
			expect(result.data[0].recipient()).toBe("cosmos14ddvyl5t0hzmknceuv3zzu5szuum4rkygpq5ln");
			expect(result.data[0].amount()).toEqual(BigNumber.make(10680));
			expect(result.data[0].fee()).toEqual(BigNumber.make(36875));
			expect(result.data[0].memo()).toBe("Hello World");
			expect(result.data[0].blockId()).toBe("14990");
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
			expect(result.balance()).toEqual(BigNumber.make(69519574));
			expect(result.nonce()).toEqual(BigNumber.make(24242));
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
});
