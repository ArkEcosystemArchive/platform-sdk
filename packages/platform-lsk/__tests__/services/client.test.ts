import "jest-extended";
import nock from "nock";

import { ClientService } from "../../src/services/client";
import { Block, Delegate, Peer, Transaction, Wallet } from "../src/dto";

let subject: Client;

beforeEach(() => (subject = new Client("https://betanet.lisk.io:443")));

beforeAll(() => nock.disableNetConnect());

describe("Client", function () {
	describe("#getTransaction", () => {
		it("should succeed", async () => {
			nock("https://betanet.lisk.io:443")
				.get("/api/transactions?id=15562133894377717094")
				.reply(200, require(`${__dirname}/../__fixtures__/client/getTransaction.json`));

			const result = await subject.getTransaction("15562133894377717094");

			expect(result).toBeInstanceOf(Transaction);
		});
	});

	describe("#getTransactions", () => {
		it("should succeed", async () => {
			nock("https://betanet.lisk.io:443")
				.get("/api/transactions")
				.reply(200, require(`${__dirname}/../__fixtures__/client/getTransactions.json`));

			const result = await subject.getTransactions();

			expect(result.data).toBeArray();
			expect(result.data[0]).toBeInstanceOf(Transaction);
		});
	});

	describe("#getWallet", () => {
		it("should succeed", async () => {
			nock("https://betanet.lisk.io:443")
				.get("/api/accounts?address=6566229458323231555L")
				.reply(200, require(`${__dirname}/../__fixtures__/client/getWallet.json`));

			const result = await subject.getWallet("6566229458323231555L");

			expect(result).toBeInstanceOf(Wallet);
		});
	});

	describe("#getWallets", () => {
		it("should succeed", async () => {
			nock("https://betanet.lisk.io:443")
				.get("/api/accounts")
				.reply(200, require(`${__dirname}/../__fixtures__/client/getWallets.json`));

			const result = await subject.getWallets();

			expect(result.data).toBeArray();
			expect(result.data[0]).toBeInstanceOf(Wallet);
		});
	});

	describe("#getDelegate", () => {
		it("should succeed", async () => {
			nock("https://betanet.lisk.io:443")
				.get("/api/delegates?username=cc001")
				.reply(200, require(`${__dirname}/../__fixtures__/client/getDelegate.json`));

			const result = await subject.getDelegate("cc001");

			expect(result).toBeInstanceOf(Delegate);
		});
	});

	describe("#getDelegates", () => {
		it("should succeed", async () => {
			nock("https://betanet.lisk.io:443")
				.get("/api/delegates")
				.reply(200, require(`${__dirname}/../__fixtures__/client/getDelegates.json`));

			const result = await subject.getDelegates();

			expect(result.data).toBeArray();
			expect(result.data[0]).toBeInstanceOf(Delegate);
		});
	});

	describe("#postTransactions", () => {
		it("should succeed", async () => {
			nock("https://betanet.lisk.io:443")
				.post("/api/transactions")
				.reply(200, require(`${__dirname}/../__fixtures__/client/postTransactions.json`));

			const result = await subject.postTransactions({});

			expect(result).toBeUndefined();
		});
	});
});
