import "jest-extended";

import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import nock from "nock";

import { ContactRepository, Identifiers, Profile, SettingRepository, WalletRepository } from "../src";
import { identity } from "../test/fixtures/identity";
import { container } from "./container";
import { ProfileSetting } from "./profile.models";
import { DataRepository } from "./repositories/data-repository";

let subject: Profile;

beforeAll(() => {
	nock(/.+/)
		.get("/api/node/configuration/crypto")
		.reply(200, require("../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/peers")
		.reply(200, require("../test/fixtures/client/peers.json"))
		.get("/api/node/syncing")
		.reply(200, require("../test/fixtures/client/syncing.json"))
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require("../test/fixtures/client/wallet.json"))
		.persist();

	container.set(Identifiers.HttpClient, new Request());
	container.set(Identifiers.Coins, { ARK });
});

beforeEach(() => {
	subject = new Profile("uuid");
	subject.settings().set(ProfileSetting.Name, "John Doe");
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
		contacts: {},
		data: {},
		notifications: {},
		plugins: {
			data: {},
			blacklist: [],
		},
		settings: {
			NAME: "John Doe",
		},
		wallets: {},
	});
});

it.only("should serialize and deserialize", () => {
	subject.auth().setPassword("strong-password");

	const serialized: any = subject.serialize();

	expect(serialized).toBeObject();

	console.log(serialized);
	console.log(Profile.deserialize(serialized.data, serialized.password));
});
