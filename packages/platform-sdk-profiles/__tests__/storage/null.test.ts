import "jest-extended";

import { NullStorage } from "../../src/storage/null";

let subject: NullStorage;

beforeEach(() => (subject = new NullStorage()));

test("NullStorage#all", async () => {
	await expect(subject.all()).resolves.toEqual({});
});

test("NullStorage#get", async () => {
	await expect(subject.get("key")).resolves.toBeUndefined();
});

test("NullStorage#set", async () => {
	await expect(subject.set("key", "value")).resolves.toBeUndefined();
});

test("NullStorage#has", async () => {
	await expect(subject.has("key")).resolves.toBeFalse();
});

test("NullStorage#forget", async () => {
	await expect(subject.forget("null")).resolves.toBeUndefined();
});

test("NullStorage#flush", async () => {
	await expect(subject.flush()).resolves.toBeUndefined();
});

test("NullStorage#count", async () => {
	await expect(subject.count()).resolves.toBe(0);
});
