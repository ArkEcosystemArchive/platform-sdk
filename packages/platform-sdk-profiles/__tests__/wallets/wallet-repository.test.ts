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

	wallet = await Wallet.fromMnemonic({ passphrase: identity.passphrase, coin: ARK, network: "devnet", storage });

	subject = new WalletRepository(storage, [wallet]);
});

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

test("#all", async () => {
	expect(subject.all()).toEqual([wallet]);
});

test("#push", async () => {
	expect(subject.all()).toHaveLength(1);

	subject.push(wallet);

	expect(subject.all()).toHaveLength(2);
});

test("#findByAddress", async () => {
	expect(subject.findByAddress(identity.address)).toEqual(wallet);
});

test("#findByPublicKey", async () => {
	expect(subject.findByPublicKey(identity.publicKey)).toEqual(wallet);
});

test("#findByCoin", async () => {
	expect(subject.findByCoin("ARK")).toEqual([wallet]);
});

test("#createFromPassphrase", async () => {
	subject.flush();

	const options = { passphrase: identity.passphrase, coin: ARK, network: "devnet" };

	expect(subject.all()).toHaveLength(0);

	await subject.createFromPassphrase(options);

	expect(subject.all()).toHaveLength(1);

	await expect(subject.createFromPassphrase(options)).rejects.toThrowError("already exists");

	expect(subject.all()).toHaveLength(1);
});
