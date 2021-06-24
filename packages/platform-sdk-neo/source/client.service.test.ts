import "jest-extended";

import { DTO, IoC, Services } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import nock from "nock";

import { createService } from "../test/mocking";
import { SignedTransactionData } from "./signed-transaction.dto";
import { DataTransferObjects } from "./coin.dtos";
import { TransferData } from "./transfer.dto";
import { ClientService } from "./client.service";

let subject: ClientService;

beforeAll(() => {
	nock.disableNetConnect();

	subject = createService(ClientService, undefined, (container) => {
		container.constant(IoC.BindingType.Container, container);
		container.constant(IoC.BindingType.DataTransferObjects, DataTransferObjects);
		container.singleton(IoC.BindingType.DataTransferObjectService, Services.AbstractDataTransferObjectService);
	});
});

afterEach(() => nock.cleanAll());

beforeAll(() => {
	nock.disableNetConnect();
});

describe("ClientService", () => {
	describe("#transactions", () => {
		it("should succeed", async () => {
			nock("https://neoscan-testnet.io/api/test_net/v1/")
				.get("/get_address_abstracts/Ab9QkPeMzx7ehptvjbjHviAXUfdhAmEAUF/1")
				.reply(200, require(`${__dirname}/../test/fixtures/client/transactions.json`));

			const result = await subject.transactions({ address: "Ab9QkPeMzx7ehptvjbjHviAXUfdhAmEAUF" });

			expect(result).toBeObject();
			expect(result.items()[0]).toBeInstanceOf(TransferData);
			expect(result.items()[0].id()).toBe("718bc4cfc50c361a8afe032e2c170dfebadce16ea72228a57634413b62b7cf24");
			expect(result.items()[0].type()).toBe("transfer");
			expect(result.items()[0].timestamp()).toBeInstanceOf(DateTime);
			expect(result.items()[0].confirmations()).toEqual(BigNumber.ZERO);
			expect(result.items()[0].sender()).toBe("AStJyBXGGBK6bwrRfRUHSjp993PB5C9QgF");
			expect(result.items()[0].recipient()).toBe("Ab9QkPeMzx7ehptvjbjHviAXUfdhAmEAUF");
			expect(result.items()[0].amount()).toEqual(BigNumber.make(1));
			expect(result.items()[0].fee()).toEqual(BigNumber.ZERO);
			// @ts-ignore - Better types so that memo gets detected on TransactionDataType
			expect(result.items()[0].memo()).toBeUndefined();
		});
	});

	describe("#wallet", () => {
		it("should succeed", async () => {
			nock("https://neoscan-testnet.io/api/test_net/v1/")
				.get("/get_balance/Ab9QkPeMzx7ehptvjbjHviAXUfdhAmEAUF")
				.reply(200, require(`${__dirname}/../test/fixtures/client/wallet.json`));

			const result = await subject.wallet("Ab9QkPeMzx7ehptvjbjHviAXUfdhAmEAUF");

			expect(result).toBeObject();
			expect(result.address()).toBe("Ab9QkPeMzx7ehptvjbjHviAXUfdhAmEAUF");
			expect(result.balance().available).toEqual(BigNumber.make(9).times(1e8));
		});
	});

	describe.skip("#broadcast", () => {
		it("should pass", async () => {
			nock("https://neoscan-testnet.io/api/test_net/v1/")
				.get("/get_balance/Ab9QkPeMzx7ehptvjbjHviAXUfdhAmEAUF")
				.reply(200, require(`${__dirname}/../test/fixtures/client/balance.json`))
				.post("/api/transactions")
				.reply(200, require(`${__dirname}/../test/fixtures/client/broadcast.json`));

			const result = await subject.broadcast([
				createService(SignedTransactionData).configure("id", "transactionPayload", ""),
			]);

			expect(result).toEqual({
				accepted: ["0cb2e1fc8caa83cfb204e5cd2f66a58f3954a3b7bcc8958aaba38b582376e652"],
				rejected: [],
				errors: {},
			});
		});

		it("should fail", async () => {
			nock("https://neoscan-testnet.io/api/test_net/v1/")
				.post("/api/transactions")
				.reply(200, require(`${__dirname}/../test/fixtures/client/broadcast-failure.json`));

			const result = await subject.broadcast([
				createService(SignedTransactionData).configure("id", "transactionPayload", ""),
			]);

			expect(result).toEqual({
				accepted: [],
				rejected: ["0cb2e1fc8caa83cfb204e5cd2f66a58f3954a3b7bcc8958aaba38b582376e652"],
				errors: {
					"0cb2e1fc8caa83cfb204e5cd2f66a58f3954a3b7bcc8958aaba38b582376e652": "ERR_INSUFFICIENT_FUNDS",
				},
			});
		});
	});
});
