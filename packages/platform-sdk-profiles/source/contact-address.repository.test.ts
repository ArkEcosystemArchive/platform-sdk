import "jest-extended";
import "reflect-metadata";

import nock from "nock";
import { v4 as uuidv4 } from "uuid";

import { bootContainer } from "../test/mocking";
import { ContactAddressRepository } from "./contact-address.repository";
import { Profile } from "./profile";

let subject: ContactAddressRepository;
let profile: Profile;

const stubData = {
	coin: "ARK",
	network: "ark.devnet",
	address: "D6i8P5N44rFto6M6RALyUXLLs7Q1A1WREW",
};

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

	profile = new Profile({ id: "uuid", name: "name", avatar: "avatar", data: "" });
	profile.coins().set("ARK", "ark.devnet");

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
	expect(() => subject.update("invalid", { address: stubData.address })).toThrowError("Failed to find");
});

test("#update address", async () => {
	const address = await subject.create(stubData);

	subject.update(address.id(), { address: "new address" });

	expect(subject.findByAddress("new address")[0].address()).toEqual("new address");
	expect(profile.status().isDirty()).toBeTrue();
});

test("#update without address", async () => {
	const address = await subject.create(stubData);

	subject.update(address.id(), {});

	expect(subject.findByAddress("new address")).toEqual([]);
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
