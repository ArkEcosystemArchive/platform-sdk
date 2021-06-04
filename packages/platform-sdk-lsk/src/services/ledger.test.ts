import "jest-extended";

import { createTransportRecorder, createTransportReplayer, RecordStore } from "@ledgerhq/hw-transport-mocker";
import LedgerTransportNodeHID from "@ledgerhq/hw-transport-node-hid-singleton";

// import nock from "nock";
import { ledger } from "../../test/fixtures/ledger";
import { createConfig } from "../../test/helpers";
import { LedgerService } from "./ledger";

const createMockService = async (record: string) => {
	const transport = await LedgerService.__construct(createConfig());

	await transport.connect(createTransportReplayer(RecordStore.fromString(record)));

	return transport;
};

describe("destruct", () => {
	it("should pass with a resolved transport closure", async () => {
		const lsk = await createMockService("");

		await expect(lsk.__destruct()).resolves.toBeUndefined();
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

describe("signMessage", () => {
	it("should pass with a signature", async () => {
		const lsk = await createMockService(ledger.message.record);

		await expect(lsk.signMessage(ledger.bip44.path, Buffer.from(ledger.message.payload, "hex"))).resolves.toEqual(
			ledger.message.result,
		);
	});
});

describe.skip("scan", () => {
	// afterEach(() => nock.cleanAll());

	// beforeAll(() => nock.disableNetConnect());

	const createMockService = async (recordStore: any) => {
		const transport = await LedgerService.__construct(createConfig());

		await transport.connect(createTransportRecorder(LedgerTransportNodeHID, recordStore));
		return transport;
	};

	it("should return scanned wallet", async () => {
		const recordStore = new RecordStore();

		const lsk = await createMockService(recordStore);

		const walletData = await lsk.scan();

		// console.log(recordStore.toString());

		expect(Object.keys(walletData)).toHaveLength(3); // Brian Nano X
		expect(walletData).toMatchSnapshot();

		for (const wallet of Object.values(walletData)) {
			const publicKey: string | undefined = wallet.publicKey();

			if (publicKey) {
				// expect(Address.fromPublicKey(publicKey, { pubKeyHash: 30 })).toBe(wallet.address());
			}

			expect(wallet.toObject()).toMatchSnapshot();
		}
	});
});
