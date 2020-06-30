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

describe("destruct", () => {
	it("should pass with a resolved transport closure", async () => {
		const lsk = await createMockService("");

		await expect(lsk.destruct()).resolves.toBeUndefined();
	});
});

describe("getVersion", () => {
	it("should pass with an app version", async () => {
		const lsk = await createMockService(ledger.appVersion.record);

		await expect(lsk.getVersion()).resolves.toEqual(ledger.appVersion.result);
	});
});

describe("getPublicKey", () => {
	it("should pass with a compressed publicKey", async () => {
		const lsk = await createMockService(ledger.publicKey.record);

		await expect(lsk.getPublicKey(ledger.bip44.path)).resolves.toEqual(ledger.publicKey.result);
	});
});

describe("signTransaction", () => {
	it("should pass with a signature", async () => {
		const lsk = await createMockService(ledger.transaction.record);

		await expect(
			lsk.signTransaction(ledger.bip44.path, Buffer.from(ledger.transaction.payload, "hex")),
		).resolves.toEqual(ledger.transaction.result);
	});
});

describe("signTransactionWithSchnorr", () => {
	it("should fail with a 'NotImplemented' error", async () => {
		const lsk = await createMockService("");

		await expect(lsk.signTransactionWithSchnorr("", Buffer.alloc(0))).rejects.toThrow();
	});
});

describe("signMessage", () => {
	it("should pass with a signature", async () => {
		const lsk = await createMockService(ledger.message.record);

		await expect(lsk.signMessage(ledger.bip44.path, Buffer.from(ledger.message.payload, "hex"))).resolves.toEqual(
			ledger.message.result,
		);
	});
});

describe("signMessageWithSchnorr", () => {
	it("should fail with a 'NotImplemented' error", async () => {
		const lsk = await createMockService("");

		await expect(lsk.signMessageWithSchnorr("", Buffer.alloc(0))).rejects.toThrow();
	});
});
