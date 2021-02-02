import "jest-extended";

import { createTransportReplayer, RecordStore } from "@ledgerhq/hw-transport-mocker";

import { ledger } from "../../test/fixtures/ledger";
import { createConfig } from "../../test/helpers";
import { LedgerService } from "./ledger";

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
	it("should fail to generate an output from a transaction", async () => {
		const polkadot = await createMockService("");

		await expect(polkadot.signTransaction("", Buffer.alloc(0))).rejects.toThrow();
	});
});

describe("signMessage", () => {
	it("should fail to generate an output from a message", async () => {
		const polkadot = await createMockService("");

		await expect(polkadot.signMessage("", Buffer.alloc(0))).rejects.toThrow();
	});
});
