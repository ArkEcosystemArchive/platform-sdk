import "jest-extended";

import nock from "nock";

import { createConfig } from "../../test/helpers";
import { TransactionService } from "./transaction";

let subject: TransactionService;

beforeEach(async () => (subject = await TransactionService.__construct(createConfig())));

beforeAll(() => nock.disableNetConnect());

describe("TransactionService", () => {
	describe("#transfer", () => {
		it("should verify", async () => {
			nock("https://stargate.cosmos.network")
				.get("/auth/accounts/cosmos1fvxjdyfdvat5g0ee7jmyemwl2n95ad7negf7ap")
				.reply(200, require(`${__dirname}/../../test/fixtures/client/wallet.json`))
				.get("/bank/balances/cosmos1fvxjdyfdvat5g0ee7jmyemwl2n95ad7negf7ap")
				.reply(200, require(`${__dirname}/../../test/fixtures/client/wallet-balance.json`));

			const result: any = await subject.transfer({
				from: "cosmos1fvxjdyfdvat5g0ee7jmyemwl2n95ad7negf7ap",
				sign: {
					mnemonic: "this is a top secret passphrase",
				},
				data: {
					amount: "1",
					to: "cosmos1fvxjdyfdvat5g0ee7jmyemwl2n95ad7negf7ap",
				},
			});

			expect(result).toBeObject();
		});
	});
});
