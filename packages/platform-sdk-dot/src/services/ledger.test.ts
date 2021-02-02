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
	it("should fail to generate an app version", async () => {
		const polkadot = await createMockService("");

		await expect(polkadot.getVersion()).rejects.toThrow();;
	});
});

describe("getPublicKey", () => {
	it("should fail to generate a publicKey", async () => {
		const polkadot = await createMockService("");

		await expect(polkadot.getPublicKey("")).rejects.toThrow();
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
