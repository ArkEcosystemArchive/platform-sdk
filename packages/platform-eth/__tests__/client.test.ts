import "jest-extended";
import nock from "nock";

import { Client } from "../src/client";
import { Transaction, Wallet } from "../src/dto";

let subject: Client;

beforeEach(() => (subject = new Client("https://ropsten.infura.io/v3/PROJECT_ID")));

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

describe("Client", function () {
	describe("#getTransaction", () => {
		it("should succeed", async () => {
			nock("https://ropsten.infura.io/v3/PROJECT_ID")
				.post(/.*/)
				.reply(200, require(`${__dirname}/__fixtures__/client/getTransaction.json`));

			const result = await subject.getTransaction(
				"0x35a28a5b1785d3729afc809851466fcc9971d09922196a1ca6d155756c222435",
			);

			expect(result).toBeInstanceOf(Transaction);
		});
	});

	describe("#getTransactions", () => {
		it("should succeed", async () => {
			nock("https://ropsten.infura.io/v3/PROJECT_ID")
				.post(/.*/)
				.reply(200, require(`${__dirname}/__fixtures__/client/getBlockNumber.json`))
				.post(/.*/)
				.reply(200, require(`${__dirname}/__fixtures__/client/getTransactions.json`));

			const result = await subject.getTransactions({
				address: "0x003C805FABE761304f9Bc4574bc380cA49145d4D",
				count: 1,
			});

			expect(result.data).toBeArray();
			expect(result.data[0]).toBeInstanceOf(Transaction);
		});
	});

	describe("#getWallet", () => {
		it("should succeed", async () => {
			nock("https://ropsten.infura.io/v3/PROJECT_ID")
				.post(/.*/)
				.reply(200, require(`${__dirname}/__fixtures__/client/getWallet.json`));

			const result = await subject.getWallet("0x4581a610f96878266008993475f1476ca9997081");

			expect(result).toBeInstanceOf(Wallet);
		});
	});

	describe("#getFeesByType", () => {
		it("should succeed", async () => {
			nock("https://ropsten.infura.io/v3/PROJECT_ID")
				.post(/.*/)
				.reply(200, require(`${__dirname}/__fixtures__/client/getFeesByType.json`));

			const result = await subject.getFeesByType();

			expect(result).toBeObject();
		});
	});

	describe("#getSyncStatus", () => {
		it("should succeed", async () => {
			nock("https://ropsten.infura.io/v3/PROJECT_ID")
				.post(/.*/)
				.reply(200, require(`${__dirname}/__fixtures__/client/getSyncStatus.json`));

			const result = await subject.getSyncStatus();

			expect(result).toBeBoolean();
		});
	});
});
