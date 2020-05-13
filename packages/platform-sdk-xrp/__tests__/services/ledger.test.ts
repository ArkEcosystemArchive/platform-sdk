import "jest-extended";
import { createTransportReplayer, RecordStore } from "@ledgerhq/hw-transport-mocker";
import { LedgerService } from "../../src/services/ledger";
import { ledger } from "../__fixtures__/ledger";

const createMockService = async (record: string) => {
	return await LedgerService.construct({
		transport: await createTransportReplayer(RecordStore.fromString(record)).create(),
	});
};

describe("destruct", () => {
	it("should pass with a resolved transport closure", async () => {
		await createMockService("").then(async (xrp) => {
			await expect(xrp.destruct()).resolves.toBeUndefined();
		});
	});
});

describe("getVersion", () => {
	it("should pass with an app version", async () => {
		await createMockService(ledger.appVersion.record).then(async (xrp) => {
			await expect(xrp.getVersion()).resolves.toEqual(ledger.appVersion.result);
		});
	});
});

describe("getPublicKey", () => {
	it("should pass with a compressed publicKey", async () => {
		await createMockService(ledger.publicKey.record).then(async (xrp) => {
			await expect(xrp.getPublicKey(ledger.bip44.path)).resolves.toEqual(ledger.publicKey.result);
		});
	});
});

describe("signTransaction", () => {
	it("should pass with a signature", async () => {
		await createMockService(ledger.transaction.record).then(async (xrp) => {
			await expect(
				xrp.signTransaction(ledger.bip44.path, Buffer.from(ledger.transaction.payload, "hex")),
			).resolves.toEqual(ledger.transaction.result);
		});
	});
});

describe("signTransactionWithSchnorr", () => {
	it("should fail with a 'NotImplemented' error", async () => {
		await createMockService("").then(async (xrp) => {
			await expect(xrp.signTransactionWithSchnorr("", Buffer.alloc(0))).rejects.toThrow();
		});
	});
});

describe("signMessage", () => {
	it("should fail with a 'NotImplemented' error", async () => {
		await createMockService("").then(async (xrp) => {
			await expect(xrp.signMessage("", Buffer.alloc(0))).rejects.toThrow();
		});
	});
});

describe("signMessageWithSchnorr", () => {
	it("should fail with a 'NotImplemented' error", async () => {
		await createMockService("").then(async (xrp) => {
			await expect(xrp.signMessageWithSchnorr("", Buffer.alloc(0))).rejects.toThrow();
		});
	});
});
