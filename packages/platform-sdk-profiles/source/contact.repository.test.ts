import "jest-extended";
import "reflect-metadata";

import nock from "nock";

import { identity } from "../test/fixtures/identity";
import { bootContainer, importByMnemonic } from "../test/mocking";
import { ProfileSetting } from "./contracts";
import { Profile } from "./profile";
import { ContactRepository } from "./contact.repository";

let subject: ContactRepository;

const name = "John Doe";
const addr = { coin: "ARK", network: "ark.devnet", address: "D6i8P5N44rFto6M6RALyUXLLs7Q1A1WREW" };

beforeAll(() => bootContainer());

beforeEach(async () => {
	nock.cleanAll();

	nock(/.+/)
		.get("/api/node/configuration")
		.reply(200, require("../test/fixtures/client/configuration.json"))
		.get("/api/peers")
		.reply(200, require("../test/fixtures/client/peers.json"))
		.get("/api/node/configuration/crypto")
		.reply(200, require("../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/node/syncing")
		.reply(200, require("../test/fixtures/client/syncing.json"))
		.get("/api/wallets/D6i8P5N44rFto6M6RALyUXLLs7Q1A1WREW")
		.reply(200, require("../test/fixtures/client/wallet.json"))
		.persist();

	const profile = new Profile({ id: "profile-id", name: "name", avatar: "avatar", data: "" });
	profile.settings().set(ProfileSetting.Name, "John Doe");

	await importByMnemonic(profile, identity.mnemonic, "ARK", "ark.devnet");

	subject = new ContactRepository(profile);

	subject.flush();
});

beforeAll(() => nock.disableNetConnect());

it("#first | #last", async () => {
	const john = subject.create("John");
	const jane = subject.create("Jane");

	expect(subject.first()).toEqual(john);
	expect(subject.last()).toEqual(jane);
});

test("#create", () => {
	expect(subject.keys()).toHaveLength(0);

	subject.create(name);

	expect(subject.keys()).toHaveLength(1);

	expect(() => subject.create(name)).toThrowError(`The contact [${name}] already exists.`);
});

test("#find", () => {
	expect(() => subject.findById("invalid")).toThrowError("Failed to find");

	const contact = subject.create(name);

	expect(subject.findById(contact.id())).toBeObject();
});

test("#update", async () => {
	await expect(subject.update("invalid", { name: "Jane Doe" })).rejects.toThrowError("Failed to find");

	const contact = subject.create(name);

	await subject.update(contact.id(), { name: "Jane Doe" });

	expect(subject.findById(contact.id()).name()).toEqual("Jane Doe");

	const anotherContact = subject.create("Another name");

	await expect(subject.update(anotherContact.id(), { name: "Dorothy" })).toResolve();

	const newContact = subject.create("Another name");

	await expect(subject.update(newContact.id(), { name: "Jane Doe" })).rejects.toThrowError(
		"The contact [Jane Doe] already exists.",
	);
});

test("#update with addresses", async () => {
	const contact = subject.create(name);

	await subject.update(contact.id(), { name: "Jane Doe" });

	await subject.update(contact.id(), {
		addresses: [
			{
				coin: "ARK",
				network: "ark.devnet",
				address: "D6i8P5N44rFto6M6RALyUXLLs7Q1A1WREW",
			},
		],
	});

	expect(contact.toObject().addresses).toHaveLength(1);
});

test("#forget", () => {
	expect(() => subject.forget("invalid")).toThrowError("Failed to find");

	const contact = subject.create(name);

	subject.forget(contact.id());

	expect(() => subject.findById(contact.id())).toThrowError("Failed to find");
});

test("#findByAddress", async () => {
	const wallet = await subject.create(name).addresses().create(addr);

	expect(subject.findByAddress(wallet.address())).toHaveLength(1);
	expect(subject.findByAddress("invalid")).toHaveLength(0);
});

test("#findByCoin", async () => {
	const wallet = await subject.create(name).addresses().create(addr);

	expect(subject.findByCoin(wallet.coin())).toHaveLength(1);
	expect(subject.findByCoin("invalid")).toHaveLength(0);
});

test("#findByNetwork", async () => {
	const wallet = await subject.create(name).addresses().create(addr);

	expect(subject.findByNetwork(wallet.network())).toHaveLength(1);
	expect(subject.findByNetwork("invalid")).toHaveLength(0);
});

test("#flush", async () => {
	const wallet = await subject.create(name).addresses().create(addr);

	expect(subject.keys()).toHaveLength(1);

	subject.flush();

	expect(subject.keys()).toHaveLength(0);
});
