import "jest-extended";

import { v4 as uuidv4 } from "uuid";

import { MemoryStorage } from "./memory";

let subject: MemoryStorage;
let key: string;

beforeEach(() => {
	subject = new MemoryStorage();
	key = uuidv4();
});

test("MemoryStorage#all", async () => {
	await expect(subject.all()).resolves.toEqual({});

	await subject.set(key, "value");

	await expect(subject.all()).resolves.toEqual({ [key]: "value" });

	await subject.flush();

	await expect(subject.all()).resolves.toEqual({});
});

test("MemoryStorage#get", async () => {
	await subject.set(key, "value");

	await expect(subject.get(key)).resolves.toBe("value");
});

test("MemoryStorage#set", async () => {
	await expect(subject.set(key, "value")).resolves.toBeUndefined();
});

test("MemoryStorage#has", async () => {
	await expect(subject.has(key)).resolves.toBeFalse();

	await subject.set(key, "value");

	await expect(subject.has(key)).resolves.toBeTrue();
});

test("MemoryStorage#forget", async () => {
	await expect(subject.has(key)).resolves.toBeFalse();

	await subject.set(key, "value");

	await expect(subject.has(key)).resolves.toBeTrue();

	await subject.forget(key);

	await expect(subject.has(key)).resolves.toBeFalse();
});

test("MemoryStorage#flush", async () => {
	await expect(subject.has(key)).resolves.toBeFalse();

	await subject.set(key, "value");

	await expect(subject.has(key)).resolves.toBeTrue();

	await subject.flush();

	await expect(subject.has(key)).resolves.toBeFalse();
});

test("MemoryStorage#count", async () => {
	await expect(subject.count()).resolves.toBe(0);

	await subject.set(key, "value");

	await expect(subject.count()).resolves.toBe(1);

	await subject.forget(key);

	await expect(subject.count()).resolves.toBe(0);
});

test("MemoryStorage#snapshot", async () => {
	await expect(subject.snapshot()).resolves.toBe(undefined);
});

test("MemoryStorage#restore", async () => {
	await expect(subject.restore()).resolves.toBe(undefined);
});
