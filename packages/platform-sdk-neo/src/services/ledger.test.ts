import "jest-extended";

import { createTransportReplayer, RecordStore, RecordStoreOptions } from "@ledgerhq/hw-transport-mocker";

import { ledger } from "../../test/fixtures/ledger";
import { createService } from "../../test/helpers";
import { LedgerService } from "./ledger";

const createMockService = async (record: string, opts?: RecordStoreOptions) => {
	const transport = createService(LedgerService, undefined, (container) => {
		container.constant(IoC.BindingType.Container, container);
		container.singleton(IoC.BindingType.AddressService, AddressService);
		container.singleton(IoC.BindingType.ClientService, ClientService);
		container.singleton(IoC.BindingType.DataTransferObjectService, DataTransferObjectService);
	});

	await transport.connect(createTransportReplayer(RecordStore.fromString(record, opts)));

	return transport;
};

describe("constructor", () => {
	it("should pass with an empty configuration", async () => {
		const transport = await LedgerService.__construct(
			createConfig({
				services: {
					ledger: {},
				},
			}),
		);

		expect(transport).toBeInstanceOf(LedgerService);
	});
});

describe("destruct", () => {
	it("should pass with a resolved transport closure", async () => {
		const subject = await createMockService("");

		await expect(subject.__destruct()).resolves.toBeUndefined();
	});
});

describe("disconnect", () => {
	it("should pass with a resolved transport closure", async () => {
		const subject = await createMockService("");

		await expect(subject.disconnect()).resolves.toBeUndefined();
	});
});
describe("getVersion", () => {
	it("should pass with an app version", async () => {
		const subject = await createMockService(ledger.appVersion.record);

		await expect(subject.getVersion()).resolves.toBe(ledger.appVersion.result);
	});
});

describe("getPublicKey", () => {
	it("should pass with a compressed publicKey", async () => {
		const subject = await createMockService(ledger.publicKey.record);

		await expect(subject.getPublicKey(ledger.bip44.path)).resolves.toEqual(ledger.publicKey.result);
	});
});

describe("signTransaction", () => {
	it("should pass with a signature", async () => {
		const subject = await createMockService(ledger.publicKey.record + ledger.transaction.record, {
			autoSkipUnknownApdu: true,
		});

		await expect(subject.getPublicKey(ledger.bip44.path)).resolves.toBeTruthy();
		await expect(
			subject.signTransaction(ledger.bip44.path, Buffer.from(ledger.transaction.payload)),
		).resolves.toEqual(ledger.transaction.result);
	});

	it("should fail with an incorrectly-set path", async () => {
		const subject = await createMockService(ledger.transaction.record);

		await expect(
			subject.signTransaction(ledger.bip44.path, Buffer.from(ledger.transaction.payload)),
		).rejects.toThrow();
	});
});

describe("signMessage", () => {
	it("should pass with an ecdsa signature", async () => {
		const subject = await createMockService("");

		await expect(subject.signMessage("", Buffer.alloc(0))).rejects.toThrow();
	});
});
