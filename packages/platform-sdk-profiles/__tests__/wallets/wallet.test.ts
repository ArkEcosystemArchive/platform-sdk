import "jest-extended";
import nock from "nock";

import { Utils } from "@arkecosystem/platform-sdk";
import { ARK } from "@arkecosystem/platform-sdk-ark";

import { Wallet } from "../../src/wallets/wallet";
import { identity } from "../__fixtures__/identity";

let subject: Wallet;

beforeEach(async () => {
	nock(/.+/)
		.get("/api/node/configuration/crypto")
		.reply(200, require(`${__dirname}/../__fixtures__/client/cryptoConfiguration.json`))
		.get("/api/node/syncing")
		.reply(200, require(`${__dirname}/../__fixtures__/client/syncing.json`))
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require(`${__dirname}/../__fixtures__/client/wallet.json`))
		.persist();

	subject = await Wallet.fromPassphrase(identity.passphrase, ARK, "devnet");
});

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

test("Wallet#coin", async () => {
	expect(subject.coin()).toEqual("ARK");
});

test("Wallet#network", async () => {
	expect(subject.network()).toEqual("devnet");
});

test("Wallet#address", async () => {
	expect(subject.address()).toEqual(identity.address);
});

test("Wallet#publicKey", async () => {
	expect(subject.publicKey()).toEqual(identity.publicKey);
});

test("Wallet#balance", async () => {
	expect(subject.balance()).toEqual(Utils.BigNumber.make("55827093444556"));
});

test("Wallet#nonce", async () => {
	expect(subject.nonce()).toEqual(Utils.BigNumber.make("111932"));
});
