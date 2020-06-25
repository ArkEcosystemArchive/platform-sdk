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

test("#all", () => {
	expect(subject.all()).toBeObject();
});

test("#allByCoin", () => {
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

test("#generate", async () => {
	subject.flush();

	const wallet = await subject.generate(ARK, "devnet");

	expect(wallet.mnemonic).toBeString();
	expect(wallet.wallet).toBeInstanceOf(Wallet);
});

test("#findByAddress", () => {
	expect(subject.findByAddress(identity.address)).toBeInstanceOf(Wallet);
});

test("#findByPublicKey", () => {
	expect(subject.findByPublicKey(identity.publicKey)).toBeInstanceOf(Wallet);
});

test("#findByCoin", () => {
	expect(subject.findByCoin("ARK")).toHaveLength(1);
});

describe("#sortBy", () => {
	it("should sort by address", async () => {
		subject.flush();

		await subject.import("a", ARK, "devnet");
		await subject.import("b", ARK, "devnet");
		await subject.import("c", ARK, "devnet");

		const wallets = subject.sortBy("address");

		expect(wallets[0].address()).toBe("DCDLm4EYkpe1XmbEwL5ZZrZ93Pmfnnn4Vo");
		expect(wallets[1].address()).toBe("DFyDKsyvR4x9D9zrfEaPmeJxSniT5N5qY8");
		expect(wallets[2].address()).toBe("DTRdbaUW3RQQSL5By4G43JVaeHiqfVp9oh");
	});

	it("should sort by type", async () => {
		subject.flush();

		(await subject.import("a", ARK, "devnet")).toggleStarred();
		await subject.import("b", ARK, "devnet");
		(await subject.import("c", ARK, "devnet")).toggleStarred();

		const wallets = subject.sortBy("type");

		expect(wallets[0].address()).toBe("DFyDKsyvR4x9D9zrfEaPmeJxSniT5N5qY8");
		expect(wallets[1].address()).toBe("DTRdbaUW3RQQSL5By4G43JVaeHiqfVp9oh");
		expect(wallets[2].address()).toBe("DCDLm4EYkpe1XmbEwL5ZZrZ93Pmfnnn4Vo");
	});

	it("should sort by balance", async () => {
		subject.flush();

		await subject.import("a", ARK, "devnet");
		await subject.import("b", ARK, "devnet");
		await subject.import("c", ARK, "devnet");

		const wallets = subject.sortBy("balance");

		expect(wallets[0].address()).toBe("DTRdbaUW3RQQSL5By4G43JVaeHiqfVp9oh");
		expect(wallets[1].address()).toBe("DFyDKsyvR4x9D9zrfEaPmeJxSniT5N5qY8");
		expect(wallets[2].address()).toBe("DCDLm4EYkpe1XmbEwL5ZZrZ93Pmfnnn4Vo");
	});
});
