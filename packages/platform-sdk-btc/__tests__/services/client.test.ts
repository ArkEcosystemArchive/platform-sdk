import "jest-extended";
import { Utils } from "@arkecosystem/platform-sdk";
import nock from "nock";

import { ClientService } from "../../src/services/client";
import { TransactionData, WalletData } from "../../src/dto";

let subject: ClientService;

beforeEach(async () => (subject = await ClientService.construct({ peer: "https://coins.com/api/btc" })));

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

describe("ClientService", function () {
	describe("#transaction", () => {
		it("should succeed", async () => {
			nock("https://coins.com/api/btc")
				.get("/api/btc/transactions/68ad0264053ab94fa7749e78d2f728911d166ca9af8dbb68e6ee264958ca7f32")
				.reply(200, require(`${__dirname}/../__fixtures__/client/transaction.json`));

			const result = await subject.transaction(
				"68ad0264053ab94fa7749e78d2f728911d166ca9af8dbb68e6ee264958ca7f32",
			);

			expect(result).toBeInstanceOf(TransactionData);
			expect(result.id()).toBe("68ad0264053ab94fa7749e78d2f728911d166ca9af8dbb68e6ee264958ca7f32");
			expect(result.type()).toBeUndefined();
			expect(result.typeGroup()).toBeUndefined();
			expect(result.timestamp()).toBe(1561095453000);
			expect(result.confirmations()).toEqual(Utils.BigNumber.make(159414));
			// expect(result.sender()).toBe("...");
			// expect(result.recipient()).toBe("...");
			expect(result.amount()).toEqual(Utils.BigNumber.make(3050000));
			expect(result.fee()).toEqual(Utils.BigNumber.make(10000));
			expect(result.memo()).toBeUndefined();
		});
	});

	describe("#wallet", () => {
		it("should succeed", async () => {
			nock("https://coins.com/api/btc")
				.get("/api/btc/wallets/my48EN4kDnGEpRZMBfiDS65wdfwfgCGZRz")
				.reply(200, require(`${__dirname}/../__fixtures__/client/wallet.json`));

			const result = await subject.wallet("my48EN4kDnGEpRZMBfiDS65wdfwfgCGZRz");

			expect(result).toBeInstanceOf(WalletData);
			expect(result.address()).toBe("my48EN4kDnGEpRZMBfiDS65wdfwfgCGZRz");
			expect(result.publicKey()).toBe("76a914c05f53de525d80151e209a729cf1c7909c88f88e88ac");
			expect(result.balance()).toEqual(Utils.BigNumber.make(3050000));
		});
	});

	describe("#broadcast", () => {
		it("should pass", async () => {
			nock("https://coins.com/api/btc")
				.post("/transactions")
				.reply(200, require(`${__dirname}/../__fixtures__/client/broadcast.json`));

			const result = await subject.broadcast(["transactionPayload"]);

			expect(result).toEqual({
				accepted: ["transactionPayload"],
				rejected: [],
				errors: {},
			});
		});

		it("should fail", async () => {
			nock("https://coins.com/api/btc")
				.post("/transactions")
				.reply(200, require(`${__dirname}/../__fixtures__/client/broadcast-failure.json`));

			const result = await subject.broadcast(["transactionPayload"]);

			expect(result).toEqual({
				accepted: [],
				rejected: ["transactionPayload"],
				errors: {
					transactionPayload: ["ERR_IN_BELOWOUT"],
				},
			});
		});
	});
});
