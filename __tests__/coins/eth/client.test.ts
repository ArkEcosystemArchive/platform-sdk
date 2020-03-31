import "jest-extended";
import nock from "nock";

import { Ethereum } from "../../../src/coins/eth/client";
import { Block, Transaction, Wallet } from "../../../src/coins/eth/dto";

let subject: Ethereum;

beforeEach(() => (subject = new Ethereum("https://ropsten.infura.io/v3/project-id")));

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

describe("Ethereum", function () {
	describe("#getBlock", () => {
		it("should succeed", async () => {
			nock("https://ropsten.infura.io/v3/project-id")
				.post(/.*/)
				.reply(200, require(`${__dirname}/__fixtures__/client/getBlock.json`));

			const result = await subject.getBlock("7623263");

			expect(result).toBeInstanceOf(Block);
		});
	});

	describe("#getTransaction", () => {
		it("should succeed", async () => {
			nock("https://ropsten.infura.io/v3/project-id")
				.post(/.*/)
				.reply(200, require(`${__dirname}/__fixtures__/client/getTransaction.json`));

			const result = await subject.getTransaction(
				"0x35a28a5b1785d3729afc809851466fcc9971d09922196a1ca6d155756c222435",
			);

			expect(result).toBeInstanceOf(Transaction);
		});
	});

	describe("#getWallet", () => {
		it("should succeed", async () => {
			nock("https://ropsten.infura.io/v3/project-id")
				.post(/.*/)
				.reply(200, require(`${__dirname}/__fixtures__/client/getWallet.json`));

			const result = await subject.getWallet("0x4581a610f96878266008993475f1476ca9997081");

			expect(result).toBeInstanceOf(Wallet);
		});
	});

	describe("#getFeesByType", () => {
		it("should succeed", async () => {
			nock("https://ropsten.infura.io/v3/project-id")
				.post(/.*/)
				.reply(200, require(`${__dirname}/__fixtures__/client/getFeesByType.json`));

			const result = await subject.getFeesByType();

			expect(result).toBeString();
		});
	});

	describe("#getSyncStatus", () => {
		it("should succeed", async () => {
			nock("https://ropsten.infura.io/v3/project-id")
				.post(/.*/)
				.reply(200, require(`${__dirname}/__fixtures__/client/getSyncStatus.json`));

			const result = await subject.getSyncStatus();

			expect(result).toBeObject();
		});
	});
});
