import "jest-extended";
import nock from "nock";

import { ARK } from "@arkecosystem/platform-sdk-ark";

import { Wallet } from "../../src/wallet";
import { WalletRepository } from "../../src/repositories/wallet-repository";
import { identity } from "../__fixtures__/identity";
import { container } from "../../src/container";
import { Identifiers } from "../../src/contracts";
import { HttpClient } from "../stubs/client";

let subject: WalletRepository;

beforeEach(async () => {
	nock.cleanAll();

	nock(/.+/)
		.get("/api/node/configuration")
		.reply(200, require("../__fixtures__/client/configuration.json"))
		.get("/api/node/configuration/crypto")
		.reply(200, require("../__fixtures__/client/cryptoConfiguration.json"))
		.get("/api/node/syncing")
		.reply(200, require("../__fixtures__/client/syncing.json"))
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require("../__fixtures__/client/wallet.json"))
		.persist();

	container.set(Identifiers.HttpClient, new HttpClient());

	subject = new WalletRepository();

	await subject.import(identity.mnemonic, ARK, "devnet");
});

beforeAll(() => nock.disableNetConnect());

test("#all", async () => {
	expect(subject.all()).toBeObject();
});

test("#allByCoin", async () => {
	expect(subject.allByCoin()).toBeObject();
	expect(subject.allByCoin().DARK).toBeObject();
});

test("#import", async () => {
	subject.flush();

	expect(subject.keys()).toHaveLength(0);

	await subject.import(identity.mnemonic, ARK, "devnet");

	expect(subject.keys()).toHaveLength(1);

	await expect(subject.import(identity.mnemonic, ARK, "devnet")).rejects.toThrowError("already exists");

	expect(subject.keys()).toHaveLength(1);
});

test("#createRandom", async () => {
	subject.flush();

	const wallet = await subject.createRandom(ARK, "devnet");

	expect(wallet.mnemonic).toBeString();
	expect(wallet.wallet).toBeInstanceOf(Wallet);
});

test("#findByAddress", async () => {
	expect(subject.findByAddress(identity.address)).toBeInstanceOf(Wallet);
});

test("#findByPublicKey", async () => {
	expect(subject.findByPublicKey(identity.publicKey)).toBeInstanceOf(Wallet);
});

test("#findByCoin", async () => {
	expect(subject.findByCoin("ARK")).toHaveLength(1);
});
