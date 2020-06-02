import "jest-extended";

import { Profile } from "../src/profile";
import { LocalStorage } from "../src/storage/local";
import { Settings } from "../src/settings";
import { WalletRepository } from "../src/wallet-repository";
import { HttpClient } from "./stubs/client";

let subject: Profile;

beforeEach(() => {
	subject = new Profile({
		id: "uuid",
		name: "Primary",
		wallets: [],
		contacts: [],
		httpClient: new HttpClient(),
		storage: new LocalStorage("localstorage"),
	});
});

test("Profile#id", () => {
	expect(subject.id()).toBe("uuid");
});

test("Profile#name", () => {
	expect(subject.name()).toBe("Primary");
});

test("Profile#wallets", () => {
	expect(subject.wallets()).toBeInstanceOf(WalletRepository);
});

test("Profile#settings", () => {
	expect(subject.settings()).toBeInstanceOf(Settings);
});

test("Profile#toObject", async () => {
	await expect(subject.toObject()).resolves.toEqual({
		id: "uuid",
		name: "Primary",
		wallets: [],
		contacts: [],
		settings: {},
	});
});
