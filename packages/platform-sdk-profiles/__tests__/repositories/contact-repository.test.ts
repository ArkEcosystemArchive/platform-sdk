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

test("ContactRepository#create", () => {
	expect(subject.keys()).toHaveLength(0);

	subject.create(john);

	expect(subject.keys()).toHaveLength(1);

	subject.create(jane);

	expect(subject.keys()).toHaveLength(2);
});

test("ContactRepository#find", () => {
	expect(() => subject.findById("invalid")).toThrowError("Failed to find");

	const contact = subject.create(john);

	expect(subject.findById(contact.id)).toBeObject();
});

test("ContactRepository#update", () => {
	expect(() => subject.update("invalid", { name: "Jane Doe" })).toThrowError("Failed to find");

	const contact = subject.create(john);

	subject.update(contact.id, { name: "Jane Doe" });

	expect(subject.findById(contact.id)).not.toEqual(contact);
});

test("ContactRepository#forget", () => {
	expect(() => subject.forget("invalid")).toThrowError("Failed to find");

	const contact = subject.create(john);

	subject.forget(contact.id);

	expect(() => subject.findById(contact.id)).toThrowError("Failed to find");
});

test("ContactRepository#findByAddress", () => {
	subject.create(john);
	subject.create(jane);

	expect(subject.findByAddress(john.addresses[0].address)).toHaveLength(1);
	expect(subject.findByAddress(jane.addresses[0].address)).toHaveLength(1);
	expect(subject.findByAddress("invalid")).toHaveLength(0);
});

test("ContactRepository#findByCoin", () => {
	subject.create(john);
	subject.create(jane);

	expect(subject.findByCoin(john.addresses[0].coin)).toHaveLength(1);
	expect(subject.findByCoin(jane.addresses[0].coin)).toHaveLength(1);
	expect(subject.findByCoin("invalid")).toHaveLength(0);
});

test("ContactRepository#findByNetwork", () => {
	subject.create(john);
	subject.create(jane);

	expect(subject.findByNetwork(john.addresses[0].network)).toHaveLength(1);
	expect(subject.findByNetwork(jane.addresses[0].network)).toHaveLength(1);
	expect(subject.findByNetwork("invalid")).toHaveLength(0);
});

test("ContactRepository#flush", () => {
	subject.create(john);
	subject.create(jane);

	expect(subject.keys()).toHaveLength(2);

	subject.flush();

	expect(subject.keys()).toHaveLength(0);
});
