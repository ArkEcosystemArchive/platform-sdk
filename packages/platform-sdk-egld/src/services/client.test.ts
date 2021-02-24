import "jest-extended";

import nock from "nock";

import { createConfig } from "../../test/helpers";
import { TransactionData, WalletData } from "../dto";
import { ClientService } from "./client";

let subject: ClientService;

beforeEach(async () => (subject = await ClientService.__construct(createConfig())));

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

describe("ClientService", function () {
	test("#transaction", async () => {
		nock(/.+/)
			.get("/v1.0/transactions/c2e6e2c75357b7d69d735d5ce7d7e9a77291477d0a11ba158b5cf39317398f66")
			.reply(200, require(`${__dirname}/../../test/fixtures/client/transaction.json`));

		const result = await subject.transaction("c2e6e2c75357b7d69d735d5ce7d7e9a77291477d0a11ba158b5cf39317398f66");

		expect(result).toBeInstanceOf(TransactionData);
	});

	test("#transactions", async () => {
		subject = await ClientService.__construct(createConfig({ network: "ark.mainnet" }));

		nock(/.+/)
			.post("/v1.0/erd17uy64y9zw8zd4xz5d2deqmxfxkk3zfuj0jh24k0s5jqhet3pz0esng60j7transactions")
			.reply(200, require(`${__dirname}/../../test/fixtures/client/transactions.json`));

		const result = await subject.transactions({ addresses: ["DBk4cPYpqp7EBcvkstVDpyX7RQJNHxpMg8"] });

		expect(result).toBeObject();
		expect(result.items()[0]).toBeInstanceOf(TransactionData);
	});

	test("#wallet", async () => {
		nock(/.+/)
			.get("/api/wallets/DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9")
			.reply(200, require(`${__dirname}/../../test/fixtures/client/wallet.json`));

		const result = await subject.wallet("DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9");

		expect(result).toBeInstanceOf(WalletData);
	});

	describe("#broadcast", () => {
		it("should accept 1 transaction and reject 1 transaction", async () => {
			nock(/.+/)
				.post("/api/transactions")
				.reply(422, require(`${__dirname}/../../test/fixtures/client/broadcast.json`));

			const result = await subject.broadcast([]);

			expect(result).toEqual({
				accepted: ["e4311204acf8a86ba833e494f5292475c6e9e0913fc455a12601b4b6b55818d8"],
				rejected: ["d4cb4edfbd50a5d71d3d190a687145530b73f041c59e2c4137fe8b3d1f970216"],
				errors: {
					d4cb4edfbd50a5d71d3d190a687145530b73f041c59e2c4137fe8b3d1f970216: ["ERR_FORGED"],
				},
			});
		});
	});
});
