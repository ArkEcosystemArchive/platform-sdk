import "jest-extended";

import { IoC, Services, Signatories } from "@arkecosystem/platform-sdk";
import { waitReady } from "@polkadot/wasm-crypto";

import { identity } from "../test/fixtures/identity";
import { createServiceAsync } from "../test/helpers";
import { BindingType } from "./constants";
import { DataTransferObjects } from "./coin.dtos";
import { SignedTransactionData } from "./signed-transaction.dto";
import { createApiPromise, createKeyring } from "./helpers";
import { AddressService } from "./address.service";
import { KeyPairService } from "./key-pair.service";
import { PublicKeyService } from "./public-key.service";
import { TransactionService } from "./transaction.service";

let subject: TransactionService;

beforeAll(async () => {
	await waitReady();

	subject = await createServiceAsync(TransactionService, undefined, async (container: IoC.Container) => {
		const apiPromise = await createApiPromise(container.get(IoC.BindingType.ConfigRepository));
		const keyring = createKeyring(container.get(IoC.BindingType.ConfigRepository));

		container.constant(BindingType.ApiPromise, apiPromise);
		container.constant(BindingType.Keyring, keyring);

		container.constant(IoC.BindingType.Container, container);
		container.singleton(IoC.BindingType.AddressService, AddressService);
		container.constant(IoC.BindingType.DataTransferObjects, DataTransferObjects);
		container.singleton(IoC.BindingType.DataTransferObjectService, Services.AbstractDataTransferObjectService);
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
