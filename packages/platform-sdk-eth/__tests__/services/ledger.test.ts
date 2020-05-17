import "jest-extended";
import { createTransportReplayer, RecordStore } from "@ledgerhq/hw-transport-mocker";
import { LedgerService } from "../../src/services/ledger";
import { ledger } from "../__fixtures__/ledger";
import { createConfig } from "../helpers";

const createMockService = async (record: string) => {
	return await LedgerService.construct(
		createConfig({
			services: {
				ledger: {
					transport: await createTransportReplayer(RecordStore.fromString(record)).create(),
				},
			},
		}),
	);
};

describe("destruct", () => {
	it("should pass with a resolved transport closure", async () => {
		const trx = await createMockService("");

		await expect(trx.destruct()).resolves.toBeUndefined();
	});
});

describe("getVersion", () => {
	it("should pass with an app version", async () => {
		const trx = await createMockService(ledger.appVersion.record);

		await expect(trx.getVersion()).resolves.toEqual(ledger.appVersion.result);
	});
});

describe("getPublicKey", () => {
	it("should pass with a compressed publicKey", async () => {
		const trx = await createMockService(ledger.publicKey.record);

		await expect(trx.getPublicKey(ledger.bip44.path)).resolves.toEqual(ledger.publicKey.result);
	});
});

describe("signTransaction", () => {
	it("should pass with a signature", async () => {
		const trx = await createMockService(ledger.transaction.record);

		const result = await trx.signTransaction(ledger.bip44.path, Buffer.from(ledger.transaction.payload, "hex"));

		expect(JSON.parse(result)).toEqual(ledger.transaction.result);
	});
});

describe("signTransactionWithSchnorr", () => {
	it("should fail with a 'NotImplemented' error", async () => {
		const trx = await createMockService("");

		await expect(trx.signTransactionWithSchnorr("", Buffer.alloc(0))).rejects.toThrow();
	});
});

describe("signMessage", () => {
	it("should pass with a signature", async () => {
		const trx = await createMockService(ledger.message.record);

		const result = await trx.signMessage(ledger.bip44.path, Buffer.from(ledger.message.payload, "hex"));

		expect(JSON.parse(result)).toEqual(ledger.message.result);
	});
});

describe("signMessageWithSchnorr", () => {
	it("should fail with a 'NotImplemented' error", async () => {
		const trx = await createMockService("");

		await expect(trx.signMessageWithSchnorr("", Buffer.alloc(0))).rejects.toThrow();
	});
});
