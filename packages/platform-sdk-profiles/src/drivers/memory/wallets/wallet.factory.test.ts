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

describe("#fromMnemonic", () => {
	it("should create a wallet using BIP39", async () => {
		const wallet = await subject.fromMnemonic({
			coin: "ARK",
			network: "ark.devnet",
			mnemonic: "this is a top secret passphrase",
		});

		expect(wallet.address()).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
		expect(wallet.publicKey()).toBe("034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192");
	});

	it("should create a wallet using BIP44 (passphrase > address)", async () => {
		const wallet = await subject.fromMnemonic({
			coin: "BTC",
			network: "btc.testnet",
			mnemonic: "this is a top secret passphrase",
			bip: 44,
		});

		expect(wallet.address()).toBe("muJmwqMYzXinDoAxueuCBr5y3e3zca8MXY");
		expect(wallet.publicKey()).toBe("025b7319847965a1dfda25e5337cb6f5bd4665a55fe0b456de2eff79c157d5d21e");
	});

	it("should create a wallet using BIP44 (passphrase > extended public key)", async () => {
		const wallet = await subject.fromMnemonic({
			coin: "ADA",
			network: "ada.testnet",
			mnemonic:
				"excess behave track soul table wear ocean cash stay nature item turtle palm soccer lunch horror start stumble month panic right must lock dress",
			bip: 44,
		});

		expect(wallet.address()).toBe(
			"aec30330deaecdd7503195a0d730256faef87027022b1bdda7ca0a61bca0a55e4d575af5a93bdf4905a3702fadedf451ea584791d233ade90965d608bac57304",
		);
		expect(wallet.publicKey()).toBe(
			"aec30330deaecdd7503195a0d730256faef87027022b1bdda7ca0a61bca0a55e4d575af5a93bdf4905a3702fadedf451ea584791d233ade90965d608bac57304",
		);
	});

	it("should throw if BIP39 is requested but extended public keys are used", async () => {
		await expect(
			subject.fromMnemonic({
				coin: "ADA",
				network: "ada.testnet",
				mnemonic: "this is a top secret passphrase",
			}),
		).rejects.toThrow(
			"The configured network uses extended public keys for derivation. Please pass in BIP44 arguments.",
		);
	});
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
