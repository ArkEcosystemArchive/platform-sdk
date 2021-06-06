import "jest-extended";

import { IoC, Signatories } from "@arkecosystem/platform-sdk";

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

describe("TransactionService", () => {
	describe("#transfer", () => {
		it("should sign transaction", async () => {
			const result = await subject.transfer({
				signatory: new Signatories.Signatory(
					new Signatories.MnemonicSignatory({
						signingKey: identity.mnemonic,
						address: identity.bech32Address,
						publicKey: identity.publicKey,
						privateKey: identity.privateKey,
					}),
				),
				data: {
					amount: 100,
					to: identity.bech32Address,
				},
				fee: 2000,
				feeLimit: 50,
				nonce: "1",
			});

			expect(result).toBeInstanceOf(SignedTransactionData);
			expect(typeof result.toBroadcast()).toBe("string");
			expect(result.amount().toNumber()).toBe(100_000_000_000_000);
		});
	});
});
