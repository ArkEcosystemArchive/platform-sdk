import "jest-extended";
import nock from "nock";

import { TransactionService } from "../../src/services/transaction";
import { createConfig } from "../helpers";

let subject: TransactionService;

beforeEach(async () => (subject = await TransactionService.construct(createConfig())));

beforeAll(() => nock.disableNetConnect());

describe("TransactionService", () => {
	describe("#transfer", () => {
		it("should verify", async () => {
			nock("https://stargate.cosmos.network")
				.get("/auth/accounts/cosmos1fvxjdyfdvat5g0ee7jmyemwl2n95ad7negf7ap")
				.reply(200, require(`${__dirname}/../__fixtures__/client/wallet.json`));

			const result: any = await subject.transfer({
				sign: {
					mnemonic: "this is a top secret mnemonic",
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
