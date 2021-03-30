import "jest-extended";
import "reflect-metadata";

import { DataRepository } from "./data-repository";

let subject: DataRepository;

beforeEach(() => (subject = new DataRepository()));

test("#all", () => {
	subject.set("key1", "value1");
	subject.set("key2", "value2");

	expect(subject.all()).toMatchInlineSnapshot(`
		Object {
		  "key1": "value1",
		  "key2": "value2",
		}
	`);
});

test("#first", () => {
	subject.set("key1", "value1");
	subject.set("key2", "value2");

	expect(subject.first()).toBe("value1");
});

test("#last", () => {
	subject.set("key1", "value1");
	subject.set("key2", "value2");

	expect(subject.last()).toBe("value2");
});

test("#keys", () => {
	subject.set("key1", "value1");
	subject.set("key2", "value2");

	expect(subject.keys()).toMatchInlineSnapshot(`
		Array [
		  "key1",
		  "key2",
		]
	`);
});

test("#values", () => {
	subject.set("key1", "value1");
	subject.set("key2", "value2");

	expect(subject.values()).toMatchInlineSnapshot(`
		Array [
		  "value1",
		  "value2",
		]
	`);
});

test("#get | #set | #has | #missing", () => {
	expect(subject.get("key")).toBeUndefined();
	expect(subject.has("key")).toBeFalse();
	expect(subject.missing("key")).toBeTrue();

	subject.set("key", "value");

	expect(subject.get("key")).toBe("value");
	expect(subject.has("key")).toBeTrue();
	expect(subject.missing("key")).toBeFalse();
});

test("#fill", () => {
	subject.set("key", "value");

	expect(subject.get("key")).toBe("value");
	expect(subject.has("key")).toBeTrue();
	expect(subject.missing("key")).toBeFalse();

	subject.flush();

	expect(subject.get("key")).toBeUndefined();
	expect(subject.has("key")).toBeFalse();
	expect(subject.missing("key")).toBeTrue();
});

test("#forget", () => {
	subject.set("key", "value");

	expect(subject.get("key")).toBe("value");
	expect(subject.has("key")).toBeTrue();
	expect(subject.missing("key")).toBeFalse();

	subject.forget("key");

	expect(subject.get("key")).toBeUndefined();
	expect(subject.has("key")).toBeFalse();
	expect(subject.missing("key")).toBeTrue();
});

test("#forgetIndex", () => {
	subject.set("key", [1, 2, 3]);

	expect(subject.get("key")).toEqual([1, 2, 3]);

	subject.forgetIndex("key", 1);

	expect(subject.get("key")).toEqual([1, 3]);

	subject.forgetIndex("key", 10);

	expect(subject.get("key")).toEqual([1, 3]);

	subject.forgetIndex("xkey", 10);

	expect(subject.get("xkey")).toBeUndefined();
});

test("#flush", () => {
	subject.set("key", "value");

	expect(subject.get("key")).toBe("value");
	expect(subject.has("key")).toBeTrue();
	expect(subject.missing("key")).toBeFalse();

	subject.flush();

	expect(subject.get("key")).toBeUndefined();
	expect(subject.has("key")).toBeFalse();
	expect(subject.missing("key")).toBeTrue();
});

test("#count", () => {
	subject.set("key", "value");

	expect(subject.count()).toBe(1);

	subject.flush();

	expect(subject.count()).toBe(0);
});

test("#snapshot | #restore", () => {
	subject.set("key", "value");

	expect(subject.count()).toBe(1);

	subject.snapshot();
	subject.flush();

	expect(subject.count()).toBe(0);

	subject.restore();

	expect(subject.count()).toBe(1);

	expect(() => subject.restore()).toThrow("There is no snapshot to restore.");
});

test("#toJSON", () => {
	subject.set("key", "value");

	expect(subject.toJSON()).toMatchInlineSnapshot(`"{\\"key\\":\\"value\\"}"`);
});
