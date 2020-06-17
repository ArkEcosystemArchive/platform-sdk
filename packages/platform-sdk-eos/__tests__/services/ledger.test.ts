import "jest-extended";
import { createTransportReplayer, RecordStore } from "@ledgerhq/hw-transport-mocker";
import { LedgerService } from "../../src/services/ledger";
import { ledger } from "../__fixtures__/ledger";
import { createConfig } from "../helpers";

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
		const subject = await createMockService("");

		await expect(subject.destruct()).resolves.toBeUndefined();
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
		const subject = await createMockService(ledger.transaction.record);

		await expect(
			subject.signTransaction(ledger.bip44.path, Buffer.from(ledger.transaction.payload, "hex")),
		).resolves.toEqual(ledger.transaction.result);
	});
});

describe("signTransactionWithSchnorr", () => {
	it("should fail with a 'NotImplemented' error", async () => {
		const subject = await createMockService("");

		await expect(subject.signTransactionWithSchnorr("", Buffer.alloc(0))).rejects.toThrow();
	});
});

describe("signMessage", () => {
	it("should fail with a 'NotImplemented' error", async () => {
		const subject = await createMockService("");

		await expect(subject.signMessage("", Buffer.alloc(0))).rejects.toThrow();
	});
});

describe("signMessageWithSchnorr", () => {
	it("should fail with a 'NotImplemented' error", async () => {
		const subject = await createMockService("");

		await expect(subject.signMessageWithSchnorr("", Buffer.alloc(0))).rejects.toThrow();
	});
});
