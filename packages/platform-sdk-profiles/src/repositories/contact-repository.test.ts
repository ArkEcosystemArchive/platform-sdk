import "jest-extended";

import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import nock from "nock";

import { identity } from "../../test/fixtures/identity";
import { container } from "../container";
import { Identifiers } from "../container.models";
import { Profile } from "../profile";
import { Wallet } from "../wallet";
import { ContactRepository } from "./contact-repository";

let subject: ContactRepository;

const name = "John Doe";
const addr = { name: "JDB", coin: "ARK", network: "devnet", address: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib" };

let walletARK: Wallet;
beforeEach(async () => {
	nock.cleanAll();

	nock(/.+/)
		.get("/api/node/configuration")
		.reply(200, require("../../test/fixtures/client/configuration.json"))
		.get("/api/peers")
		.reply(200, require("../../test/fixtures/client/peers.json"))
		.get("/api/node/configuration/crypto")
		.reply(200, require("../../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/node/syncing")
		.reply(200, require("../../test/fixtures/client/syncing.json"))
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require("../../test/fixtures/client/wallet.json"))
		.persist();

	container.set(Identifiers.HttpClient, new Request());
	container.set(Identifiers.Coins, { ARK });

	const profile = new Profile("profile-id", "John Doe");
	walletARK = await profile.wallets().importByMnemonic(identity.mnemonic, "ARK", "devnet");

	subject = new ContactRepository(profile);

	subject.flush();
});

beforeAll(() => nock.disableNetConnect());

test("ContactRepository#create", () => {
	expect(subject.keys()).toHaveLength(0);

	subject.create(name);

	expect(subject.keys()).toHaveLength(1);
});

test("ContactRepository#find", () => {
	expect(() => subject.findById("invalid")).toThrowError("Failed to find");

	const contact = subject.create(name);

	expect(subject.findById(contact.id())).toBeObject();
});

test("ContactRepository#update", async () => {
	await expect(subject.update("invalid", { name: "Jane Doe" })).rejects.toThrowError("Failed to find");

	const contact = subject.create(name);

	await subject.update(contact.id(), { name: "Jane Doe" });

	expect(subject.findById(contact.id()).name()).toEqual("Jane Doe");
});

test("ContactRepository#forget", () => {
	expect(() => subject.forget("invalid")).toThrowError("Failed to find");

	const contact = subject.create(name);

	subject.forget(contact.id());

	expect(() => subject.findById(contact.id())).toThrowError("Failed to find");
});

test("ContactRepository#findByAddress", async () => {
	const wallet = await subject.create(name).addresses().create(addr);

	expect(subject.findByAddress(wallet.address())).toHaveLength(1);
	expect(subject.findByAddress("invalid")).toHaveLength(0);
});

test("ContactRepository#findByCoin", async () => {
	const wallet = await subject.create(name).addresses().create(addr);

	expect(subject.findByCoin(wallet.coin())).toHaveLength(1);
	expect(subject.findByCoin("invalid")).toHaveLength(0);
});

test("ContactRepository#findByNetwork", async () => {
	const wallet = await subject.create(name).addresses().create(addr);

	expect(subject.findByNetwork(wallet.network())).toHaveLength(1);
	expect(subject.findByNetwork("invalid")).toHaveLength(0);
});

test("ContactRepository#flush", async () => {
	const wallet = await subject.create(name).addresses().create(addr);

	expect(subject.keys()).toHaveLength(1);

	subject.flush();

	expect(subject.keys()).toHaveLength(0);
});
