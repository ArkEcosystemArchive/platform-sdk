import "jest-extended";

import { IoC, Services, Signatories } from "@arkecosystem/platform-sdk";
import nock from "nock";

import { identity } from "../test/fixtures/identity";
import { createService } from "../test/mocking";
import { DataTransferObjects } from "./coin.dtos";
import { AddressService } from "./address.service";
import { KeyPairService } from "./key-pair.service";
import { PrivateKeyService } from "./private-key.service";
import { PublicKeyService } from "./public-key.service";
import { TransactionService } from "./transaction.service";

let subject: TransactionService;

beforeAll(async () => {
	subject = createService(TransactionService, undefined, (container) => {
		container.constant(IoC.BindingType.Container, container);
		container.singleton(IoC.BindingType.AddressService, AddressService);
		container.constant(IoC.BindingType.DataTransferObjects, DataTransferObjects);
		container.singleton(IoC.BindingType.DataTransferObjectService, Services.AbstractDataTransferObjectService);
		container.singleton(IoC.BindingType.KeyPairService, KeyPairService);
		container.singleton(IoC.BindingType.PublicKeyService, PublicKeyService);
		container.singleton(IoC.BindingType.PrivateKeyService, PrivateKeyService);
	});
});

beforeAll(() => {
	nock.disableNetConnect();
});

describe("TransactionService", () => {
	test("#transfer", async () => {
		nock("https://api.shasta.trongrid.io")
			.post("/wallet/createtransaction")
			.reply(200, require(`${__dirname}/../test/fixtures/crypto/transfer.json`))
			.post("/wallet/broadcasttransaction")
			.reply(200, { result: true, txid: "920048e37005eb84299fe99ae666dcfe220a5befa587eec9c36c9e75dc37f821" });

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
				to: "TEre3kN6JdPzqCNpiZT8JWM4kt8iGrg1Rm",
				amount: 1,
			},
		});

		expect(result).toBeObject();
		expect(result.amount().toNumber()).toBe(1_000_000);
	});
});
