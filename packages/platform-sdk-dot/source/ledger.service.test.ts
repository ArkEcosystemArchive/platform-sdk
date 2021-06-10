import "jest-extended";

import { IoC, Services } from "@arkecosystem/platform-sdk";
import { createTransportReplayer, RecordStore } from "@ledgerhq/hw-transport-mocker";

import { ledger } from "../test/fixtures/ledger";
import { createService } from "../test/helpers";
import { DataTransferObjects } from "./coin.dtos";
import { AddressService } from "./address.service";
import { ClientService } from "./client.service";
import { LedgerService } from "./ledger.service";

const createMockService = async (record: string) => {
	const transport = createService(LedgerService, undefined, (container) => {
		container.constant(IoC.BindingType.Container, container);
		container.singleton(IoC.BindingType.AddressService, AddressService);
		container.singleton(IoC.BindingType.ClientService, ClientService);
		container.constant(IoC.BindingType.DataTransferObjects, DataTransferObjects);
		container.singleton(IoC.BindingType.DataTransferObjectService, Services.AbstractDataTransferObjectService);
	});

	await transport.connect(createTransportReplayer(RecordStore.fromString(record)));

	return transport;
};

describe("constructor", () => {
	it("should pass with an empty configuration", async () => {
		const transport = createService(LedgerService);

		expect(transport).toBeInstanceOf(LedgerService);
	});
});

describe("destruct", () => {
	it("should pass with a resolved transport closure", async () => {
		const subject = await createMockService("");

		await expect(subject.__destruct()).resolves.toBeUndefined();
	});
});

describe("getVersion", () => {
	it("should generate an app version", async () => {
		const polkadot = await createMockService(ledger.appVersion.record);

		await expect(polkadot.getVersion()).resolves.toEqual(ledger.appVersion.result);
	});
});

describe("getPublicKey", () => {
	it("should generate a publicKey", async () => {
		const polkadot = await createMockService(ledger.publicKey.record);

		await expect(polkadot.getPublicKey(ledger.bip44.path)).resolves.toEqual(ledger.publicKey.result);
	});
});

describe("signTransaction", () => {
	it("should generate output from a transaction", async () => {
		const polkadot = await createMockService(ledger.transaction.record);

		await expect(
			polkadot.signTransaction(ledger.bip44.path, Buffer.from(ledger.transaction.payload, "hex")),
		).resolves.toEqual(ledger.transaction.result);
	});
});

describe("signMessage", () => {
	it("should fail to generate an output from a message", async () => {
		const polkadot = await createMockService("");

		await expect(polkadot.signMessage("", Buffer.alloc(0))).rejects.toThrow();
	});
});
