import "jest-extended";

import { decrypt } from "bip38";
import nock from "nock";

import { bootContainer } from "../../test/helpers";
import { Profile } from "../profiles/profile";
import { WalletFactory } from "./wallet.factory";
import { WalletData } from "./wallet.models";

beforeAll(() => {
	bootContainer();

	nock.disableNetConnect();
});

beforeEach(async () => {
	nock.cleanAll();

	nock(/.+/)
		.get("/api/node/configuration")
		.reply(200, require("../../test/fixtures/client/configuration.json"))
		.get("/api/peers")
		.reply(200, require("../../test/fixtures/client/peers.json"))
		.get("/api/node/configuration/crypto")
		.reply(200, require("../../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/node/syncing")
		.reply(200, require("../../test/fixtures/client/syncing.json"))
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require("../../test/fixtures/client/wallet.json"))
		.persist();
});

test("#fromMnemonic", async () => {
	const wallet = await WalletFactory.fromMnemonic(
		new Profile({ id: "id", name: "name", avatar: "avatar", data: "" }),
		"ARK",
		"ark.devnet",
		"this is a top secret passphrase",
	);

	expect(wallet.address()).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
	expect(wallet.publicKey()).toBe("034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192");
});

test("#fromAddress", async () => {
	const wallet = await WalletFactory.fromAddress(
		new Profile({ id: "id", name: "name", avatar: "avatar", data: "" }),
		"ARK",
		"ark.devnet",
		"D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
	);

	expect(wallet.address()).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
	expect(wallet.publicKey()).toBe("034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192");
});

test("#fromPublicKey", async () => {
	const wallet = await WalletFactory.fromPublicKey(
		new Profile({ id: "id", name: "name", avatar: "avatar", data: "" }),
		"ARK",
		"ark.devnet",
		"034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
	);

	expect(wallet.address()).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
	expect(wallet.publicKey()).toBe("034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192");
});

test("#fromPrivateKey", async () => {
	const wallet = await WalletFactory.fromPrivateKey(
		new Profile({ id: "id", name: "name", avatar: "avatar", data: "" }),
		"ARK",
		"ark.devnet",
		"d8839c2432bfd0a67ef10a804ba991eabba19f154a3d707917681d45822a5712",
	);

	expect(wallet.address()).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
	expect(wallet.publicKey()).toBe("034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192");
});

test("#fromAddressWithLedgerPath", async () => {
	const wallet = await WalletFactory.fromAddressWithLedgerPath(
		new Profile({ id: "id", name: "name", avatar: "avatar", data: "" }),
		"ARK",
		"ark.devnet",
		"D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
		"1",
	);

	expect(wallet.address()).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
	expect(wallet.publicKey()).toBe("034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192");
});

test("#fromMnemonicWithEncryption", async () => {
	const wallet = await WalletFactory.fromMnemonicWithEncryption(
		new Profile({ id: "id", name: "name", avatar: "avatar", data: "" }),
		"ARK",
		"ark.devnet",
		"this is a top secret passphrase",
		"password",
	);

	expect(wallet.address()).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
	expect(wallet.publicKey()).toBe("034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192");
	expect(wallet.data().get(WalletData.Bip38EncryptedKey)).toBeString();

	// @ts-ignore
	expect(decrypt(wallet.data().get(WalletData.Bip38EncryptedKey)!, "password").privateKey.toString("hex")).toBe(
		"d8839c2432bfd0a67ef10a804ba991eabba19f154a3d707917681d45822a5712",
	);
});
