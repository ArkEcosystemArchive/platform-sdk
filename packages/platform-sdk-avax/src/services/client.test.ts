// import nock from "nock";

import { createConfig } from "../../test/helpers";
import { WalletData } from "../dto";
import { ClientService } from "./client";

let subject: ClientService;

beforeEach(async () => (subject = await ClientService.__construct(createConfig())));

// afterEach(() => nock.cleanAll());

// beforeAll(() => nock.disableNetConnect());

describe("ClientService", function () {
	describe("#wallet", () => {
		it("should succeed", async () => {
			// nock(/.+/)
			// 	.get("/api/wallets/DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9")
			// 	.reply(200, require(`${__dirname}/../../test/fixtures/client/wallet.json`));

			const result = await subject.wallet("X-fuji1my5kqjufcshudkzu4xdt5rlqk99j9nwseclkwq");

			expect(result).toBeInstanceOf(WalletData);
		});
	});
});
