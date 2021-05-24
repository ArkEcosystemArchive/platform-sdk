import "jest-extended";
import "reflect-metadata";

import nock from "nock";

import { bootContainer } from "../../../../test/helpers";
import { ContactAddress } from "./contact-address";
import { Profile } from "../profiles/profile";

let subject: ContactAddress;

beforeAll(() => bootContainer());

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
		.reply(200, require("../../../../test/fixtures/client/wallet-non-resigned.json"))
		.persist();

	const profile = new Profile({ id: "profile-id", name: "name", avatar: "avatar", data: "" });

	const coin = profile.coins().set("ARK", "ark.devnet");
	await coin.__construct();

	subject = new ContactAddress(
		{
			id: "uuid",
			coin: "ARK",
			network: "ark.devnet",
			address: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
		},
		coin,
		profile,
	);

	await subject.syncIdentity();
});

beforeAll(() => nock.disableNetConnect());

it("should have an id", () => {
	expect(subject.id()).toBe("uuid");
});

it("should have a coin", () => {
	expect(subject.coin()).toBe("ARK");
});

it("should have a network", () => {
	expect(subject.network()).toBe("ark.devnet");
});

it("should have an address", () => {
	expect(subject.address()).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
});

it("should have an avatar", () => {
	expect(subject.avatar()).toMatchInlineSnapshot(
		`"<svg version=\\"1.1\\" xmlns=\\"http://www.w3.org/2000/svg\\" class=\\"picasso\\" width=\\"100\\" height=\\"100\\" viewBox=\\"0 0 100 100\\"><style>.picasso circle{mix-blend-mode:soft-light;}</style><rect fill=\\"rgb(233, 30, 99)\\" width=\\"100\\" height=\\"100\\"/><circle r=\\"50\\" cx=\\"60\\" cy=\\"40\\" fill=\\"rgb(139, 195, 74)\\"/><circle r=\\"45\\" cx=\\"0\\" cy=\\"30\\" fill=\\"rgb(0, 188, 212)\\"/><circle r=\\"40\\" cx=\\"90\\" cy=\\"50\\" fill=\\"rgb(255, 193, 7)\\"/></svg>"`,
	);
});

it("should determine if the wallet is a delegate", () => {
	expect(subject.isDelegate()).toBeTrue();
});

it("should determine if the wallet has a multi signature", () => {
	expect(subject.isMultiSignature()).toBeFalse();
});

it("should determine if the wallet has a second signature", () => {
	expect(subject.isSecondSignature()).toBeFalse();
});

it("should has synced with network", () => {
	expect(subject.hasSyncedWithNetwork()).toBeTrue();
});

it("should turn into an object", () => {
	expect(subject.toObject()).toEqual({
		address: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
		coin: "ARK",
		id: "uuid",
		network: "ark.devnet",
	});
});

describe("when contact has not been synchronized yet", () => {
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
			.replyWithError("blah")
			.persist();

		const profile = new Profile({ id: "profile-id", name: "name", avatar: "avatar", data: "" });
		const coin = profile.coins().set("ARK", "ark.devnet");

		subject = new ContactAddress(
			{
				id: "uuid",
				coin: "ARK",
				network: "ark.devnet",
				address: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
			},
			coin,
			profile,
		);
	});

	it("should throw Error trying to determine if the wallet is a delegate", async () => {
		expect(() => subject.isDelegate()).toThrow(
			"This contact has not been synchronized yet. Please call [syncIdentity] before using it.",
		);
	});

	it("should throw Error trying to determine if the wallet is a a multi signature one", async () => {
		expect(() => subject.isMultiSignature()).toThrow(
			"This contact has not been synchronized yet. Please call [syncIdentity] before using it.",
		);
	});

	it("should throw Error trying to determine if the wallet is a a second signature one", async () => {
		expect(() => subject.isSecondSignature()).toThrow(
			"This contact has not been synchronized yet. Please call [syncIdentity] before using it.",
		);
	});

	it("should has synced with network", () => {
		expect(subject.hasSyncedWithNetwork()).toBeFalse();
	});
});

it("should determine if the wallet is known", () => {
	expect(subject.isKnown()).toBeFalse();
});

it("should determine if the wallet is owned by an exchange", () => {
	expect(subject.isOwnedByExchange()).toBeFalse();
});

it("should determine if the wallet is owned by a team", () => {
	expect(subject.isOwnedByTeam()).toBeFalse();
});

it("should change the address", () => {
	subject.setAddress("new address");
	expect(subject.address()).toBe("new address");
});
