import "jest-extended";

import { v4 as uuidv4 } from "uuid";

import { LocalStorage } from "./local.storage";

let subject: LocalStorage;
let key: string;

beforeEach(() => {
	subject = new LocalStorage("localstorage");
	key = uuidv4();
});

it("should get all items", async () => {
	await expect(subject.all()).resolves.toEqual({});

	await subject.set(key, "value");

	await expect(subject.all()).resolves.toEqual({ [key]: "value" });

	await subject.flush();

	await expect(subject.all()).resolves.toEqual({});
});

it("should should get the value for the given key", async () => {
	await subject.set(key, "value");

	await expect(subject.get(key)).resolves.toBe("value");
});

it("should should set the value in the storage", async () => {
	await expect(subject.set(key, "value")).resolves.toBeUndefined();
});

it("should should check if the given key exists", async () => {
	await expect(subject.has(key)).resolves.toBeFalse();

	await subject.set(key, "value");

	await expect(subject.has(key)).resolves.toBeTrue();
});

it("should should forget the given key", async () => {
	await expect(subject.has(key)).resolves.toBeFalse();

	await subject.set(key, "value");

	await expect(subject.has(key)).resolves.toBeTrue();

	await subject.forget(key);

	await expect(subject.has(key)).resolves.toBeFalse();
});

it("should flush the storage", async () => {
	await expect(subject.has(key)).resolves.toBeFalse();

	await subject.set(key, "value");

	await expect(subject.has(key)).resolves.toBeTrue();

	await subject.flush();

	await expect(subject.has(key)).resolves.toBeFalse();
});

it("should count all items", async () => {
	await expect(subject.count()).resolves.toBe(0);

	await subject.set(key, "value");

	await expect(subject.count()).resolves.toBe(1);

	await subject.forget(key);

	await expect(subject.count()).resolves.toBe(0);
});

it("should create a snapshot and restore it", async () => {
	await subject.set("a", "b");

	await expect(subject.count()).resolves.toBe(1);

	await subject.snapshot();

	await expect(subject.count()).resolves.toBe(1);

	await subject.set(key, "value");

	await expect(subject.count()).resolves.toBe(2);

	await subject.restore();

	await expect(subject.count()).resolves.toBe(1);
});

it("should fail to restore if there is no snapshot", async () => {
	await expect(subject.restore()).rejects.toThrowError("There is no snapshot to restore.");
});
