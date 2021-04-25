import "jest-extended";
import "reflect-metadata";
import { bootContainer } from "../../../../test/helpers";

import { ProfileSetting, WalletSetting } from "../../../contracts";
import { State } from "../../../environment/state";
import { Profile } from "../profiles/profile";

import { SettingRepository } from "./setting-repository";

beforeAll(() => {
	bootContainer();

	const profile = new Profile({ id: "uuid", name: "name", avatar: "avatar", data: "" });

	State.profile(profile);
});

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
		expect(subject.keys()).toEqual([key]);

		subject.flush();

		expect(subject.all()).toEqual({});
		expect(subject.keys()).toEqual([]);
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

	test("#missing", async () => {
		expect(subject.missing(key)).toBeTrue();

		subject.set(key, "value");

		expect(subject.missing(key)).toBeFalse();
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
