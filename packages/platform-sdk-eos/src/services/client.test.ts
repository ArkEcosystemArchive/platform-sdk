import "jest-extended";

import { Test } from "@arkecosystem/platform-sdk";
import nock from "nock";

import { createService } from "../../test/helpers";
import { container } from "../container";
import { WalletData } from "../dto";
import { ClientService } from "./client";

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
});

describe("ClientService", () => {
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
