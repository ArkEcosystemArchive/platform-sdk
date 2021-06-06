import "jest-extended";

import { IoC, Signatories } from "@arkecosystem/platform-sdk";
import nock from "nock";

import { AddressService } from "./address";
import { DataTransferObjectService } from "./data-transfer-object";
import { KeyPairService } from "./key-pair";
import { PublicKeyService } from "./public-key";
import { TransactionService } from "./transaction";
import { ClientService } from "./client";
import { createService } from "../../test/helpers";

let subject: TransactionService;

beforeAll(async () => {
	subject = createService(TransactionService, undefined, (container) => {
		container.constant(IoC.BindingType.Container, container);
		container.singleton(IoC.BindingType.AddressService, AddressService);
		container.singleton(IoC.BindingType.ClientService, ClientService);
		container.singleton(IoC.BindingType.DataTransferObjectService, DataTransferObjectService);
		container.singleton(IoC.BindingType.KeyPairService, KeyPairService);
		container.singleton(IoC.BindingType.PublicKeyService, PublicKeyService);
	});
});

beforeAll(() => nock.disableNetConnect());

describe("TransactionService", () => {
	describe("#transfer", () => {
		it("should verify", async () => {
			nock("https://stargate.cosmos.network")
				.get("/auth/accounts/cosmos1fvxjdyfdvat5g0ee7jmyemwl2n95ad7negf7ap")
				.reply(200, require(`${__dirname}/../../test/fixtures/client/wallet.json`))
				.get("/bank/balances/cosmos1fvxjdyfdvat5g0ee7jmyemwl2n95ad7negf7ap")
				.reply(200, require(`${__dirname}/../../test/fixtures/client/wallet-balance.json`));

			const result = await subject.transfer({
				signatory: new Signatories.Signatory(
					new Signatories.MnemonicSignatory({
						signingKey: "this is a top secret passphrase",
						address: "cosmos1fvxjdyfdvat5g0ee7jmyemwl2n95ad7negf7ap",
						publicKey: "publicKey",
						privateKey: "privateKey",
					}),
				),
				data: {
					amount: 1,
					to: "cosmos1fvxjdyfdvat5g0ee7jmyemwl2n95ad7negf7ap",
				},
			});

			expect(result).toBeObject();
		});
	});
});
