import "jest-extended";
import { Utils } from "@arkecosystem/platform-sdk";
import nock from "nock";

import { ClientService } from "../../src/services/client";
import { TransactionData } from "../../src/dto";
import { createConfig } from "../helpers";

let subject: ClientService;

beforeEach(async () => (subject = await ClientService.construct(createConfig())));

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

describe("ClientService", function () {
	describe("#transactions", () => {
		it("should succeed", async () => {
			nock("https://neoscan-testnet.io/api/test_net/v1/")
				.get("/get_address_abstracts/Ab9QkPeMzx7ehptvjbjHviAXUfdhAmEAUF/1")
				.reply(200, require(`${__dirname}/../__fixtures__/client/transactions.json`));

			const result = await subject.transactions({ address: "Ab9QkPeMzx7ehptvjbjHviAXUfdhAmEAUF" });

			expect(result.data).toBeObject();
			expect(result.data[0]).toBeInstanceOf(TransactionData);
			expect(result.data[0].id()).toBe("718bc4cfc50c361a8afe032e2c170dfebadce16ea72228a57634413b62b7cf24");
			expect(result.data[0].type()).toBe("transfer");
			expect(result.data[0].timestamp()).toBe(1588930966);
			expect(result.data[0].confirmations()).toEqual(Utils.BigNumber.ZERO);
			expect(result.data[0].sender()).toBe("AStJyBXGGBK6bwrRfRUHSjp993PB5C9QgF");
			expect(result.data[0].recipient()).toBe("Ab9QkPeMzx7ehptvjbjHviAXUfdhAmEAUF");
			expect(result.data[0].amount()).toEqual(Utils.BigNumber.make(1));
			expect(result.data[0].fee()).toEqual(Utils.BigNumber.ZERO);
			expect(result.data[0].memo()).toBeUndefined();
		});
	});

	describe.skip("#broadcast", () => {
		it("should pass", async () => {
			nock("https://neoscan-testnet.io/api/test_net/v1/")
				.get("/get_balance/Ab9QkPeMzx7ehptvjbjHviAXUfdhAmEAUF")
				.reply(200, require(`${__dirname}/../__fixtures__/client/balance.json`))
				.post("/api/transactions")
				.reply(200, require(`${__dirname}/../__fixtures__/client/broadcast.json`));

			const result = await subject.broadcast(["transactionPayload"]);

			expect(result).toEqual({
				accepted: ["0cb2e1fc8caa83cfb204e5cd2f66a58f3954a3b7bcc8958aaba38b582376e652"],
				rejected: [],
				errors: {},
			});
		});

		it("should fail", async () => {
			nock("https://neoscan-testnet.io/api/test_net/v1/")
				.post("/api/transactions")
				.reply(200, require(`${__dirname}/../__fixtures__/client/broadcast-failure.json`));

			const result = await subject.broadcast(["transactionPayload"]);

			expect(result).toEqual({
				accepted: [],
				rejected: ["0cb2e1fc8caa83cfb204e5cd2f66a58f3954a3b7bcc8958aaba38b582376e652"],
				errors: {
					"0cb2e1fc8caa83cfb204e5cd2f66a58f3954a3b7bcc8958aaba38b582376e652": ["ERR_INSUFFICIENT_FUNDS"],
				},
			});
		});
	});
});
