import "jest-extended";

import { createTransportReplayer, RecordStore } from "@ledgerhq/hw-transport-mocker";
import { Contracts } from "@arkecosystem/platform-sdk";

import { ledger } from "../../test/fixtures/ledger";
import { createConfig } from "../../test/helpers";
import { LedgerService } from "./ledger";
import nock from "nock";
import { WalletData } from "../dto";

const createMockService = async (record: string) => {
	const config = createConfig(undefined, {
		networkConfiguration: {
			crypto: require(`${__dirname}/../../test/fixtures/client/cryptoConfiguration.json`).data,
			status: require(`${__dirname}/../../test/fixtures/client/syncing.json`).data
		}
	});
	const transport = await LedgerService.__construct(config);

	await transport.connect(createTransportReplayer(RecordStore.fromString(record)));

	return transport;
};

describe("constructor", () => {
	it("should pass with an empty configuration", async () => {
		const transport = await LedgerService.__construct(
			createConfig({
				services: {
					ledger: {}
				}
			}, {
				networkConfiguration: {
					crypto: require(`${__dirname}/../../test/fixtures/client/cryptoConfiguration.json`).data,
					status: require(`${__dirname}/../../test/fixtures/client/syncing.json`).data,
				}
			})
		);

		expect(transport).toBeInstanceOf(LedgerService);
	});
});

describe("destruct", () => {
	it("should pass with a resolved transport closure", async () => {
		const ark = await createMockService("");

		await expect(ark.__destruct()).resolves.toBeUndefined();
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
	it("should pass with a schnorr signature", async () => {
		const ark = await createMockService(ledger.transaction.schnorr.record);

		await expect(
			ark.signTransaction(ledger.bip44.path, Buffer.from(ledger.transaction.schnorr.payload, "hex")),
		).resolves.toEqual(ledger.transaction.schnorr.result);
	});
});

describe("signMessage", () => {
	it("should pass with a schnorr signature", async () => {
		const ark = await createMockService(ledger.message.schnorr.record);

		await expect(
			ark.signMessage(ledger.bip44.path, Buffer.from(ledger.message.schnorr.payload, "hex")),
		).resolves.toEqual(ledger.message.schnorr.result);
	});
});

describe("scan", () => {

	afterEach(() => nock.cleanAll());

	beforeAll(() => nock.disableNetConnect());

	it("should return scanned wallet", async () => {
		nock(/.+/)
			.get("/api/wallets/D9PbsdY8vyUYW2u6ih3QFyc7DftQ9WrhKL")
			.reply(200, require(`${__dirname}/../../test/fixtures/client/wallet-2.json`));

		const ark = await createMockService(ledger.publicKey.record);

		const walletData: Contracts.WalletData = await ark.scan(ledger.bip44.path);
		expect(walletData).toBeInstanceOf(WalletData);
		expect(walletData.address()).toBe("D9PbsdY8vyUYW2u6ih3QFyc7DftQ9WrhKL");
	});
});
