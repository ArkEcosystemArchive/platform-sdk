import "jest-extended";

import nock from "nock";

import { TransactionData } from ".";
import { createService } from "../../test/helpers";

let subject: TransactionData;

beforeAll(() => nock.disableNetConnect());

describe("transaction", () => {
	describe("blockId", () => {
		it("should parse blockId correctly", () => {
			subject = createService(TransactionData).configure(require(`${__dirname}/../../test/fixtures/client/transactions.json`).data[1]);
			expect(subject.blockId()).toBeString();
			expect(subject.blockId()).toBe("14742837");
		});
	});

	describe("memo", () => {
		it("should parse memo correctly", () => {
			subject = createService(TransactionData).configure(require(`${__dirname}/../../test/fixtures/client/transactions.json`).data[1]);
			expect(subject.memo()).toBe("Mariano");
		});

		it("should parse missing memo correctly", () => {
			subject = createService(TransactionData).configure(require(`${__dirname}/../../test/fixtures/client/transactions.json`).data[0]);
			expect(subject.memo()).toBeUndefined();
		});
	});
});
