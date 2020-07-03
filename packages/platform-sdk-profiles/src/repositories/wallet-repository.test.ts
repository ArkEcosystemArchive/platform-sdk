import "jest-extended";

import { ARK } from "@arkecosystem/platform-sdk-ark";
import { BTC } from "@arkecosystem/platform-sdk-btc";
import { ETH } from "@arkecosystem/platform-sdk-eth";
import nock from "nock";

import { identity } from "../../test/fixtures/identity";
import { HttpClient } from "../../test/stubs/client";
import { container } from "../container";
import { Identifiers } from "../container.models";
import { Profile } from "../profile";
import { Wallet } from "../wallet";
import { WalletRepository } from "./wallet-repository";

let subject: WalletRepository;

beforeEach(async () => {
	nock.cleanAll();

	nock(/.+/)
		.get("/api/node/configuration")
		.reply(200, require("../../test/fixtures/client/configuration.json"))
		.get("/api/node/configuration/crypto")
		.reply(200, require("../../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/node/syncing")
		.reply(200, require("../../test/fixtures/client/syncing.json"))
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require("../../test/fixtures/client/wallet.json"))
		.persist();

	container.set(Identifiers.HttpClient, new HttpClient());

	subject = new WalletRepository(new Profile("profile-id", "John Doe"));

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
	let walletARK: Wallet;
	let walletBTC: Wallet;
	let walletETH: Wallet;

	beforeEach(async () => {
		subject.flush();

		walletARK = await subject.import("a", ARK, "devnet");
		walletBTC = await subject.import("b", BTC, "testnet");
		walletETH = await subject.import("c", ETH, "ropsten");
	});

	it("should sort by coin", async () => {
		const wallets = subject.sortBy("coin");

		expect(wallets[0].address()).toBe(walletBTC.address()); // BTC
		expect(wallets[1].address()).toBe(walletARK.address()); // DARK
		expect(wallets[2].address()).toBe(walletETH.address()); // ETH
	});

	it("should sort by address", async () => {
		const wallets = subject.sortBy("address");

		expect(wallets[0].address()).toBe(walletETH.address());
		expect(wallets[1].address()).toBe(walletARK.address());
		expect(wallets[2].address()).toBe(walletBTC.address());
	});

	it("should sort by type", async () => {
		walletARK.toggleStarred();
		walletETH.toggleStarred();

		const wallets = subject.sortBy("type");

		expect(wallets[0].address()).toBe(walletBTC.address());
		expect(wallets[1].address()).toBe(walletARK.address());
		expect(wallets[2].address()).toBe(walletETH.address());
	});

	it("should sort by balance", async () => {
		const wallets = subject.sortBy("balance");

		expect(wallets[0].address()).toBe(walletARK.address());
		expect(wallets[1].address()).toBe(walletBTC.address());
		expect(wallets[2].address()).toBe(walletETH.address());
	});
});
