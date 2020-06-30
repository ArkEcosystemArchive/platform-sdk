import "jest-extended";
import nock from "nock";

import { ARK } from "@arkecosystem/platform-sdk-ark";

import { Profile, ContactRepository, SettingRepository, WalletRepository, Identifiers } from "../src";
import { container } from "./container";

import { identity } from "../test/fixtures/identity";
import { HttpClient } from "../test/stubs/client";
import { DataRepository } from "./repositories/data-repository";

let subject: Profile;

beforeAll(() => {
	nock(/.+/)
		.get("/api/node/configuration/crypto")
		.reply(200, require("../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/node/syncing")
		.reply(200, require("../test/fixtures/client/syncing.json"))
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require("../test/fixtures/client/wallet.json"))
		.persist();

	container.set(Identifiers.HttpClient, new HttpClient());
});

beforeEach(() => {
	subject = new Profile("uuid", "John Doe");
});

it("should have an id", () => {
	expect(subject.id()).toBe("uuid");
});

it("should have a name", () => {
	expect(subject.name()).toBe("John Doe");
});

it("should have a wallets repository", () => {
	expect(subject.wallets()).toBeInstanceOf(WalletRepository);
});

it("should have a wallets repository", () => {
	expect(subject.wallets()).toBeInstanceOf(WalletRepository);
});

it("should have a contacts repository", () => {
	expect(subject.contacts()).toBeInstanceOf(ContactRepository);
});

it("should have a data repository", () => {
	expect(subject.data()).toBeInstanceOf(DataRepository);
});

it("should have a settings repository", () => {
	expect(subject.settings()).toBeInstanceOf(SettingRepository);
});

test("#toObject", () => {
	expect(subject.toObject()).toEqual({
		id: "uuid",
		name: "John Doe",
		contacts: {},
		notifications: {},
		data: {},
		settings: {},
		wallets: {},
	});
});

test("#balancePerCoin", async () => {
	container.set(Identifiers.HttpClient, new HttpClient());

	await subject.wallets().import(identity.mnemonic, ARK, "devnet");

	expect(subject.balancePerCoin()).toEqual({
		DARK: {
			percentage: "100.00",
			total: "55827093444556",
		},
	});
});
