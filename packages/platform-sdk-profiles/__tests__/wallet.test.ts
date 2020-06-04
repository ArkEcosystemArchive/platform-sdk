import "jest-extended";
import nock from "nock";

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
	nock(/.+/)
		.get("/api/node/configuration/crypto")
		.reply(200, require("./__fixtures__/client/cryptoConfiguration.json"))
		.get("/api/node/syncing")
		.reply(200, require("./__fixtures__/client/syncing.json"))
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require("./__fixtures__/client/wallet.json"))
		.persist();

	container.set(Identifiers.HttpClient, new HttpClient());

	subject = new Wallet();

	await subject.setCoin(ARK, "devnet");
	await subject.setIdentity(identity.mnemonic);
});

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

test("Wallet#coin", () => {
	expect(subject.coin()).toBeInstanceOf(Coins.Coin);
});

test("Wallet#network", () => {
	expect(subject.network()).toEqual("devnet");
});

test("Wallet#address", () => {
	expect(subject.address()).toEqual(identity.address);
});

test("Wallet#publicKey", () => {
	expect(subject.publicKey()).toEqual(identity.publicKey);
});

test("Wallet#balance", () => {
	expect(subject.balance()).toEqual(BigNumber.make("55827093444556"));
});

test("Wallet#nonce", () => {
	expect(subject.nonce()).toEqual(BigNumber.make("111932"));
});

test("Wallet#toObject", () => {
	expect(subject.toObject()).toEqual({
		address: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
		coin: "ARK",
		coinConfig: {
			network: {
				crypto: {
					slip44: 111,
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
			},
		},
		network: "devnet",
		publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
	});
});
