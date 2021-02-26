import "jest-extended";

import { Transactions } from "@arkecosystem/crypto";
import nock from "nock";

import { createConfig } from "../../test/helpers";
import { TransactionService } from "./transaction";

let subject: TransactionService;

beforeEach(async () => {
	subject = await TransactionService.__construct(createConfig());
});

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

jest.setTimeout(10000);

describe("TransactionService", () => {
	test("#transfer", async () => {
		const result = await subject.transfer({
			from: "7yihWKb3LfvKEcjgTSW5vZruU6wmpR5WB224FyU5DzLW",
			sign: {
				mnemonic: "point clown obvious suspect saddle coffee cancel frame ask spy skull maid hybrid faint stumble ball alone mutual planet kick decade twist age salmon",
			},
			data: {
				amount: "1",
				to: "7yihWKb3LfvKEcjgTSW5vZruU6wmpR5WB224FyU5DzLW",
			},
		});

		expect(Transactions.TransactionFactory.fromJson(result.data()).verify()).toBeTrue();
	});
});
