import "jest-extended";

import { ContactRepository } from "../src/contact-repository";
import { Data } from "../src/data";
import { LocalStorage } from "../src/storage/local";

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

beforeEach(async () => {
	subject = await ContactRepository.make(new Data(new LocalStorage("localstorage"), "profiles.123"));

	await subject.flush();
});

test("Contact#create", async () => {
	expect(subject.all()).toHaveLength(0);

	await subject.create(john);

	expect(subject.all()).toHaveLength(1);

	await subject.create(jane);

	expect(subject.all()).toHaveLength(2);
});

test("Contact#find", async () => {
	expect(() => subject.find("invalid")).toThrowError("Failed to find");

	const contact = await subject.create(john);

	expect(subject.find(contact.id)).toBeObject();
	expect(subject.find(contact.name)).toBeObject();
});

test("Contact#update", async () => {
	await expect(subject.update("invalid", { name: "Jane Doe" })).rejects.toThrowError("Failed to find");

	const contact = await subject.create(john);

	await subject.update(contact.id, { name: "Jane Doe" });

	expect(subject.find(contact.id)).not.toEqual(contact);
});

test("Contact#destroy", async () => {
	await expect(subject.destroy("invalid")).rejects.toThrowError("Failed to find");

	const contact = await subject.create(john);

	await subject.destroy(contact.id);

	expect(() => subject.find(contact.id)).toThrowError("Failed to find");
});

test("Contact#findByAddress", async () => {
	await subject.create(john);
	await subject.create(jane);

	expect(subject.findByAddress(john.addresses[0].address)).toHaveLength(1);
	expect(subject.findByAddress(jane.addresses[0].address)).toHaveLength(1);
	expect(subject.findByAddress("invalid")).toHaveLength(0);
});

test("Contact#findByCoin", async () => {
	await subject.create(john);
	await subject.create(jane);

	expect(subject.findByCoin(john.addresses[0].coin)).toHaveLength(1);
	expect(subject.findByCoin(jane.addresses[0].coin)).toHaveLength(1);
	expect(subject.findByCoin("invalid")).toHaveLength(0);
});

test("Contact#findByNetwork", async () => {
	await subject.create(john);
	await subject.create(jane);

	expect(subject.findByNetwork(john.addresses[0].network)).toHaveLength(1);
	expect(subject.findByNetwork(jane.addresses[0].network)).toHaveLength(1);
	expect(subject.findByNetwork("invalid")).toHaveLength(0);
});

test("Contact#flush", async () => {
	await subject.create(john);
	await subject.create(jane);

	expect(subject.all()).toHaveLength(2);

	await subject.flush();

	expect(subject.all()).toHaveLength(0);
});
