import "jest-extended";

import nock from "nock";

import { TransactionData } from ".";

let subject: TransactionData;

beforeAll(() => nock.disableNetConnect());

describe("transaction", function () {
	describe("blockId", function () {
		it("should parse blockId correctly", function () {
			subject = new TransactionData(require(`${__dirname}/../../test/fixtures/client/transactions.json`).data[1]);
			expect(subject.blockId()).toBeString();
			expect(subject.blockId()).toBe("14742837");
		});
	});

	describe("memo", function () {
		it("should parse memo correctly", function () {
			subject = new TransactionData(require(`${__dirname}/../../test/fixtures/client/transactions.json`).data[1]);
			expect(subject.memo()).toBe("Mariano");
		});

		it("should parse missing memo correctly", function () {
			subject = new TransactionData(require(`${__dirname}/../../test/fixtures/client/transactions.json`).data[0]);
			expect(subject.memo()).toBeUndefined();
		});
	});
});
