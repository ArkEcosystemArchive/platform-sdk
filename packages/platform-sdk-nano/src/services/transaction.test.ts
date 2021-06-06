import "jest-extended";

import { IoC, Signatories } from "@arkecosystem/platform-sdk";
import nock from "nock";

import { identity } from "../../test/fixtures/identity";
import { createService } from "../../test/helpers";
import { SignedTransactionData } from "../dto/signed-transaction";
import { AddressService } from "./address";
import { DataTransferObjectService } from "./data-transfer-object";
import { KeyPairService } from "./key-pair";
import { PublicKeyService } from "./public-key";
import { TransactionService } from "./transaction";

let subject: TransactionService;

beforeAll(async () => {
	subject = createService(TransactionService, undefined, (container) => {
		container.constant(IoC.BindingType.Container, container);
		container.singleton(IoC.BindingType.AddressService, AddressService);
		container.singleton(IoC.BindingType.DataTransferObjectService, DataTransferObjectService);
		container.singleton(IoC.BindingType.KeyPairService, KeyPairService);
		container.singleton(IoC.BindingType.PublicKeyService, PublicKeyService);
	});
});

afterEach(() => nock.cleanAll());

beforeAll(() => {
	nock.disableNetConnect();
});

describe("TransactionService", () => {
	describe("#transfer", () => {
		it("should sign transaction", async () => {
			nock("https://proxy.nanos.cc/")
				.post("/proxy/")
				.reply(200, require(`${__dirname}/../../test/fixtures/client/account-info.json`));

			const result = await subject.transfer({
				signatory: new Signatories.Signatory(
					new Signatories.MnemonicSignatory({
						signingKey: identity.mnemonic,
						address: identity.address,
						publicKey: identity.publicKey,
						privateKey: identity.privateKey,
					}),
				),
				data: {
					amount: 100,
					to: identity.address,
				},
			});

			expect(result).toBeInstanceOf(SignedTransactionData);
			expect(result.amount().toString()).toBe("100000000000000000000000000000000");
		});
	});
});
