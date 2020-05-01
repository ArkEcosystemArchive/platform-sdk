import "jest-extended";
import nock from "nock";

import { ClientService } from "../../src/services/client";
import { TransactionData, WalletData } from "../../src/dto";

let subject: ClientService;

beforeEach(async () => (subject = await ClientService.construct({ peer: "https://ropsten.infura.io/v3/PROJECT_ID" })));

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

describe("ClientService", function () {
	describe("#transaction", () => {
		it("should succeed", async () => {
			nock("https://ropsten.infura.io/v3/PROJECT_ID")
				.post(/.*/)
				.reply(200, require(`${__dirname}/../__fixtures__/client/transaction.json`));

			const result = await subject.transaction(
				"0x35a28a5b1785d3729afc809851466fcc9971d09922196a1ca6d155756c222435",
			);

			expect(result).toBeInstanceOf(TransactionData);
		});
	});

	describe("#transactions", () => {
		it("should succeed", async () => {
			nock("https://ropsten.infura.io/v3/PROJECT_ID")
				.post(/.*/)
				.reply(200, require(`${__dirname}/../__fixtures__/client/blockNumber.json`))
				.post(/.*/)
				.reply(200, require(`${__dirname}/../__fixtures__/client/transactions.json`));

			const result = await subject.transactions({
				address: "0x003C805FABE761304f9Bc4574bc380cA49145d4D",
				count: 1,
			});

			expect(result.data).toBeArray();
			expect(result.data[0]).toBeInstanceOf(TransactionData);
		});
	});

	describe("#wallet", () => {
		it("should succeed", async () => {
			nock("https://ropsten.infura.io/v3/PROJECT_ID")
				.post(/.*/)
				.reply(200, require(`${__dirname}/../__fixtures__/client/wallet.json`));

			const result = await subject.wallet("0x4581a610f96878266008993475f1476ca9997081");

			expect(result).toBeInstanceOf(WalletData);
		});
	});

	describe("#fees", () => {
		it("should succeed", async () => {
			nock("https://ropsten.infura.io/v3/PROJECT_ID")
				.post(/.*/)
				.reply(200, require(`${__dirname}/../__fixtures__/client/fees.json`));

			const result = await subject.fees(7);

			expect(result).toBeObject();
		});
	});

	describe("#syncing", () => {
		it("should succeed", async () => {
			nock("https://ropsten.infura.io/v3/PROJECT_ID")
				.post(/.*/)
				.reply(200, require(`${__dirname}/../__fixtures__/client/syncing.json`));

			const result = await subject.syncing();

			expect(result).toBeBoolean();
		});
	});
});
