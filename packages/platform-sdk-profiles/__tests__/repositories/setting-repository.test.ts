import "jest-extended";

import { SettingRepository } from "../../src/repositories/setting-repository";
import { WalletSetting, ProfileSetting } from "../../src/enums";

describe.each([["profile", "wallet"]])("SettingRepository(%s)", (type) => {
	let subject: SettingRepository;
	let key: string;

	beforeEach(() => {
		subject = new SettingRepository(Object.values(type === "profile" ? ProfileSetting : WalletSetting));
		subject.flush();

		key = type === "profile" ? ProfileSetting.Locale : WalletSetting.Peer;
	});

	test("#all", async () => {
		expect(subject.all()).toEqual({});

		subject.set(key, "value");

		expect(subject.all()).toEqual({ [key]: "value" });

		subject.flush();

		expect(subject.all()).toEqual({});
	});

	test("#get", async () => {
		subject.set(key, "value");

		expect(subject.get(key)).toBe("value");
	});

	test("#set", async () => {
		expect(subject.set(key, "value")).toBeUndefined();
	});

	test("#has", async () => {
		expect(subject.has(key)).toBeFalse();

		subject.set(key, "value");

		expect(subject.has(key)).toBeTrue();
	});

	test("#forget", async () => {
		expect(subject.has(key)).toBeFalse();

		subject.set(key, "value");

		expect(subject.has(key)).toBeTrue();

		subject.forget(key);

		expect(subject.has(key)).toBeFalse();
	});

	test("#flush", async () => {
		expect(subject.has(key)).toBeFalse();

		subject.set(key, "value");

		expect(subject.has(key)).toBeTrue();

		subject.flush();

		expect(subject.has(key)).toBeFalse();
	});

	it("should throw if an invalid key is used", async () => {
		expect(() => subject.get("invalid")).toThrowError("is not a valid setting");
		expect(() => subject.set("invalid", "value")).toThrowError("is not a valid setting");
		expect(() => subject.has("invalid")).toThrowError("is not a valid setting");
		expect(() => subject.forget("invalid")).toThrowError("is not a valid setting");
	});
});
