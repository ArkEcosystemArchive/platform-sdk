import "jest-extended";
import "reflect-metadata";

import nock from "nock";

import { bootContainer } from "../../../../test/helpers";
import { Profile } from "../profiles/profile";
import { ContactAddressRepository } from "../repositories/contact-address-repository";
import { Contact } from "./contact";

beforeAll(() => bootContainer());

describe("contact", () => {
	let subject: Contact;

	beforeEach(async () => {
		const profile = new Profile({ id: "uuid", name: "name", avatar: "avatar", data: "" });
		profile.coins().push("ARK", "ark.devnet");

		subject = new Contact({
			id: "uuid",
			name: "John Doe",
			starred: true,
		}, profile);
	});

	it("should have an id", () => {
		expect(subject.id()).toBe("uuid");
	});

	it("should have a name", () => {
		expect(subject.name()).toBe("John Doe");
	});

	it("should be able to change name", () => {
		subject.setName("Jane Doe");
		expect(subject.name()).toBe("Jane Doe");
	});

	it("should have starred state", () => {
		expect(subject.isStarred()).toBeTrue();
	});

	it("should be able to toggle starred state", () => {
		subject.toggleStarred();
		expect(subject.isStarred()).toBeFalse();
	});

	it("should have an avatar", () => {
		expect(subject.avatar()).toMatchInlineSnapshot(
			`"<svg version=\\"1.1\\" xmlns=\\"http://www.w3.org/2000/svg\\" class=\\"picasso\\" width=\\"100\\" height=\\"100\\" viewBox=\\"0 0 100 100\\"><style>.picasso circle{mix-blend-mode:soft-light;}</style><rect fill=\\"rgb(233, 30, 99)\\" width=\\"100\\" height=\\"100\\"/><circle r=\\"45\\" cx=\\"80\\" cy=\\"30\\" fill=\\"rgb(76, 175, 80)\\"/><circle r=\\"55\\" cx=\\"0\\" cy=\\"60\\" fill=\\"rgb(255, 152, 0)\\"/><circle r=\\"40\\" cx=\\"50\\" cy=\\"50\\" fill=\\"rgb(3, 169, 244)\\"/></svg>"`,
		);
	});

	it("should map to object", () => {
		expect(subject.toObject()).toStrictEqual({
			addresses: [],
			id: "uuid",
			name: "John Doe",
			starred: true,
		});
	});

	it("should return addresses", () => {
		expect(subject.addresses()).toBeInstanceOf(ContactAddressRepository);
	});

	it("should have be able to set addresses", async () => {
		await subject.setAddresses([]);
		expect(subject.addresses().count()).toBe(0);
	});

	it("should be able to restore addresses", async () => {
		nock.disableNetConnect();
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

		await subject.restore([
			{
				id: "uuid",
				coin: "ARK",
				network: "ark.devnet",
				name: "John Doe",
				address: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
			},
		]);

		expect(subject.addresses().count()).toEqual(1);
	});

	it("should be able to set addresses", async () => {
		const contactAddress = {
			coin: "ARK",
			network: "ark.devnet",
			name: "John Doe",
			address: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
		};

		await subject.setAddresses([contactAddress]);
		expect(subject.addresses().count()).toEqual(1);
	});
});
