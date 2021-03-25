import "jest-extended";
import "reflect-metadata";

import { decrypt, encrypt } from "bip38";
import nock from "nock";
import { decode } from "wif";

import { bootContainer } from "../../../../test/helpers";
import { Profile } from "../profiles/profile";
import { WalletFactory } from "./wallet.factory";
import { WalletData } from "../../../contracts";

jest.setTimeout(60000);

let subject: WalletFactory;

beforeAll(() => {
	bootContainer();

	nock.disableNetConnect();

	subject = new WalletFactory(new Profile({ id: "id", name: "name", avatar: "avatar", data: "" }));
});

beforeEach(async () => {
	nock.cleanAll();

	nock(/.+/)
		.get("/api/node/configuration")
		.reply(200, require("../../../../test/fixtures/client/configuration.json"))
		.get("/api/peers")
		.reply(200, require("../../../../test/fixtures/client/peers.json"))
		.get("/api/node/configuration/crypto")
		.reply(200, require("../../../../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/node/syncing")
		.reply(200, require("../../../../test/fixtures/client/syncing.json"))
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require("../../../../test/fixtures/client/wallet.json"))
		.persist();
});

test("#fromMnemonic", async () => {
	const wallet = await subject.fromMnemonic({
		coin: "ARK",
		network: "ark.devnet",
		mnemonic: "this is a top secret passphrase",
	});

	expect(wallet.address()).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
	expect(wallet.publicKey()).toBe("034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192");
});

test("#fromAddress", async () => {
	const wallet = await subject.fromAddress({
		coin: "ARK",
		network: "ark.devnet",
		address: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
	});

	expect(wallet.address()).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
	expect(wallet.publicKey()).toBe("034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192");
});

test("#fromPublicKey", async () => {
	const wallet = await subject.fromPublicKey({
		coin: "ARK",
		network: "ark.devnet",
		publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
	});

	expect(wallet.address()).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
	expect(wallet.publicKey()).toBe("034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192");
});

test("#fromPrivateKey", async () => {
	const wallet = await subject.fromPrivateKey({
		coin: "ARK",
		network: "ark.devnet",
		privateKey: "d8839c2432bfd0a67ef10a804ba991eabba19f154a3d707917681d45822a5712",
	});

	expect(wallet.address()).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
	expect(wallet.publicKey()).toBe("034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192");
});

test("#fromAddressWithLedgerPath", async () => {
	const wallet = await subject.fromAddressWithLedgerPath({
		coin: "ARK",
		network: "ark.devnet",
		address: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
		path: "1",
	});

	expect(wallet.address()).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
	expect(wallet.publicKey()).toBe("034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192");
});

test("#fromMnemonicWithEncryption", async () => {
	const wallet = await subject.fromMnemonicWithEncryption({
		coin: "ARK",
		network: "ark.devnet",
		mnemonic: "this is a top secret passphrase",
		password: "password",
	});

	expect(wallet.address()).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
	expect(wallet.publicKey()).toBe("034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192");
	expect(wallet.data().get(WalletData.Bip38EncryptedKey)).toBeString();

	// @ts-ignore
	expect(decrypt(wallet.data().get(WalletData.Bip38EncryptedKey)!, "password").privateKey.toString("hex")).toBe(
		"d8839c2432bfd0a67ef10a804ba991eabba19f154a3d707917681d45822a5712",
	);
});

test("#fromWIF", async () => {
	const wallet = await subject.fromWIF({
		coin: "ARK",
		network: "ark.devnet",
		wif: "SGq4xLgZKCGxs7bjmwnBrWcT4C1ADFEermj846KC97FSv1WFD1dA",
	});

	expect(wallet.address()).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
	expect(wallet.publicKey()).toBe("034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192");
});

test("#fromWIFWithEncryption", async () => {
	const { compressed, privateKey } = decode("SGq4xLgZKCGxs7bjmwnBrWcT4C1ADFEermj846KC97FSv1WFD1dA");

	const wallet = await subject.fromWIFWithEncryption({
		coin: "ARK",
		network: "ark.devnet",
		wif: encrypt(privateKey, compressed, "password"),
		password: "password",
	});

	expect(wallet.address()).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
	expect(wallet.publicKey()).toBe("034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192");
});
