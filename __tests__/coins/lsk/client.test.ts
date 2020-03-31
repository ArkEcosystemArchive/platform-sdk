import "jest-extended";
import nock from "nock";

import { Lisk } from "../../../src/coins/lsk/client";
import { Block, Delegate, Peer, Transaction, Wallet } from "../../../src/coins/lsk/dto";

let subject: Lisk;

beforeEach(() => (subject = new Lisk("https://betanet.lisk.io:443")));

beforeAll(() => nock.disableNetConnect());

describe("Lisk", function () {
	describe("#getBlock", () => {
		it("should succeed", async () => {
			nock("https://betanet.lisk.io:443")
				.get("/api/blocks?blockId=1676747649530141145")
				.reply(200, require(`${__dirname}/__fixtures__/client/getBlock.json`));

			const result = await subject.getBlock("1676747649530141145");

			expect(result).toBeInstanceOf(Block);
		});
	});

	describe("#getBlocks", () => {
		it("should succeed", async () => {
			nock("https://betanet.lisk.io:443")
				.get("/api/blocks")
				.reply(200, require(`${__dirname}/__fixtures__/client/getBlocks.json`));

			const result = await subject.getBlocks();

			expect(result.data).toBeArray();
			expect(result.data[0]).toBeInstanceOf(Block);
		});
	});

	describe("#getTransaction", () => {
		it("should succeed", async () => {
			nock("https://betanet.lisk.io:443")
				.get("/api/transactions?id=15562133894377717094")
				.reply(200, require(`${__dirname}/__fixtures__/client/getTransaction.json`));

			const result = await subject.getTransaction("15562133894377717094");

			expect(result).toBeInstanceOf(Transaction);
		});
	});

	describe("#getTransactions", () => {
		it("should succeed", async () => {
			nock("https://betanet.lisk.io:443")
				.get("/api/transactions")
				.reply(200, require(`${__dirname}/__fixtures__/client/getTransactions.json`));

			const result = await subject.getTransactions();

			expect(result.data).toBeArray();
			expect(result.data[0]).toBeInstanceOf(Transaction);
		});
	});

	describe("#getWallet", () => {
		it("should succeed", async () => {
			nock("https://betanet.lisk.io:443")
				.get("/api/accounts?address=6566229458323231555L")
				.reply(200, require(`${__dirname}/__fixtures__/client/getWallet.json`));

			const result = await subject.getWallet("6566229458323231555L");

			expect(result).toBeInstanceOf(Wallet);
		});
	});

	describe("#getWallets", () => {
		it("should succeed", async () => {
			nock("https://betanet.lisk.io:443")
				.get("/api/accounts")
				.reply(200, require(`${__dirname}/__fixtures__/client/getWallets.json`));

			const result = await subject.getWallets();

			expect(result.data).toBeArray();
			expect(result.data[0]).toBeInstanceOf(Wallet);
		});
	});

	describe("#getDelegate", () => {
		it("should succeed", async () => {
			nock("https://betanet.lisk.io:443")
				.get("/api/delegates?username=cc001")
				.reply(200, require(`${__dirname}/__fixtures__/client/getDelegate.json`));

			const result = await subject.getDelegate("cc001");

			expect(result).toBeInstanceOf(Delegate);
		});
	});

	describe("#getDelegates", () => {
		it("should succeed", async () => {
			nock("https://betanet.lisk.io:443")
				.get("/api/delegates")
				.reply(200, require(`${__dirname}/__fixtures__/client/getDelegates.json`));

			const result = await subject.getDelegates();

			expect(result.data).toBeArray();
			expect(result.data[0]).toBeInstanceOf(Delegate);
		});
	});

	describe("#getPeers", () => {
		it("should succeed", async () => {
			nock("https://betanet.lisk.io:443")
				.get("/api/peers")
				.reply(200, require(`${__dirname}/__fixtures__/client/getPeers.json`));

			const result = await subject.getPeers();

			expect(result.data).toBeArray();
			expect(result.data[0]).toBeInstanceOf(Peer);
		});
	});

	describe("#postTransactions", () => {
		it("should succeed", async () => {
			nock("https://betanet.lisk.io:443")
				.post("/api/transactions")
				.reply(200, require(`${__dirname}/__fixtures__/client/postTransactions.json`));

			const result = await subject.postTransactions({});

			expect(result).toBeUndefined();
		});
	});
});
