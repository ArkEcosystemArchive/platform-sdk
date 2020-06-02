import "jest-extended";

import { Contact } from "../src/contact";
import { ContactRepository } from "../src/contact-repository";
import { LocalStorage } from "../src/storage/local";

let subject: ContactRepository;

const john = new Contact({
	name: "John Doe",
	addresses: [{ coin: "Bitcoin", network: "livenet", address: "LIVENET-ADDRESS" }],
	starred: false,
});

const jane = new Contact({
	name: "Jane Doe",
	addresses: [{ coin: "Ethereum", network: "testnet", address: "TESTNET-ADDRESS" }],
	starred: true,
});

beforeEach(async () => {
	subject = new ContactRepository({ contacts: [john, jane], storage: new LocalStorage("localstorage") });
});

test("Contact#all", async () => {
	expect(subject.all()).toEqual([john, jane]);
});

test("Contact#starred", async () => {
	expect(subject.starred()).toEqual([jane]);
});

test("Contact#push", async () => {
	subject.flush();

	expect(subject.all()).toEqual([]);

	subject.push(john);

	expect(subject.all()).toEqual([john]);

	subject.push(jane);

	expect(subject.all()).toEqual([john, jane]);
});

test("Contact#findByAddress", async () => {
	expect(subject.findByAddress(john.addresses()[0].address)).toEqual([john]);
	expect(subject.findByAddress(jane.addresses()[0].address)).toEqual([jane]);
	expect(subject.findByAddress("invalid")).toEqual([]);
});

test("Contact#findByCoin", async () => {
	expect(subject.findByCoin(john.addresses()[0].coin)).toEqual([john]);
	expect(subject.findByCoin(jane.addresses()[0].coin)).toEqual([jane]);
	expect(subject.findByCoin("invalid")).toEqual([]);
});

test("Contact#findByNetwork", async () => {
	expect(subject.findByNetwork(john.addresses()[0].network)).toEqual([john]);
	expect(subject.findByNetwork(jane.addresses()[0].network)).toEqual([jane]);
	expect(subject.findByNetwork("invalid")).toEqual([]);
});

test("Contact#flush", async () => {
	expect(subject.all()).toEqual([john, jane]);

	subject.flush();

	expect(subject.all()).toEqual([]);
});
