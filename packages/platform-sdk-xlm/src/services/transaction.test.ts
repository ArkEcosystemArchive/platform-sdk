import "jest-extended";

import { IoC, Signatories } from "@arkecosystem/platform-sdk";
import nock from "nock";

import { identity } from "../../test/fixtures/identity";
import { TransactionService } from "./transaction";
import { AddressService } from "./address";
import { DataTransferObjectService } from "./data-transfer-object";
import { KeyPairService } from "./key-pair";
import { PublicKeyService } from "./public-key";
import { createService } from "../../test/helpers";

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
		it("should verify", async () => {
			nock("https://horizon-testnet.stellar.org")
				.get("/accounts/GCGYSPQBSQCJKNDXDISBSXAM3THK7MACUVZGEMXF6XRZCPGAWCUGXVNC")
				.query(true)
				.reply(200, require(`${__dirname}/../../test/fixtures/client/wallet.json`));

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
					amount: 1,
					to: identity.address,
				},
			});

			expect(result).toBeObject();
			expect(result.amount().toNumber()).toBe(10_000_000);
		});
	});
});
