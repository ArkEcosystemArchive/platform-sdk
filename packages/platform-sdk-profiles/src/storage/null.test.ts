import "jest-extended";

import { NullStorage } from "./null";

let subject: NullStorage;

beforeEach(() => (subject = new NullStorage()));

test("#all", async () => {
	await expect(subject.all()).resolves.toEqual({});
});

test("#get", async () => {
	await expect(subject.get("key")).resolves.toBeUndefined();
});

test("#set", async () => {
	await expect(subject.set("key", "value")).resolves.toBeUndefined();
});

test("#has", async () => {
	await expect(subject.has("key")).resolves.toBeFalse();
});

test("#forget", async () => {
	await expect(subject.forget("null")).resolves.toBeUndefined();
});

test("#flush", async () => {
	await expect(subject.flush()).resolves.toBeUndefined();
});

test("#count", async () => {
	await expect(subject.count()).resolves.toBe(0);
});

test("#snapshot", async () => {
	await expect(subject.snapshot()).resolves.toBeUndefined();
});

test("#restore", async () => {
	await expect(subject.restore()).resolves.toBeUndefined();
});
