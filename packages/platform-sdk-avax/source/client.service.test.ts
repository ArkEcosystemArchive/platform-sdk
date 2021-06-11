import { Collections, IoC, Services } from "@arkecosystem/platform-sdk";

import { createService } from "../test/mocking";
import { TransactionData } from "./transaction.dto";
import { WalletData } from "./wallet.dto";
import { DataTransferObjects } from "./coin.dtos";
import { ClientService } from "./client.service";

let subject: ClientService;

beforeAll(() => {
	subject = createService(ClientService, undefined, (container) => {
		container.constant(IoC.BindingType.Container, container);
		container.constant(IoC.BindingType.DataTransferObjects, DataTransferObjects);
		container.singleton(IoC.BindingType.DataTransferObjectService, Services.AbstractDataTransferObjectService);
	});
});

describe("ClientService", () => {
	describe("#transaction", () => {
		it("should succeed", async () => {
			const result = await subject.transaction("2qwe2tsgBZ5yqq6Qg2eTDPJ1tVVZZ9KoPLMDwurLTGTNpGMFr9");

			expect(result).toBeInstanceOf(TransactionData);
		});
	});

	describe("#wallet", () => {
		it("should succeed", async () => {
			const result = await subject.wallet("X-fuji1my5kqjufcshudkzu4xdt5rlqk99j9nwseclkwq");

			expect(result).toBeInstanceOf(WalletData);
		});
	});

	describe("#delegates", () => {
		it("should succeed", async () => {
			await expect(subject.delegates()).resolves.toBeInstanceOf(Collections.WalletDataCollection);
		});
	});
});
