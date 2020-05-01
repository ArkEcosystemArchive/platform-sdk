import "jest-extended";
import nock from "nock";

import { ClientService } from "../../src/services/client";
import { DelegateData, TransactionData, WalletData } from "../../src/dto";

let subject: ClientService;

beforeEach(async () => (subject = await ClientService.construct({ peer: "https://betanet.lisk.io:443" })));

beforeAll(() => nock.disableNetConnect());

describe("ClientService", function () {
	describe("#transaction", () => {
		it("should succeed", async () => {
			nock("https://betanet.lisk.io:443")
				.get("/api/transactions?id=15562133894377717094")
				.reply(200, require(`${__dirname}/../__fixtures__/client/transaction.json`));

			const result = await subject.transaction("15562133894377717094");

			expect(result).toBeInstanceOf(TransactionData);
		});
	});

	describe("#transactions", () => {
		it("should succeed", async () => {
			nock("https://betanet.lisk.io:443")
				.get("/api/transactions")
				.reply(200, require(`${__dirname}/../__fixtures__/client/transactions.json`));

			const result = await subject.transactions();

			expect(result.data).toBeArray();
			expect(result.data[0]).toBeInstanceOf(TransactionData);
		});
	});

	describe("#wallet", () => {
		it("should succeed", async () => {
			nock("https://betanet.lisk.io:443")
				.get("/api/accounts?address=6566229458323231555L")
				.reply(200, require(`${__dirname}/../__fixtures__/client/wallet.json`));

			const result = await subject.wallet("6566229458323231555L");

			expect(result).toBeInstanceOf(WalletData);
		});
	});

	describe("#wallets", () => {
		it("should succeed", async () => {
			nock("https://betanet.lisk.io:443")
				.get("/api/accounts")
				.reply(200, require(`${__dirname}/../__fixtures__/client/wallets.json`));

			const result = await subject.wallets();

			expect(result.data).toBeArray();
			expect(result.data[0]).toBeInstanceOf(WalletData);
		});
	});

	describe("#delegate", () => {
		it("should succeed", async () => {
			nock("https://betanet.lisk.io:443")
				.get("/api/delegates?username=cc001")
				.reply(200, require(`${__dirname}/../__fixtures__/client/delegate.json`));

			const result = await subject.delegate("cc001");

			expect(result).toBeInstanceOf(DelegateData);
		});
	});

	describe("#delegates", () => {
		it("should succeed", async () => {
			nock("https://betanet.lisk.io:443")
				.get("/api/delegates")
				.reply(200, require(`${__dirname}/../__fixtures__/client/delegates.json`));

			const result = await subject.delegates();

			expect(result.data).toBeArray();
			expect(result.data[0]).toBeInstanceOf(DelegateData);
		});
	});

	describe("#broadcast", () => {
		it("should succeed", async () => {
			nock("https://betanet.lisk.io:443")
				.post("/api/transactions")
				.reply(200, require(`${__dirname}/../__fixtures__/client/broadcast.json`));

			const result = await subject.broadcast([]);

			expect(result).toBeUndefined();
		});
	});
});
