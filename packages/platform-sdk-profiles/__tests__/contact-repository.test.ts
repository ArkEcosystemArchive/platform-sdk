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
});

it("should push and ", async () => {
	expect(subject.all()).toHaveLength(0);

	await subject.create(john);

	expect(subject.all()).toHaveLength(1);

	await subject.create(jane);

	expect(subject.all()).toHaveLength(2);
});

test("Contact#findByAddress", async () => {
	expect(subject.findByAddress(john.addresses[0].address)).toHaveLength(1);
	expect(subject.findByAddress(jane.addresses[0].address)).toHaveLength(1);
	expect(subject.findByAddress("invalid")).toHaveLength(0);
});

test("Contact#findByCoin", async () => {
	expect(subject.findByCoin(john.addresses[0].coin)).toHaveLength(1);
	expect(subject.findByCoin(jane.addresses[0].coin)).toHaveLength(1);
	expect(subject.findByCoin("invalid")).toHaveLength(0);
});

test("Contact#findByNetwork", async () => {
	expect(subject.findByNetwork(john.addresses[0].network)).toHaveLength(1);
	expect(subject.findByNetwork(jane.addresses[0].network)).toHaveLength(1);
	expect(subject.findByNetwork("invalid")).toHaveLength(0);
});

test("Contact#flush", async () => {
	expect(subject.all()).toHaveLength(2);

	await subject.flush();

	expect(subject.all()).toHaveLength(0);
});
