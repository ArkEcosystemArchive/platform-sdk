import "jest-extended";

import { Cache } from "./cache";

let subject: Cache;
beforeEach(() => (subject = new Cache("wallet-ABC")));

it("should return a list of all key-value pairs", async () => {
	expect(subject.all()).toBeEmpty();

	subject.set("key", "value", 1);

	expect(subject.all()).not.toBeEmpty();
});

it("should return a list of all keys", async () => {
	expect(subject.keys()).toBeEmpty();

	subject.set("key", "value", 1);

	expect(subject.keys()).not.toBeEmpty();
	expect(subject.keys()[0]).toBeString();
});

it("should set, get and forget a value", async () => {
	expect(() => subject.get("key")).toThrow();
	expect(subject.has("key")).toBeFalse();

	subject.set("key", "value", 1);

	expect(subject.get("key")).toBe("value");
	expect(subject.has("key")).toBeTrue();

	subject.forget("key");

	expect(() => subject.get("key")).toThrow();
	expect(subject.has("key")).toBeFalse();
});

it("should flush the cache", async () => {
	expect(() => subject.get("key")).toThrow();
	expect(subject.has("key")).toBeFalse();

	subject.set("key", "value", 1);

	expect(subject.get("key")).toBe("value");
	expect(subject.has("key")).toBeTrue();

	subject.flush();

	expect(() => subject.get("key")).toThrow();
	expect(subject.has("key")).toBeFalse();
});
