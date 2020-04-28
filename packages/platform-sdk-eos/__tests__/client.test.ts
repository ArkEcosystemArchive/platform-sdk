import "jest-extended";
import nock from "nock";

import { Client } from "../src/client";
import { Wallet } from "../src/dto";

let subject: Client;

beforeEach(() => (subject = new Client("https://api.testnet.eos.io")));

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

describe("Client", function () {
	describe("#getWallet", () => {
		it("should succeed", async () => {
			nock("https://api.testnet.eos.io")
				.post("/v1/chain/get_account")
				.reply(200, require(`${__dirname}/__fixtures__/client/getWallet.json`));

			const result = await subject.getWallet("bdfkbzietxos");

			expect(result).toBeInstanceOf(Wallet);
		});
	});

	describe.skip("#postTransactions", () => {
		it("should succeed", async () => {
			const result = await subject.postTransactions([]);

			expect(result).toBeUndefined();
		});
	});
});
