import "jest-extended";
import { createTransportReplayer, RecordStore } from "@ledgerhq/hw-transport-mocker";
import { LedgerService } from "./ledger";
import { ledger } from "../../test/fixtures/ledger";
import { createConfig } from "../../test/helpers";

const createMockService = async (record: string) => {
	const transport = await LedgerService.construct(createConfig());

	await transport.connect(createTransportReplayer(RecordStore.fromString(record)));

	return transport;
};

describe("constructor", () => {
	it("should pass with an empty configuration", async () => {
		const transport = await LedgerService.construct(
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
		const ark = await createMockService("");

		await expect(ark.destruct()).resolves.toBeUndefined();
	});
});

describe("getVersion", () => {
	it("should pass with an app version", async () => {
		const ark = await createMockService(ledger.appVersion.record);

		await expect(ark.getVersion()).resolves.toEqual(ledger.appVersion.result);
	});
});

describe("getPublicKey", () => {
	it("should pass with a compressed publicKey", async () => {
		const ark = await createMockService(ledger.publicKey.record);

		await expect(ark.getPublicKey(ledger.bip44.path)).resolves.toEqual(ledger.publicKey.result);
	});
});

describe("signTransaction", () => {
	it("should pass with an ecdsa signature", async () => {
		const ark = await createMockService(ledger.transaction.ecdsa.record);

		await expect(
			ark.signTransaction(ledger.bip44.path, Buffer.from(ledger.transaction.ecdsa.payload, "hex")),
		).resolves.toEqual(ledger.transaction.ecdsa.result);
	});
});

describe("signTransactionWithSchnorr", () => {
	it("should pass with a schnorr signature", async () => {
		const ark = await createMockService(ledger.transaction.schnorr.record);

		await expect(
			ark.signTransactionWithSchnorr(ledger.bip44.path, Buffer.from(ledger.transaction.schnorr.payload, "hex")),
		).resolves.toEqual(ledger.transaction.schnorr.result);
	});
});

describe("signMessage", () => {
	it("should pass with an ecdsa signature", async () => {
		const ark = await createMockService(ledger.message.ecdsa.record);

		await expect(
			ark.signMessage(ledger.bip44.path, Buffer.from(ledger.message.ecdsa.payload, "hex")),
		).resolves.toEqual(ledger.message.ecdsa.result);
	});
});

describe("signMessageWithSchnorr", () => {
	it("should pass with a schnorr signature", async () => {
		const ark = await createMockService(ledger.message.schnorr.record);

		await expect(
			ark.signMessageWithSchnorr(ledger.bip44.path, Buffer.from(ledger.message.schnorr.payload, "hex")),
		).resolves.toEqual(ledger.message.schnorr.result);
	});
});
