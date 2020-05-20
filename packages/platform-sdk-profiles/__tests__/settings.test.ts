import "jest-extended";
import { v4 as uuidv4 } from "uuid";

import { Settings } from "../src/settings";
import { LocalStorage } from "../src/stores/local";

describe.each([["app", "profile.123"]])("Settings(%s)", (namespace) => {
	let subject: Settings;
	let key: string;

	beforeEach(() => {
		subject = new Settings(new LocalStorage("localstorage"), namespace);
		subject.flush();

		key = uuidv4();
	});

	test("Settings#all", async () => {
		await expect(subject.all()).resolves.toEqual({});

		await subject.set(key, "value");

		await expect(subject.all()).resolves.toEqual({ [key]: "value" });

		await subject.flush();

		await expect(subject.all()).resolves.toEqual({});
	});

	test("Settings#get", async () => {
		await subject.set(key, "value");

		await expect(subject.get(key)).resolves.toBe("value");
	});

	test("Settings#set", async () => {
		await expect(subject.set(key, "value")).resolves.toBeUndefined();
	});

	test("Settings#has", async () => {
		await expect(subject.has(key)).resolves.toBeFalse();

		await subject.set(key, "value");

		await expect(subject.has(key)).resolves.toBeTrue();
	});

	test("Settings#forget", async () => {
		await expect(subject.has(key)).resolves.toBeFalse();

		await subject.set(key, "value");

		await expect(subject.has(key)).resolves.toBeTrue();

		await subject.forget(key);

		await expect(subject.has(key)).resolves.toBeFalse();
	});

	test("Settings#flush", async () => {
		await expect(subject.has(key)).resolves.toBeFalse();

		await subject.set(key, "value");

		await expect(subject.has(key)).resolves.toBeTrue();

		await subject.flush();

		await expect(subject.has(key)).resolves.toBeFalse();
	});
});
