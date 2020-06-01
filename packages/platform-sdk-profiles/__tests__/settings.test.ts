import "jest-extended";

import { Settings } from "../src/settings";
import { WalletSetting, ProfileSetting } from "../src/enums";
import { LocalStorage } from "../src/storage/local";

describe.each([["profile", "wallet"]])("Settings(%s)", (type) => {
	let subject: Settings;
	let key: string;

	beforeEach(() => {
		subject = new Settings({ namespace: `${type}s.123`, storage: new LocalStorage("localstorage"), type });
		subject.flush();

		key = type === "profile" ? ProfileSetting.Locale : WalletSetting.Peer;
	});

	test("#all", async () => {
		await expect(subject.all()).resolves.toEqual({});

		await subject.set(key, "value");

		await expect(subject.all()).resolves.toEqual({ [key]: "value" });

		await subject.flush();

		await expect(subject.all()).resolves.toEqual({});
	});

	test("#get", async () => {
		await subject.set(key, "value");

		await expect(subject.get(key)).resolves.toBe("value");
	});

	test("#set", async () => {
		await expect(subject.set(key, "value")).resolves.toBeUndefined();
	});

	test("#has", async () => {
		await expect(subject.has(key)).resolves.toBeFalse();

		await subject.set(key, "value");

		await expect(subject.has(key)).resolves.toBeTrue();
	});

	test("#forget", async () => {
		await expect(subject.has(key)).resolves.toBeFalse();

		await subject.set(key, "value");

		await expect(subject.has(key)).resolves.toBeTrue();

		await subject.forget(key);

		await expect(subject.has(key)).resolves.toBeFalse();
	});

	test("#flush", async () => {
		await expect(subject.has(key)).resolves.toBeFalse();

		await subject.set(key, "value");

		await expect(subject.has(key)).resolves.toBeTrue();

		await subject.flush();

		await expect(subject.has(key)).resolves.toBeFalse();
	});

	it("should throw if an invalid key is used", async () => {
		await expect(subject.get("invalid")).rejects.toThrowError("is not a valid setting");
		await expect(subject.set("invalid", "value")).rejects.toThrowError("is not a valid setting");
		await expect(subject.has("invalid")).rejects.toThrowError("is not a valid setting");
		await expect(subject.forget("invalid")).rejects.toThrowError("is not a valid setting");
	});
});
