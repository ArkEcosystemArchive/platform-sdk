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

describe("TransactionService", () => {
	it("#transfer", async () => {
		nock(/.+/)
			.post("/")
			.reply(200, require(`${__dirname}/../../test/fixtures/transaction/transactions-page-1.json`))
			.post("/")
			.reply(200, require(`${__dirname}/../../test/fixtures/transaction/transactions-page-2.json`))
			.post("/")
			.reply(200, require(`${__dirname}/../../test/fixtures/transaction/utxos.json`))
			.post("/")
			.reply(200, require(`${__dirname}/../../test/fixtures/transaction/expiration.json`));

		const result = await subject.transfer({
			from:
				"aec30330deaecdd7503195a0d730256faef87027022b1bdda7ca0a61bca0a55e4d575af5a93bdf4905a3702fadedf451ea584791d233ade90965d608bac57304",
			sign: {
				mnemonic: "excess behave track soul table wear ocean cash stay nature item turtle palm soccer lunch horror start stumble month panic right must lock dress",
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
