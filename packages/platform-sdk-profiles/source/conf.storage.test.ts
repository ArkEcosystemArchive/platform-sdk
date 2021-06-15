import "jest-extended";

import { v4 as uuidv4 } from "uuid";

import { ConfStorage } from "./conf.storage";

let subject: ConfStorage;
let key: string;

beforeEach(() => {
	subject = new ConfStorage();
	key = uuidv4();
});

test("ConfStorage#all", async () => {
	await expect(subject.all()).resolves.toEqual({});

	await subject.set(key, "value");

	await expect(subject.all()).resolves.toEqual({ [key]: "value" });

	await subject.flush();

	await expect(subject.all()).resolves.toEqual({});
});

test("ConfStorage#get", async () => {
	await subject.set(key, "value");

	await expect(subject.get(key)).resolves.toBe("value");
});

test("ConfStorage#set", async () => {
	await expect(subject.set(key, "value")).resolves.toBeUndefined();
});

test("ConfStorage#has", async () => {
	await expect(subject.has(key)).resolves.toBeFalse();

	await subject.set(key, "value");

	await expect(subject.has(key)).resolves.toBeTrue();
});

test("ConfStorage#forget", async () => {
	await expect(subject.has(key)).resolves.toBeFalse();

	await subject.set(key, "value");

	await expect(subject.has(key)).resolves.toBeTrue();

	await subject.forget(key);

	await expect(subject.has(key)).resolves.toBeFalse();
});

test("ConfStorage#flush", async () => {
	await expect(subject.has(key)).resolves.toBeFalse();

	await subject.set(key, "value");

	await expect(subject.has(key)).resolves.toBeTrue();

	await subject.flush();

	await expect(subject.has(key)).resolves.toBeFalse();
});

test("ConfStorage#count", async () => {
	await expect(subject.count()).resolves.toBe(0);

	await subject.set(key, "value");

	await expect(subject.count()).resolves.toBe(1);

	await subject.forget(key);

	await expect(subject.count()).resolves.toBe(0);
});

test("ConfStorage#snapshot", async () => {
	await expect(subject.snapshot()).resolves.toBe(undefined);
});

test("ConfStorage#restore", async () => {
	await expect(subject.restore()).resolves.toBe(undefined);
});
