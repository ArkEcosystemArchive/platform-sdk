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
	test("#transfer", async () => {
		const result = await subject.transfer({
			from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
			sign: {
				mnemonic: "this is a top secret passphrase",
			},
			data: {
				amount: "1",
				to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
			},
		});

		expect(result.data()).toBeTrue();
	});
});
