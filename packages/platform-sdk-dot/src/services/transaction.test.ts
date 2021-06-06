import "jest-extended";

import { IoC, Signatories } from "@arkecosystem/platform-sdk";
import { waitReady } from "@polkadot/wasm-crypto";

import { identity } from "../../test/fixtures/identity";
import { SignedTransactionData } from "../dto/signed-transaction";
import { TransactionService } from "./transaction";
import { AddressService } from "./address";
import { DataTransferObjectService } from "./data-transfer-object";
import { KeyPairService } from "./key-pair";
import { PublicKeyService } from "./public-key";
import { createService } from "../../test/helpers";

let subject: TransactionService;

beforeAll(async () => {
	await waitReady();

	subject = createService(TransactionService, undefined, (container) => {
		container.constant(IoC.BindingType.Container, container);
		container.singleton(IoC.BindingType.AddressService, AddressService);
		container.singleton(IoC.BindingType.DataTransferObjectService, DataTransferObjectService);
		container.singleton(IoC.BindingType.KeyPairService, KeyPairService);
		container.singleton(IoC.BindingType.PublicKeyService, PublicKeyService);
	});
});

jest.setTimeout(10000);

describe("TransactionService", () => {
	describe("#transfer", () => {
		it("should verify", async () => {
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
					amount: 12345,
					to: identity.address,
				},
			});

			expect(result).toBeInstanceOf(SignedTransactionData);
			expect(result.amount().toString()).toBe("123450000000000");
		});
	});
});
