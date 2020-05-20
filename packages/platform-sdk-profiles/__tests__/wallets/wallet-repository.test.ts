import "jest-extended";
import nock from "nock";

import { ARK } from "@arkecosystem/platform-sdk-ark";

import { Wallet } from "../../src/wallets/wallet";
import { WalletRepository } from "../../src/wallets/wallet-repository";
import { identity } from "../__fixtures__/identity";

let subject: WalletRepository;
let wallet: Wallet;

beforeEach(async () => {
	nock(/.+/)
		.get("/api/node/configuration/crypto")
		.reply(200, require(`${__dirname}/../__fixtures__/client/cryptoConfiguration.json`))
		.get("/api/node/syncing")
		.reply(200, require(`${__dirname}/../__fixtures__/client/syncing.json`))
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require(`${__dirname}/../__fixtures__/client/wallet.json`))
		.persist();

	wallet = await Wallet.fromPassphrase(identity.passphrase, ARK, "devnet");

	subject = new WalletRepository([wallet]);
});

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

test("WalletRepository#all", async () => {
	expect(subject.all()).toEqual([wallet]);
});

test("WalletRepository#findByAddress", async () => {
	expect(subject.findByAddress(identity.address)).toEqual(wallet);
});

test("WalletRepository#findByPublicKey", async () => {
	expect(subject.findByPublicKey(identity.publicKey)).toEqual(wallet);
});

test("WalletRepository#findByCoin", async () => {
	expect(subject.findByCoin("ARK")).toEqual([wallet]);
});
