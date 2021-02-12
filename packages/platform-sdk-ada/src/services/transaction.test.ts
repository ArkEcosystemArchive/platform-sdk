import "jest-extended";

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

describe("Core", () => {
	it("#transfer", async () => {
		const result = await subject.transfer({
			nonce: "1",
			from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
			sign: {
				mnemonic: "test walk nut penalty hip pave soap entry language right filter choice",
			},
			data: {
				amount: "1",
				to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
				expiration: 1,
			},
		});
	});
});
