import "jest-extended";

import { Test } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import nock from "nock";

import { createConfig } from "../../test/config";
import { identity } from "../../test/fixtures/identity";
import { container } from "../container";
import { SignedTransactionData, TransactionData, WalletData } from "../dto";
import { ClientService } from "./client";

const fixtures = `${__dirname}/../../test/fixtures/client`;

let subject: ClientService;

beforeAll(() => {
	nock.disableNetConnect();

	subject = createService(ClientService, undefined, (container) => {
		container.constant(IoC.BindingType.Container, container);
		container.singleton(IoC.BindingType.DataTransferObjectService, DataTransferObjectService);
	});
});

afterEach(() => nock.cleanAll());

beforeAll(() => {
	nock.disableNetConnect();

	Test.bindBigNumberService(container);
});

describe("ClientService", () => {
	test("#transaction", async () => {
		nock(/.+/)
			.post("/")
			.reply(200, require(`${fixtures}/transaction.json`));

		const result = await subject.transaction("b2e78cb571fcee734fb6e3e34a16d735e3a3550c09100b79d017dd364b8770cb");

		expect(result).toBeInstanceOf(TransactionData);
		expect(result.id()).toBe("b2e78cb571fcee734fb6e3e34a16d735e3a3550c09100b79d017dd364b8770cb");
		expect(result.isConfirmed()).toBe(true);
		expect(result.sender()).toBe("0xE77555ff2103cAF9b8Ed5AC46277A50504bbC0EE");
		expect(result.recipient()).toBe("0xA54E49719267E8312510D7b78598ceF16ff127CE");
		expect(result.amount()).toEqual(BigNumber.make(1));
		expect(result.fee()).toEqual(BigNumber.make("0.1"));
	});

	test("#wallet", async () => {
		nock(/.+/)
			.post("/")
			.reply(200, require(`${fixtures}/wallet.json`));

		const result = await subject.wallet(identity.address);

		expect(result).toBeInstanceOf(WalletData);
		expect(result.address()).toBe(identity.address);
		expect(result.balance().available).toEqual(BigNumber.make(499890000000));
		expect(result.nonce()).toEqual(BigNumber.make(1));
	});

	describe("#broadcast", () => {
		it("should pass", async () => {
			nock(/.+/)
				.post("/")
				.reply(200, require(`${fixtures}/broadcast-minimum-gas-price.json`))
				.post("/")
				.reply(200, require(`${fixtures}/broadcast-create.json`))
				.post("/")
				.reply(200, require(`${fixtures}/broadcast-success.json`));

			const signedData = {
				sender: "",
				recipient: "",
				amount: "",
				fee: "2000000000",
			};

			const broadcastData = JSON.stringify(require(`${fixtures}/broadcast-request-payload.json`));
			const transaction = new SignedTransactionData("id", signedData, broadcastData);
			const result = await subject.broadcast([transaction]);

			expect(result).toEqual({
				accepted: ["id"],
				rejected: [],
				errors: {},
			});
		});

		it("should fail", async () => {
			nock(/.+/)
				.post("/")
				.reply(200, require(`${fixtures}/broadcast-minimum-gas-price.json`))
				.post("/")
				.reply(200, require(`${fixtures}/broadcast-failure.json`));

			const signedData = {
				sender: "",
				recipient: "",
				amount: "",
				fee: "2000000000", // keeping it high here to test lib code
			};

			const broadcastData = JSON.stringify(require(`${fixtures}/broadcast-request-payload.json`));
			const transaction = new SignedTransactionData("id", signedData, broadcastData);
			const result = await subject.broadcast([transaction]);

			expect(result).toEqual({
				accepted: [],
				rejected: ["id"],
				errors: {
					id: ["GasPrice 1 lower than minimum allowable 2000000000"],
				},
			});
		});
	});
});
