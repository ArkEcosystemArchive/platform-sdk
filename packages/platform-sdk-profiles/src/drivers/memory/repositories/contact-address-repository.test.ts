import "jest-extended";
import "reflect-metadata";

import nock from "nock";
import { v4 as uuidv4 } from "uuid";

import { bootContainer } from "../../../../test/helpers";
import { ContactAddressRepository } from "./contact-address-repository";
import { Profile } from "../profiles/profile";

let subject: ContactAddressRepository;

const stubData = {
	coin: "ARK",
	network: "ark.devnet",
	name: "John Doe",
	address: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
};

beforeEach(async () => {
	nock.cleanAll();

	nock(/.+/)
		.get("/api/node/configuration")
		.reply(200, require("../../../../test/fixtures/client/configuration.json"))
		.get("/api/peers")
		.reply(200, require("../../../../test/fixtures/client/peers.json"))
		.get("/api/node/configuration/crypto")
		.reply(200, require("../../../../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/node/syncing")
		.reply(200, require("../../../../test/fixtures/client/syncing.json"))
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require("../../../../test/fixtures/client/wallet.json"))
		.persist();

	const profile = new Profile({ id: "uuid", name: "name", avatar: "avatar", data: "" });
	profile.coins().push("ARK", "ark.devnet");

	subject = new ContactAddressRepository(profile);
});

beforeAll(() => {
	bootContainer();

	nock.disableNetConnect();
});

test("#create", async () => {
	expect(subject.keys()).toHaveLength(0);

	await subject.create(stubData);

	expect(subject.keys()).toHaveLength(1);
});

test("#all", () => {
	expect(subject.all()).toBeObject();
});

test("#first", async () => {
	const address = await subject.create(stubData);

	expect(subject.first()).toBe(address);
});

test("#last", async () => {
	const address = await subject.create(stubData);

	expect(subject.last()).toBe(address);
});

test("#count", async () => {
	await subject.create(stubData);

	expect(subject.count()).toBe(1);
});

test("#fill", async () => {
	const id: string = uuidv4();

	await subject.fill([{ id, ...stubData }]);

	expect(subject.findById(id)).toBeObject();
});

test("#toArray", async () => {
	const wallet = await subject.create(stubData);

	expect(subject.toArray()).toStrictEqual([wallet.toObject()]);
});

test("#find", async () => {
	expect(() => subject.findById("invalid")).toThrowError("Failed to find");

	const address = await subject.create(stubData);

	expect(subject.findById(address.id())).toBeObject();
});

test("#update invalid", async () => {
	expect(() => subject.update("invalid", { name: "Jane Doe" })).toThrowError("Failed to find");
});

test("#update both", async () => {
	const address = await subject.create(stubData);

	subject.update(address.id(), { name: "Jane Doe", address: "new address" });

	expect(subject.findById(address.id()).name()).toEqual("Jane Doe");
	expect(subject.findByAddress("new address")[0].name()).toEqual("Jane Doe");
});

test("#update name", async () => {
	const address = await subject.create(stubData);

	subject.update(address.id(), { name: "Jane Doe" });

	expect(subject.findById(address.id()).name()).toEqual("Jane Doe");
});

test("#update address", async () => {
	const address = await subject.create(stubData);

	subject.update(address.id(), { address: "new address" });

	expect(subject.findByAddress("new address")[0].name()).toEqual("John Doe");
});

test("#forget", async () => {
	expect(() => subject.forget("invalid")).toThrowError("Failed to find");

	const address = await subject.create(stubData);

	subject.forget(address.id());

	expect(() => subject.findById(address.id())).toThrowError("Failed to find");
});

test("#findByAddress", async () => {
	const address = await subject.create(stubData);

	expect(subject.findByAddress(address.address())).toHaveLength(1);
	expect(subject.findByAddress("invalid")).toHaveLength(0);
});

test("#findByCoin", async () => {
	const address = await subject.create(stubData);

	expect(subject.findByCoin(address.coin())).toHaveLength(1);
	expect(subject.findByCoin("invalid")).toHaveLength(0);
});

test("#findByNetwork", async () => {
	const address = await subject.create(stubData);

	expect(subject.findByNetwork(address.network())).toHaveLength(1);
	expect(subject.findByNetwork("invalid")).toHaveLength(0);
});

test("#flush", async () => {
	await subject.create(stubData);

	expect(subject.keys()).toHaveLength(1);

	subject.flush();

	expect(subject.keys()).toHaveLength(0);
});
