import "jest-extended";
import nock from "nock";

import { Ark } from "../../../src/coins/ark/client";
import { Block, Transaction, Wallet } from "../../../src/coins/ark/dto";

let subject: Ark;

beforeEach(() => (subject = new Ark("https://dexplorer.ark.io/api")));

beforeAll(() => nock.disableNetConnect());

describe("Ark", function () {
	describe("#getBlock", () => {
		it("should succeed", async () => {
			nock("https://dexplorer.ark.io/api")
				.get("/blocks/13114381566690093367")
				.reply(200, require(`${__dirname}/__fixtures__/client/block.json`));

			const result = await subject.getBlock("13114381566690093367");

			expect(result).toBeInstanceOf(Block);
		});
	});

	describe("#getBlocks", () => {
		it("should succeed", async () => {
			nock("https://dexplorer.ark.io/api")
				.get("/blocks")
				.reply(200, require(`${__dirname}/__fixtures__/client/blocks.json`));

			const result = await subject.getBlocks();

			expect(result).toBeArray();
			expect(result[0]).toBeInstanceOf(Block);
		});
	});

	describe("#searchBlocks", () => {
		it("should succeed", async () => {
			nock("https://dexplorer.ark.io/api")
				.post("/blocks/search")
				.reply(200, require(`${__dirname}/__fixtures__/client/blocks.json`));

			const result = await subject.searchBlocks({});

			expect(result).toBeArray();
			expect(result[0]).toBeInstanceOf(Block);
		});
	});

	describe("#getTransaction", () => {
		it("should succeed", async () => {
			nock("https://dexplorer.ark.io/api")
				.get("/transactions/3e3817fd0c35bc36674f3874c2953fa3e35877cbcdb44a08bdc6083dbd39d572")
				.reply(200, require(`${__dirname}/__fixtures__/client/transaction.json`));

			const result = await subject.getTransaction(
				"3e3817fd0c35bc36674f3874c2953fa3e35877cbcdb44a08bdc6083dbd39d572",
			);

			expect(result).toBeInstanceOf(Transaction);
		});
	});

	describe("#getTransactions", () => {
		it("should succeed", async () => {
			nock("https://dexplorer.ark.io/api")
				.get("/transactions")
				.reply(200, require(`${__dirname}/__fixtures__/client/transactions.json`));

			const result = await subject.getTransactions();

			expect(result).toBeArray();
			expect(result[0]).toBeInstanceOf(Transaction);
		});
	});

	describe("#searchTransactions", () => {
		it("should succeed", async () => {
			nock("https://dexplorer.ark.io/api")
				.post("/transactions/search")
				.reply(200, require(`${__dirname}/__fixtures__/client/transactions.json`));

			const result = await subject.searchTransactions({});

			expect(result).toBeArray();
			expect(result[0]).toBeInstanceOf(Transaction);
		});
	});

	describe("#getWallet", () => {
		it("should succeed", async () => {
			nock("https://dexplorer.ark.io/api")
				.get("/wallets/DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9")
				.reply(200, require(`${__dirname}/__fixtures__/client/wallet.json`));

			const result = await subject.getWallet("DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9");

			expect(result).toBeInstanceOf(Wallet);
		});
	});

	describe("#getWallets", () => {
		it("should succeed", async () => {
			nock("https://dexplorer.ark.io/api")
				.get("/wallets")
				.reply(200, require(`${__dirname}/__fixtures__/client/wallets.json`));

			const result = await subject.getWallets();

			expect(result).toBeArray();
			expect(result[0]).toBeInstanceOf(Wallet);
		});
	});

	describe("#searchWallets", () => {
		it("should succeed", async () => {
			nock("https://dexplorer.ark.io/api")
				.post("/wallets/search")
				.reply(200, require(`${__dirname}/__fixtures__/client/wallets.json`));

			const result = await subject.searchWallets({});

			expect(result).toBeArray();
			expect(result[0]).toBeInstanceOf(Wallet);
		});
	});
});
