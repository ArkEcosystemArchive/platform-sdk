import "jest-extended";

import nock from "nock";

import { createConfig } from "../../test/helpers";
import { SignedTransactionData } from "../dto";
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
		nock(/.+/)
			.post("/")
			.reply(200, require(`${__dirname}/../../test/fixtures/transaction/utxos.json`))
			.post("/")
			.reply(200, require(`${__dirname}/../../test/fixtures/transaction/expiration.json`));

		const result = await subject.transfer({
			from:
				"addr_test1qpz03ezdyda8ag724zp3n5fqulay02dp7j9mweyeylcaapsxu2hyfhlkwuxupa9d5085eunq2qywy7hvmvej456flknscw3xw7",
			sign: {
				mnemonic: "test walk nut penalty hip pave soap entry language right filter choice",
			},
			data: {
				amount: "1000000",
				to:
					"addr_test1qpz03ezdyda8ag724zp3n5fqulay02dp7j9mweyeylcaapsxu2hyfhlkwuxupa9d5085eunq2qywy7hvmvej456flknscw3xw7",
			},
		});

		expect(result).toBeInstanceOf(SignedTransactionData);
	});
});
