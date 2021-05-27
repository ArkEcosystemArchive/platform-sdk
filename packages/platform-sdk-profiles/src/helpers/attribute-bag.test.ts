import "jest-extended";

import { AttributeBag } from "./attribute-bag";

interface Attributes {
	a: string;
	b: string;
	c: string;
}

const values = { a: "a", b: "b", c: "c" };

let subject: AttributeBag<Attributes>;

beforeEach(() => (subject = new AttributeBag<Attributes>()));

test("#all", async () => {
	subject.setMany(values);

	expect(subject.all()).toEqual(values);
});

test("#get", async () => {
	expect(subject.get("a", "defaultValue")).toBe("defaultValue");

	subject.set("a", "a");

	expect(subject.get("a")).toBe("a");
});

test("#set", async () => {
	subject.set("a", "a");

	expect(subject.has("a")).toBeTrue();
});

test("#setMany", async () => {
	subject.setMany(values);

	expect(subject.all()).toEqual(values);
});

test("#has", async () => {
	expect(subject.has("a")).toBeFalse();

	subject.set("a", "a");

	expect(subject.has("a")).toBeTrue();
});

test("#hasStrict", async () => {
	subject.set("a", undefined);

	expect(subject.hasStrict("a")).toBeFalse();

	subject.set("a", "a");

	expect(subject.hasStrict("a")).toBeTrue();
});

test("#missing", async () => {
	expect(subject.missing("a")).toBeTrue();

	subject.set("a", "a");

	expect(subject.missing("a")).toBeFalse();
});

test("#forget", async () => {
	subject.set("a", "a");

	expect(subject.has("a")).toBeTrue();

	subject.forget("a");

	expect(subject.missing("a")).toBeTrue();
});

test("#flush", async () => {
	subject.set("a", "a");

	expect(subject.has("a")).toBeTrue();

	subject.flush();

	expect(subject.missing("a")).toBeTrue();
});

test("#only", async () => {
	subject.setMany(values);

	expect(subject.only(["a", "b"])).toEqual({ a: "a", b: "b" });
});

test("#except", async () => {
	subject.setMany(values);

	expect(subject.except(["a", "b"])).toEqual({ c: "c" });
});
