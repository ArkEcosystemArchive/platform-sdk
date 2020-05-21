import "jest-extended";
import nock from "nock";

import { ARK } from "@arkecosystem/platform-sdk-ark";

import { Wallet } from "../../src/wallets/wallet";
import { WalletRepository } from "../../src/wallets/wallet-repository";
import { identity } from "../__fixtures__/identity";
import { LocalStorage } from "../../src/storage/local";

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

	const storage = new LocalStorage("localstorage");

	wallet = await Wallet.fromPassphrase({ passphrase: identity.passphrase, coin: ARK, network: "devnet", storage });

	subject = new WalletRepository(storage, [wallet]);
});

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

test("WalletRepository#all", async () => {
	expect(subject.all()).toEqual([wallet]);
});

test("WalletRepository#push", async () => {
	expect(subject.all()).toHaveLength(1);

	subject.push(wallet);

	expect(subject.all()).toHaveLength(2);
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

test("WalletRepository#createFromPassphrase", async () => {
	expect(subject.all()).toHaveLength(1);

	await subject.createFromPassphrase({ passphrase: identity.passphrase, coin: ARK, network: "devnet" });

	expect(subject.all()).toHaveLength(2);
});
