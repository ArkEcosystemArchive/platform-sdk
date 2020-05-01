import "jest-extended";
import nock from "nock";

import { ClientService } from "../../src/services/client";
import { DelegateData, TransactionData, WalletData } from "../../src/dto";

let subject: ClientService;

beforeEach(async () => (subject = await ClientService.construct({ peer: "https://dexplorer.ark.io/api" })));

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

describe("ClientService", function () {
	describe("#transaction", () => {
		it("should succeed", async () => {
			nock("https://dexplorer.ark.io/api")
				.get("/transactions/3e3817fd0c35bc36674f3874c2953fa3e35877cbcdb44a08bdc6083dbd39d572")
				.reply(200, require(`${__dirname}/../__fixtures__/client/transaction.json`));

			const result = await subject.transaction(
				"3e3817fd0c35bc36674f3874c2953fa3e35877cbcdb44a08bdc6083dbd39d572",
			);

			expect(result).toBeInstanceOf(TransactionData);
		});
	});

	describe("#transactions", () => {
		it("should succeed", async () => {
			nock("https://dexplorer.ark.io/api")
				.get("/transactions")
				.reply(200, require(`${__dirname}/../__fixtures__/client/transactions.json`));

			const result = await subject.transactions();

			expect(result.data).toBeArray();
			expect(result.data[0]).toBeInstanceOf(TransactionData);
		});
	});

	describe("#wallet", () => {
		it("should succeed", async () => {
			nock("https://dexplorer.ark.io/api")
				.get("/wallets/DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9")
				.reply(200, require(`${__dirname}/../__fixtures__/client/wallet.json`));

			const result = await subject.wallet("DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9");

			expect(result).toBeInstanceOf(WalletData);
		});
	});

	describe("#wallets", () => {
		it("should succeed", async () => {
			nock("https://dexplorer.ark.io/api")
				.get("/wallets")
				.reply(200, require(`${__dirname}/../__fixtures__/client/wallets.json`));

			const result = await subject.wallets();

			expect(result.data).toBeArray();
			expect(result.data[0]).toBeInstanceOf(WalletData);
		});
	});

	describe("#delegate", () => {
		it("should succeed", async () => {
			nock("https://dexplorer.ark.io/api")
				.get("/delegates/arkx")
				.reply(200, require(`${__dirname}/../__fixtures__/client/delegate.json`));

			const result = await subject.delegate("arkx");

			expect(result).toBeInstanceOf(DelegateData);
		});
	});

	describe("#delegates", () => {
		it("should succeed", async () => {
			nock("https://dexplorer.ark.io/api")
				.get("/delegates")
				.reply(200, require(`${__dirname}/../__fixtures__/client/delegates.json`));

			const result = await subject.delegates();

			expect(result.data).toBeArray();
			expect(result.data[0]).toBeInstanceOf(DelegateData);
		});
	});

	describe("#votes", () => {
		it("should succeed", async () => {
			nock("https://dexplorer.ark.io/api")
				.get("/wallets/arkx/votes")
				.reply(200, require(`${__dirname}/../__fixtures__/client/votes.json`));

			const result = await subject.votes("arkx");

			expect(result.data).toBeArray();
			expect(result.data[0]).toBeInstanceOf(TransactionData);
		});
	});

	describe("#voters", () => {
		it("should succeed", async () => {
			nock("https://dexplorer.ark.io/api")
				.get("/delegates/arkx/voters")
				.reply(200, require(`${__dirname}/../__fixtures__/client/voters.json`));

			const result = await subject.voters("arkx");

			expect(result.data).toBeArray();
			expect(result.data[0]).toBeInstanceOf(WalletData);
		});
	});

	describe("#configuration", () => {
		it("should succeed", async () => {
			nock("https://dexplorer.ark.io/api")
				.get("/node/configuration")
				.reply(200, require(`${__dirname}/../__fixtures__/client/configuration.json`));

			const result = await subject.configuration();

			expect(result).toBeObject();
		});
	});

	describe("#cryptoConfiguration", () => {
		it("should succeed", async () => {
			nock("https://dexplorer.ark.io/api")
				.get("/node/configuration/crypto")
				.reply(200, require(`${__dirname}/../__fixtures__/client/cryptoConfiguration.json`));

			const result = await subject.cryptoConfiguration();

			expect(result).toBeObject();
		});
	});

	describe("#feesByNode", () => {
		it("should succeed", async () => {
			nock("https://dexplorer.ark.io/api")
				.get("/node/fees?days=7")
				.reply(200, require(`${__dirname}/../__fixtures__/client/feesByNode.json`));

			const result = await subject.feesByNode(7);

			expect(result).toBeObject();
		});
	});

	describe("#feesByType", () => {
		it("should succeed", async () => {
			nock("https://dexplorer.ark.io/api")
				.get("/transactions/fees")
				.reply(200, require(`${__dirname}/../__fixtures__/client/feesByType.json`));

			const result = await subject.feesByType();

			expect(result).toBeObject();
		});
	});

	describe("#syncing", () => {
		it("should succeed", async () => {
			nock("https://dexplorer.ark.io/api")
				.get("/node/syncing")
				.reply(200, require(`${__dirname}/../__fixtures__/client/syncing.json`));

			const result = await subject.syncing();

			expect(result).toBeBoolean();
		});
	});

	describe("#broadcast", () => {
		it("should succeed", async () => {
			nock("https://dexplorer.ark.io/api")
				.post("/transactions")
				.reply(200, require(`${__dirname}/../__fixtures__/client/broadcast.json`));

			const result = await subject.broadcast([]);

			expect(result).toBeUndefined();
		});
	});
});
