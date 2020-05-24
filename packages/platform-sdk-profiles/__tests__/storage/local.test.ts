import "jest-extended";
import { v4 as uuidv4 } from "uuid";

import { LocalStorage } from "../../src/storage/local";

let subject: LocalStorage;
let key: string;

beforeEach(() => {
	subject = new LocalStorage("localstorage");
	key = uuidv4();
});

test("LocalStorage#all", async () => {
	await expect(subject.all()).resolves.toEqual({});

	await subject.set(key, "value");

	await expect(subject.all()).resolves.toEqual({ [key]: "value" });

	await subject.flush();

	await expect(subject.all()).resolves.toEqual({});
});

test("LocalStorage#get", async () => {
	await subject.set(key, "value");

	await expect(subject.get(key)).resolves.toBe("value");
});

test("LocalStorage#set", async () => {
	await expect(subject.set(key, "value")).resolves.toBeUndefined();
});

test("LocalStorage#has", async () => {
	await expect(subject.has(key)).resolves.toBeFalse();

	await subject.set(key, "value");

	await expect(subject.has(key)).resolves.toBeTrue();
});

test("LocalStorage#forget", async () => {
	await expect(subject.has(key)).resolves.toBeFalse();

	await subject.set(key, "value");

	await expect(subject.has(key)).resolves.toBeTrue();

	await subject.forget(key);

	await expect(subject.has(key)).resolves.toBeFalse();
});

test("LocalStorage#flush", async () => {
	await expect(subject.has(key)).resolves.toBeFalse();

	await subject.set(key, "value");

	await expect(subject.has(key)).resolves.toBeTrue();

	await subject.flush();

	await expect(subject.has(key)).resolves.toBeFalse();
});

test("LocalStorage#count", async () => {
	await expect(subject.count()).resolves.toBe(0);

	await subject.set(key, "value");

	await expect(subject.count()).resolves.toBe(1);

	await subject.forget(key);

	await expect(subject.count()).resolves.toBe(0);
});
