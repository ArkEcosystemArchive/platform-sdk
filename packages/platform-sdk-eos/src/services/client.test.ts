import "jest-extended";
import nock from "nock";

import { ClientService } from "./client";
import { WalletData } from "../dto";
import { createConfig } from "../../test/helpers";

let subject: ClientService;

beforeEach(async () => (subject = await ClientService.construct(createConfig())));

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

describe("ClientService", function () {
	describe("#wallet", () => {
		it("should succeed", async () => {
			nock("https://api.testnet.eos.io")
				.post("/v1/chain/get_account")
				.reply(200, require(`${__dirname}/../../test/fixtures/client/wallet.json`));

			const result = await subject.wallet("bdfkbzietxos");

			expect(result).toBeInstanceOf(WalletData);
		});
	});

	describe.skip("#broadcast", () => {
		it("should succeed", async () => {
			const result = await subject.broadcast([]);

			expect(result).toBeUndefined();
		});
	});
});
