import "jest-extended";
import nock from "nock";

import { Profile, ContactRepository, SettingRepository, WalletRepository, Identifiers } from "../src";
import { container } from "../src/container";

import { ARK } from "@arkecosystem/platform-sdk-ark";
import { identity } from "./__fixtures__/identity";
import { HttpClient } from "./stubs/client";
import { DataRepository } from "../src/repositories/data-repository";

let subject: Profile;

beforeAll(() => {
	nock(/.+/)
		.get("/api/node/configuration/crypto")
		.reply(200, require("./__fixtures__/client/cryptoConfiguration.json"))
		.get("/api/node/syncing")
		.reply(200, require("./__fixtures__/client/syncing.json"))
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require("./__fixtures__/client/wallet.json"))
		.persist();

	container.set(Identifiers.HttpClient, new HttpClient());
});

beforeEach(async () => {
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

it("should modify CONTACTS and and emit a MODIFIED event", () => {
	const emitSpy = jest.spyOn(container.get<any>(Identifiers.EventEmitter), "emit");

	subject.contacts().create({
		name: "Jane Doe",
		addresses: [{ coin: "Ethereum", network: "testnet", address: "TESTNET-ADDRESS" }],
		starred: true,
	});

	expect(emitSpy).toHaveBeenNthCalledWith(1, "MODIFIED", { namespace: "profile", type: "contact" });

	jest.clearAllMocks();
});

it("should modify WALLETS and and emit a MODIFIED event", async () => {
	const emitSpy = jest.spyOn(container.get<any>(Identifiers.EventEmitter), "emit");

	await subject.wallets().create(identity.mnemonic, ARK, "devnet");

	expect(emitSpy).toHaveBeenNthCalledWith(1, "MODIFIED", { namespace: "wallet", type: "setting" });
	expect(emitSpy).toHaveBeenNthCalledWith(2, "MODIFIED", { namespace: "profile", type: "wallet" });

	jest.clearAllMocks();
});

it("should modify DATA and and emit a MODIFIED event", () => {
	const emitSpy = jest.spyOn(container.get<any>(Identifiers.EventEmitter), "emit");

	subject.data().set("key", "value");

	expect(emitSpy).toHaveBeenNthCalledWith(1, "MODIFIED", { namespace: "profile", type: "data" });

	jest.clearAllMocks();
});

it("should modify SETTINGS and and emit a MODIFIED event", () => {
	const emitSpy = jest.spyOn(container.get<any>(Identifiers.EventEmitter), "emit");

	subject.settings().set("ADVANCED_MODE", "value");

	expect(emitSpy).toHaveBeenNthCalledWith(1, "MODIFIED", { namespace: "profile", type: "setting" });

	jest.clearAllMocks();
});

// test("Profile#toObject", async () => {
// 	await expect(subject.toObject()).resolves.toEqual({
// 		id: "uuid",
// 		name: "John Doe",
// 		wallets: [],
// 		contacts: [],
// 		data: [],
// 		settings: {},
// 	});
// });
