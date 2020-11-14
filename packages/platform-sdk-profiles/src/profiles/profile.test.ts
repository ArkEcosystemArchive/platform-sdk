import "jest-extended";

import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import nock from "nock";

import { container } from "../environment/container";
import { Identifiers } from "../environment/container.models";
import { PluginRepository } from "../plugins/plugin-repository";
import { ContactRepository } from "../repositories/contact-repository";
import { DataRepository } from "../repositories/data-repository";
import { NotificationRepository } from "../repositories/notification-repository";
import { SettingRepository } from "../repositories/setting-repository";
import { WalletRepository } from "../repositories/wallet-repository";
import { CountAggregate } from "./aggregates/count-aggregate";
import { TransactionAggregate } from "./aggregates/transaction-aggregate";
import { WalletAggregate } from "./aggregates/wallet-aggregate";
import { Authenticator } from "./authenticator";
import { Profile } from "./profile";
import { ProfileSetting } from "./profile.models";

let subject: Profile;

beforeAll(() => {
	nock(/.+/)
		.get("/api/node/configuration/crypto")
		.reply(200, require("../../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/peers")
		.reply(200, require("../../test/fixtures/client/peers.json"))
		.get("/api/node/syncing")
		.reply(200, require("../../test/fixtures/client/syncing.json"))
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require("../../test/fixtures/client/wallet.json"))
		.persist();

	container.set(Identifiers.HttpClient, new Request());
	container.set(Identifiers.Coins, { ARK });
});

beforeEach(() => {
	subject = new Profile("uuid");
	subject.settings().set(ProfileSetting.Name, "John Doe");
});

it("should have an id", () => {
	expect(subject.id()).toBe("uuid");
});

it("should have a name", () => {
	expect(subject.name()).toBe("John Doe");
});

it("should have a default avatar", () => {
	expect(subject.avatar()).toMatchInlineSnapshot(
		`"<svg version=\\"1.1\\" xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"100\\" height=\\"100\\" viewBox=\\"0 0 100 100\\"><style>circle{mix-blend-mode:soft-light;}</style><rect fill=\\"rgb(233, 30, 99)\\" width=\\"100\\" height=\\"100\\"/><circle r=\\"45\\" cx=\\"80\\" cy=\\"30\\" fill=\\"rgb(76, 175, 80)\\"/><circle r=\\"55\\" cx=\\"0\\" cy=\\"60\\" fill=\\"rgb(255, 152, 0)\\"/><circle r=\\"40\\" cx=\\"50\\" cy=\\"50\\" fill=\\"rgb(3, 169, 244)\\"/></svg>"`,
	);
});

it("should have a custom avatar", () => {
	subject.settings().set(ProfileSetting.Avatar, "custom-avatar");

	expect(subject.avatar()).toBe("custom-avatar");
});

it("should have a contacts repository", () => {
	expect(subject.contacts()).toBeInstanceOf(ContactRepository);
});

it("should have a data repository", () => {
	expect(subject.data()).toBeInstanceOf(DataRepository);
});

it("should have a notifications repository", () => {
	expect(subject.notifications()).toBeInstanceOf(NotificationRepository);
});

it("should have a plugins repository", () => {
	expect(subject.plugins()).toBeInstanceOf(PluginRepository);
});

it("should have a settings repository", () => {
	expect(subject.settings()).toBeInstanceOf(SettingRepository);
});

it("should have a wallets repository", () => {
	expect(subject.wallets()).toBeInstanceOf(WalletRepository);
});

it("should flush all data", () => {
	expect(subject.settings().keys()).toHaveLength(1);

	subject.flush();

	expect(subject.settings().keys()).toHaveLength(14);
});

it("should fail to flush all data if the name is missing", () => {
	subject.settings().forget(ProfileSetting.Name);

	expect(subject.settings().keys()).toHaveLength(0);

	expect(() => subject.flush()).toThrowError("The name of the profile could not be found. This looks like a bug.");
});

it("should have a count aggregate", () => {
	expect(subject.countAggregate()).toBeInstanceOf(CountAggregate);
});

it("should have a transaction aggregate", () => {
	expect(subject.transactionAggregate()).toBeInstanceOf(TransactionAggregate);
});

it("should have a wallet aggregate", () => {
	expect(subject.walletAggregate()).toBeInstanceOf(WalletAggregate);
});

it("should have an authenticator", () => {
	expect(subject.auth()).toBeInstanceOf(Authenticator);
});

it("should determine if the password uses a password", () => {
	expect(subject.usesPassword()).toBeFalse();

	subject.auth().setPassword("password");

	expect(subject.usesPassword()).toBeTrue();
});

it("should turn into an object", () => {
	expect(subject.toObject()).toEqual({
		id: "uuid",
		contacts: {},
		data: {},
		notifications: {},
		peers: {},
		plugins: {
			data: {},
			blacklist: [],
		},
		settings: {
			NAME: "John Doe",
		},
		wallets: {},
	});
});
