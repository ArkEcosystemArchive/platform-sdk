import "jest-extended";

import { Contact } from "../src/contact";

let subject: Contact;

beforeEach(async () => {
	subject = new Contact({
		name: "John Doe",
		addresses: [{ coin: "Bitcoin", network: "livenet", address: "12eUJoaWBENQ3tNZE52ZQaHqr3v4tTX4os" }],
		starred: false,
	});
});

test("Contact#name", async () => {
	expect(subject.name()).toBe("John Doe");
});

test("Contact#addresses", async () => {
	expect(subject.addresses()).toEqual([
		{ address: "12eUJoaWBENQ3tNZE52ZQaHqr3v4tTX4os", coin: "Bitcoin", network: "livenet" },
	]);
});

test("Contact#isStarred", async () => {
	expect(subject.isStarred()).toBeFalse();

	subject.star();

	expect(subject.isStarred()).toBeTrue();

	subject.unstar();

	expect(subject.isStarred()).toBeFalse();
});

test("Contact#toObject", async () => {
	expect(subject.toObject()).toEqual({
		name: "John Doe",
		addresses: [{ address: "12eUJoaWBENQ3tNZE52ZQaHqr3v4tTX4os", coin: "Bitcoin", network: "livenet" }],
		starred: false,
	});
});
