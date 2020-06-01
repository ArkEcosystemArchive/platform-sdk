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
		httpClient: new HttpClient(),
		storage: new LocalStorage("localstorage"),
	});
});

test("Profile#id", async () => {
	expect(subject.id()).toBe("uuid");
});

test("Profile#name", async () => {
	expect(subject.name()).toBe("Primary");
});

test("Profile#wallets", async () => {
	expect(subject.wallets()).toBeInstanceOf(WalletRepository);
});

test("Profile#settings", async () => {
	expect(subject.settings()).toBeInstanceOf(Settings);
});

test("Profile#toObject", async () => {
	expect(subject.toObject()).toEqual({ id: "uuid", name: "Primary", wallets: [] });
});
