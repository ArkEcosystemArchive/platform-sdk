import "jest-extended";
import { BigNumber } from "@arkecosystem/utils";
import nock from "nock";

import { ClientService } from "../../src/services/client";
import { TransactionData } from "../../src/dto";

let subject: ClientService;

beforeEach(async () => (subject = await ClientService.construct({ network: "test" })));

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

describe("ClientService", function () {
	describe("#transactions", () => {
		it("should succeed", async () => {
			nock("https://neoscan-testnet.io/api/test_net/v1/")
				.get("/get_address_abstracts/Ab9QkPeMzx7ehptvjbjHviAXUfdhAmEAUF/1")
				.reply(200, require(`${__dirname}/../__fixtures__/client/transactions.json`));

			const result = await subject.transactions({ address: "Ab9QkPeMzx7ehptvjbjHviAXUfdhAmEAUF" });

			expect(result.data).toBeArray();
			expect(result.data[0]).toBeInstanceOf(TransactionData);
			expect(result.data[0].id()).toBe("718bc4cfc50c361a8afe032e2c170dfebadce16ea72228a57634413b62b7cf24");
			// expect(result.data[0].type()).toBeUndefined();
			// expect(result.data[0].typeGroup()).toBeUndefined();
			expect(result.data[0].timestamp()).toBe(1588930966);
			expect(result.data[0].confirmations()).toEqual(BigNumber.ZERO);
			// expect(result.data[0].nonce()).toBe("...");
			expect(result.data[0].sender()).toBe("AStJyBXGGBK6bwrRfRUHSjp993PB5C9QgF");
			expect(result.data[0].recipient()).toBe("Ab9QkPeMzx7ehptvjbjHviAXUfdhAmEAUF");
			expect(result.data[0].amount()).toEqual(BigNumber.make(1));
			expect(result.data[0].fee()).toEqual(BigNumber.ZERO);
			// expect(result.data[0].memo()).toBeUndefined();
			expect(result.data[0].blockId()).toBe(4259222);
		});
	});
});
