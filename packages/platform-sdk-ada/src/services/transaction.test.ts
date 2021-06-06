import "jest-extended";

import { Signatories } from "@arkecosystem/platform-sdk";
import nock from "nock";

import { SignedTransactionData } from "../dto";
import { TransactionService } from "./transaction";

let subject: TransactionService;

beforeEach(async () => (subject = await TransactionService.__construct(createConfig())));

afterEach(() => nock.cleanAll());

beforeAll(() => {
	nock.disableNetConnect();
});

jest.setTimeout(10000);

describe("TransactionService", () => {
	describe("#transfer", () => {
		it("is correct", async () => {
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
				signatory: new Signatories.Signatory(
					new Signatories.MnemonicSignatory({
						signingKey:
							"excess behave track soul table wear ocean cash stay nature item turtle palm soccer lunch horror start stumble month panic right must lock dress",
						address:
							"aec30330deaecdd7503195a0d730256faef87027022b1bdda7ca0a61bca0a55e4d575af5a93bdf4905a3702fadedf451ea584791d233ade90965d608bac57304",
						publicKey: "publicKey",
						privateKey: "privateKey",
					}),
				),
				data: {
					amount: 1,
					to:
						"addr_test1qpz03ezdyda8ag724zp3n5fqulay02dp7j9mweyeylcaapsxu2hyfhlkwuxupa9d5085eunq2qywy7hvmvej456flknscw3xw7",
				},
			});

			expect(result).toBeInstanceOf(SignedTransactionData);
			expect(result.id()).toBe("e2e75b04c4b1dc4d4b3db14166fb02cb26f5b9ed3c49b1e1c8379a21502dc77c");
			expect(result.amount().toString()).toBe("1000000");
		});
	});
});
