import "jest-extended";
import nock from "nock";

import { ClientService } from "../../src/services/client";
import { TransactionData, WalletData } from "../../src/dto";

let subject: ClientService;

beforeEach(async () => (subject = await ClientService.construct({ peer: "https://btc-testnet.ark.io/" })));

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

describe("ClientService", function () {
	describe("#transaction", () => {
		it("should succeed", async () => {
			nock("https://blockchain.info")
				.get("/rawtx/b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da?format=json")
				.reply(200, require(`${__dirname}/../__fixtures__/client/transaction.json`));

			const result = await subject.transaction(
				"b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da",
			);

			expect(result).toBeInstanceOf(TransactionData);
		});
	});

	describe("#wallet", () => {
		it("should succeed", async () => {
			nock("https://blockchain.info")
				.get("/rawaddr/1AJbsFZ64EpEfS5UAjAfcUG8pH8Jn3rn1F")
				.reply(200, require(`${__dirname}/../__fixtures__/client/wallet.json`));

			const result = await subject.wallet("1AJbsFZ64EpEfS5UAjAfcUG8pH8Jn3rn1F");

			expect(result).toBeInstanceOf(WalletData);
		});
	});
});
