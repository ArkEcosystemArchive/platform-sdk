import "jest-extended";

import { ContactRepository } from "../../src/repositories/contact-repository";

let subject: ContactRepository;

const john = {
	name: "John Doe",
	addresses: [{ coin: "Bitcoin", network: "livenet", address: "LIVENET-ADDRESS" }],
	starred: false,
};

const jane = {
	name: "Jane Doe",
	addresses: [{ coin: "Ethereum", network: "testnet", address: "TESTNET-ADDRESS" }],
	starred: true,
};

beforeEach(() => {
	subject = new ContactRepository();

	subject.flush();
});

test("Contact#create", () => {
	expect(subject.all()).toHaveLength(0);

	subject.create(john);

	expect(subject.all()).toHaveLength(1);

	subject.create(jane);

	expect(subject.all()).toHaveLength(2);
});

test("Contact#find", () => {
	expect(() => subject.find("invalid")).toThrowError("Failed to find");

	const contact = subject.create(john);

	expect(subject.find(contact.id)).toBeObject();
});

test("Contact#update", () => {
	expect(() => subject.update("invalid", { name: "Jane Doe" })).toThrowError("Failed to find");

	const contact = subject.create(john);

	subject.update(contact.id, { name: "Jane Doe" });

	expect(subject.find(contact.id)).not.toEqual(contact);
});

test("Contact#destroy", () => {
	expect(() => subject.destroy("invalid")).toThrowError("Failed to find");

	const contact = subject.create(john);

	subject.destroy(contact.id);

	expect(() => subject.find(contact.id)).toThrowError("Failed to find");
});

test("Contact#findByAddress", () => {
	subject.create(john);
	subject.create(jane);

	expect(subject.findByAddress(john.addresses[0].address)).toHaveLength(1);
	expect(subject.findByAddress(jane.addresses[0].address)).toHaveLength(1);
	expect(subject.findByAddress("invalid")).toHaveLength(0);
});

test("Contact#findByCoin", () => {
	subject.create(john);
	subject.create(jane);

	expect(subject.findByCoin(john.addresses[0].coin)).toHaveLength(1);
	expect(subject.findByCoin(jane.addresses[0].coin)).toHaveLength(1);
	expect(subject.findByCoin("invalid")).toHaveLength(0);
});

test("Contact#findByNetwork", () => {
	subject.create(john);
	subject.create(jane);

	expect(subject.findByNetwork(john.addresses[0].network)).toHaveLength(1);
	expect(subject.findByNetwork(jane.addresses[0].network)).toHaveLength(1);
	expect(subject.findByNetwork("invalid")).toHaveLength(0);
});

test("Contact#flush", () => {
	subject.create(john);
	subject.create(jane);

	expect(subject.all()).toHaveLength(2);

	subject.flush();

	expect(subject.all()).toHaveLength(0);
});
