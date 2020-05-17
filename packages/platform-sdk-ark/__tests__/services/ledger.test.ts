import "jest-extended";
import { createTransportReplayer, RecordStore } from "@ledgerhq/hw-transport-mocker";
import { LedgerService } from "../../src/services/ledger";
import { ledger } from "../__fixtures__/ledger";
import { createConfig } from "../helpers";

const createMockService = async (record: string) =>
	LedgerService.construct(
		createConfig({
			services: { ledger: { transport: await createTransportReplayer(RecordStore.fromString(record)).open() } },
		}),
	);

describe("getVersion", () => {
	it("should pass with an app version", async () => {
		await createMockService(ledger.appVersion.record).then(async (ark) => {
			await expect(ark.getVersion()).resolves.toEqual(ledger.appVersion.result);
		});
	});
});

describe("getPublicKey", () => {
	it("should pass with a compressed publicKey", async () => {
		await createMockService(ledger.publicKey.record).then(async (ark) => {
			await expect(ark.getPublicKey(ledger.bip44.path)).resolves.toEqual(ledger.publicKey.result);
		});
	});
});

describe("signTransaction", () => {
	it("should pass with an ecdsa signature", async () => {
		await createMockService(ledger.transaction.ecdsa.record).then(async (ark) => {
			await expect(
				ark.signTransaction(ledger.bip44.path, Buffer.from(ledger.transaction.ecdsa.payload, "hex")),
			).resolves.toEqual(ledger.transaction.ecdsa.result);
		});
	});
});

describe("signTransactionWithSchnorr", () => {
	it("should pass with a /*schnorr*/ ecdsa signature", async () => {
		await createMockService(ledger.transaction.schnorr.record).then(async (ark) => {
			await expect(
				ark.signTransactionWithSchnorr(
					ledger.bip44.path,
					Buffer.from(ledger.transaction.schnorr.payload, "hex"),
				),
			).resolves.toEqual(ledger.transaction.schnorr.result);
		});
	});
});

describe("signMessage", () => {
	it("should pass with an ecdsa signature", async () => {
		await createMockService(ledger.message.ecdsa.record).then(async (ark) => {
			await expect(
				ark.signMessage(ledger.bip44.path, Buffer.from(ledger.message.ecdsa.payload, "hex")),
			).resolves.toEqual(ledger.message.ecdsa.result);
		});
	});
});

describe("signMessageWithSchnorr", () => {
	it("should pass with a /*schnorr*/ ecdsa signature", async () => {
		await createMockService(ledger.message.schnorr.record).then(async (ark) => {
			await expect(
				ark.signMessageWithSchnorr(ledger.bip44.path, Buffer.from(ledger.message.schnorr.payload, "hex")),
			).resolves.toEqual(ledger.message.schnorr.result);
		});
	});
});
