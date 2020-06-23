import "jest-extended";
import nock from "nock";
import { v4 as uuidv4 } from "uuid";

import { Coins } from "@arkecosystem/platform-sdk";
import { ARK } from "@arkecosystem/platform-sdk-ark";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { Wallet } from "../src/wallet";
import { identity } from "./__fixtures__/identity";
import { container } from "../src/container";
import { Identifiers } from "../src/contracts";
import { HttpClient } from "./stubs/client";

let subject: Wallet;

beforeEach(async () => {
	nock.cleanAll();

	nock(/.+/)
		.get("/api/node/configuration")
		.reply(200, require("./__fixtures__/client/configuration.json"))
		.get("/api/node/configuration/crypto")
		.reply(200, require("./__fixtures__/client/cryptoConfiguration.json"))
		.get("/api/node/syncing")
		.reply(200, require("./__fixtures__/client/syncing.json"))
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require("./__fixtures__/client/wallet.json"))
		.persist();

	container.set(Identifiers.HttpClient, new HttpClient());

	subject = new Wallet(uuidv4());

	await subject.setCoin(ARK, "devnet");
	await subject.setIdentity(identity.mnemonic);
});

beforeAll(() => nock.disableNetConnect());

test("#coin", () => {
	expect(subject.coin()).toBeInstanceOf(Coins.Coin);
});

test("#network", () => {
	expect(subject.network()).toEqual({
		crypto: { slip44: 111 },
		currency: { symbol: "DѦ", ticker: "DARK" },
		explorer: "https://dexplorer.ark.io/",
		hosts: [
			"https://dexplorer.ark.io",
			"http://167.114.29.51:4003",
			"http://167.114.29.52:4003",
			"http://167.114.29.53:4003",
			"http://167.114.29.54:4003",
			"http://167.114.29.55:4003",
		],
		id: "devnet",
		name: "Devnet",
	});
});

test("#address", () => {
	expect(subject.address()).toEqual(identity.address);
});

test("#publicKey", () => {
	expect(subject.publicKey()).toEqual(identity.publicKey);
});

test("#balance", () => {
	expect(subject.balance()).toEqual(BigNumber.make("55827093444556"));
});

test("#nonce", () => {
	expect(subject.nonce()).toEqual(BigNumber.make("111932"));
});

describe.each([123, 456, 789])("%s", (slip44) => {
	test("#toObject", () => {
		subject.coin().config().set("network.crypto.slip44", slip44);
		subject.data().set("key", "value");

		const actual: any = subject.toObject();

		expect(actual).toContainAllKeys([
			"id",
			"address",
			"coin",
			"coinConfig",
			"network",
			"publicKey",
			"data",
			"settings",
		]);
		expect(actual.id).toBeString();
		expect(actual.address).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
		expect(actual.coin).toBe("ARK");
		expect(actual.coinConfig).toEqual({
			network: {
				crypto: {
					slip44,
				},
				currency: {
					symbol: "DѦ",
					ticker: "DARK",
				},
				explorer: "https://dexplorer.ark.io/",
				hosts: [
					"https://dexplorer.ark.io",
					"http://167.114.29.51:4003",
					"http://167.114.29.52:4003",
					"http://167.114.29.53:4003",
					"http://167.114.29.54:4003",
					"http://167.114.29.55:4003",
				],
				id: "devnet",
				name: "Devnet",
				voting: {
					enabled: true,
					singular: true,
				},
			},
		});
		expect(actual.network).toBe("devnet");
		expect(actual.publicKey).toBe("034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192");
		expect(actual.data).toBeObject();
		expect(actual.data.key).toBe("value");
		expect(actual.settings).toBeObject();
		expect(actual.settings.AVATAR).toBeString();
	});
});
