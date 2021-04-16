import "jest-extended";
import "reflect-metadata";

import { Base64 } from "@arkecosystem/platform-sdk-crypto";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import nock from "nock";

import { identity } from "../../../../test/fixtures/identity";
import { bootContainer } from "../../../../test/helpers";
import { PluginRepository } from "../plugins/plugin-repository";
import { ContactRepository } from "../repositories/contact-repository";
import { DataRepository } from "../../../repositories/data-repository";
import { NotificationRepository } from "../repositories/notification-repository";
import { SettingRepository } from "../repositories/setting-repository";
import { WalletRepository } from "../repositories/wallet-repository";
import { CountAggregate } from "./aggregates/count-aggregate";
import { RegistrationAggregate } from "./aggregates/registration-aggregate";
import { TransactionAggregate } from "./aggregates/transaction-aggregate";
import { WalletAggregate } from "./aggregates/wallet-aggregate";
import { Authenticator } from "./authenticator";
import { Profile } from "./profile";
import { IProfile, ProfileSetting } from "../../../contracts";
import { State } from "../../../environment/state";

let subject: IProfile;

beforeAll(() => {
	bootContainer();

	nock.disableNetConnect();

	nock(/.+/)
		.get("/api/node/configuration/crypto")
		.reply(200, require("../../../../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/peers")
		.reply(200, require("../../../../test/fixtures/client/peers.json"))
		.get("/api/node/syncing")
		.reply(200, require("../../../../test/fixtures/client/syncing.json"))
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require("../../../../test/fixtures/client/wallet.json"))
		.get("/api/wallets/DNc92FQmYu8G9Xvo6YqhPtRxYsUxdsUn9w")
		.reply(200, require("../../../../test/fixtures/client/wallet-2.json"))
		.persist();
});

beforeEach(() => {
	subject = new Profile({ id: "uuid", name: "name", data: "" });

	State.profile(subject);

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
		`"<svg version=\\"1.1\\" xmlns=\\"http://www.w3.org/2000/svg\\" class=\\"picasso\\" width=\\"100\\" height=\\"100\\" viewBox=\\"0 0 100 100\\"><style>.picasso circle{mix-blend-mode:soft-light;}</style><rect fill=\\"rgb(233, 30, 99)\\" width=\\"100\\" height=\\"100\\"/><circle r=\\"45\\" cx=\\"80\\" cy=\\"30\\" fill=\\"rgb(76, 175, 80)\\"/><circle r=\\"55\\" cx=\\"0\\" cy=\\"60\\" fill=\\"rgb(255, 152, 0)\\"/><circle r=\\"40\\" cx=\\"50\\" cy=\\"50\\" fill=\\"rgb(3, 169, 244)\\"/></svg>"`,
	);
});

it("should have a custom avatar", () => {
	subject.settings().set(ProfileSetting.Avatar, "custom-avatar");

	expect(subject.avatar()).toBe("custom-avatar");
});

it("should have a balance", () => {
	expect(subject.balance()).toBeInstanceOf(BigNumber);
	expect(subject.balance().toString()).toBe("0");
});

it("should have a converted balance", () => {
	expect(subject.convertedBalance()).toBeInstanceOf(BigNumber);
	expect(subject.convertedBalance().toString()).toBe("0");
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

it("should have a registration aggregate", () => {
	expect(subject.registrationAggregate()).toBeInstanceOf(RegistrationAggregate);
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
	expect(subject.toObject()).toMatchInlineSnapshot(`
		Object {
		  "contacts": Object {},
		  "data": Object {},
		  "id": "uuid",
		  "notifications": Object {},
		  "peers": Object {},
		  "plugins": Object {},
		  "settings": Object {
		    "NAME": "John Doe",
		  },
		  "wallets": Object {},
		}
	`);
});

describe("#dump", () => {
	it("should dump the profile with a password", () => {
		subject.auth().setPassword("password");
		subject.save("password");

		const { id, password, data } = subject.dump();

		expect(id).toBeString();
		expect(password).toBeString();
		expect(data).toBeString();
	});

	it("should dump the profile without a password", () => {
		subject.save();
		const { id, password, data } = subject.dump();

		expect(id).toBeString();
		expect(password).toBeUndefined();
		expect(data).toBeString();
	});

	it("should fail to dump a profile with a password if the profile was not encrypted", () => {
		subject = new Profile({ id: "uuid", name: "name", data: "", password: "password" });

		expect(() => subject.dump()).toThrow(
			"The profile has not been encoded or encrypted. Please call [save] before dumping.",
		);
	});
});

describe("#restore", () => {
	it("should restore a profile with a password", async () => {
		subject.auth().setPassword("password");
		subject.save("password");

		const profile: IProfile = new Profile(subject.dump());

		await profile.wallets().importByMnemonic(identity.mnemonic, "ARK", "ark.devnet");

		await profile.restore("password");
		await profile.sync();

		expect(profile.toObject()).toContainAllKeys([
			"contacts",
			"data",
			"notifications",
			"peers",
			"plugins",
			"data",
			"settings",
			"wallets",
		]);
	});

	it("should fail to restore a profile with corrupted data", async () => {
		const corruptedProfileData = {
			// id: 'uuid',
			contacts: {},
			data: {},
			notifications: {},
			peers: {},
			plugins: { data: {} },
			settings: { NAME: "John Doe" },
			wallets: {},
		};

		const profile: IProfile = new Profile({
			id: "uuid",
			name: "name",
			avatar: "avatar",
			password: undefined,
			data: Base64.encode(JSON.stringify(corruptedProfileData)),
		});

		await expect(profile.restore()).rejects.toThrow();
	});

	it("should restore a profile without a password", async () => {
		subject.save();

		const profile: IProfile = new Profile(subject.dump());

		await profile.restore();

		expect(profile.toObject()).toMatchInlineSnapshot(`
		Object {
		  "contacts": Object {},
		  "data": Object {},
		  "id": "uuid",
		  "notifications": Object {},
		  "peers": Object {},
		  "plugins": Object {},
		  "settings": Object {
		    "NAME": "John Doe",
		  },
		  "wallets": Object {},
		}
	`);
	});

	it("should fail to restore if profile is not using password but password is passed", async () => {
		subject.save();

		const profile: IProfile = new Profile(subject.dump());

		await expect(profile.restore("password")).rejects.toThrow(
			"Failed to decode or decrypt the profile. Reason: This profile does not use a password but password was passed for decryption",
		);
	});

	it("should fail to restore a profile with a password if no password was provided", async () => {
		subject.auth().setPassword("password");
		subject.save("password");

		const profile: IProfile = new Profile(subject.dump());

		await expect(profile.restore()).rejects.toThrow("Failed to decode or decrypt the profile.");
	});

	it("should fail to restore a profile with a password if an invalid password was provided", async () => {
		subject.auth().setPassword("password");
		subject.save("password");

		const profile: IProfile = new Profile(subject.dump());

		await expect(profile.restore("invalid-password")).rejects.toThrow("Failed to decode or decrypt the profile.");
	});

	it("should restore a profile with wallets", async () => {
		const withWallets = {
			id: "uuid",
			contacts: {},
			data: { key: "value" },
			notifications: {},
			peers: {},
			plugins: {
				data: {},
			},
			settings: {
				THEME: "dark",
			},
			wallets: {
				"88ff9e53-7d40-420d-8f39-9f24acee2164": {
					id: "88ff9e53-7d40-420d-8f39-9f24acee2164",
					coin: "ARK",
					network: "ark.devnet",
					address: "D6Z26L69gdk9qYmTv5uzk3uGepigtHY4ax",
					publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
					data: {
						BALANCE: {},
						SEQUENCE: {},
					},
					settings: {
						AVATAR: "...",
					},
				},
				"ac38fe6d-4b67-4ef1-85be-17c5f6841129": {
					id: "ac38fe6d-4b67-4ef1-85be-17c5f6841129",
					coin: "ARK",
					network: "ark.devnet",
					address: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
					publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
					data: {
						BALANCE: {},
						SEQUENCE: {},
					},
					settings: {
						ALIAS: "Johnathan Doe",
						AVATAR: "...",
					},
				},
			},
		};

		const profileDump = {
			id: "uuid",
			name: "name",
			avatar: "avatar",
			password: undefined,
			data: Base64.encode(JSON.stringify(withWallets)),
		};

		const profile = new Profile(profileDump);
		await profile.restore();

		expect(profile.wallets().count()).toEqual(2);
		expect(profile.settings().get(ProfileSetting.Theme)).toEqual("dark");
	});
});

test("#usesMultiPeerBroadcasting", async () => {
	expect(subject.usesMultiPeerBroadcasting()).toBeFalse();

	subject.settings().set(ProfileSetting.UseCustomPeer, true);
	subject.settings().set(ProfileSetting.UseMultiPeerBroadcast, true);

	expect(subject.usesMultiPeerBroadcasting()).toBeTrue();
});

it("should fail to encrypt a profile if the password is invalid", () => {
	subject.auth().setPassword("password");

	expect(() => subject.save("invalid-password")).toThrow("The password did not match our records.");
});

it("should encrypt a profile with the in-memory password if none was provided", () => {
	subject.auth().setPassword("password");

	expect(() => subject.save()).not.toThrow("The password did not match our records.");
});

it("should fail to save if encoding or encrypting fails", () => {
	// @ts-ignore
	const encodingMock = jest.spyOn(JSON, "stringify").mockReturnValue(undefined);

	expect(() => subject.save()).toThrow("Failed to encode or encrypt the profile");
	encodingMock.mockRestore();
});

describe("#toObject with options", () => {
	let profile: IProfile;

	beforeEach(() => {
		profile = new Profile({ id: "uuid", name: "name", data: "" });
		profile.settings().set(ProfileSetting.Name, "John Doe");
	});

	it("should not exclude anything", async () => {
		await profile.wallets().importByMnemonic(identity.mnemonic, "ARK", "ark.devnet");
		profile.save();

		const filtered = profile.toObject({
			excludeEmptyWallets: false,
			excludeLedgerWallets: false,
			addNetworkInformation: true,
			saveGeneralSettings: true,
		});

		expect(Object.keys(filtered.wallets)).toHaveLength(1);
	});

	it("should exclude empty wallets", async () => {
		await profile.wallets().generate("ARK", "ark.devnet");
		profile.save();

		const filtered = profile.toObject({
			excludeEmptyWallets: true,
			excludeLedgerWallets: false,
			addNetworkInformation: true,
			saveGeneralSettings: true,
		});

		expect(Object.keys(filtered.wallets)).toHaveLength(0);
	});

	it("should exclude ledger wallets", async () => {
		await profile.wallets().importByAddressWithLedgerPath(identity.address, "ARK", "ark.devnet", "0");
		profile.save();

		const filtered = profile.toObject({
			excludeEmptyWallets: false,
			excludeLedgerWallets: true,
			addNetworkInformation: true,
			saveGeneralSettings: true,
		});

		expect(Object.keys(filtered.wallets)).toHaveLength(0);
	});

	it("should not include network information", async () => {
		await profile.wallets().importByMnemonic(identity.mnemonic, "ARK", "ark.devnet");
		profile.save();

		expect(() =>
			profile.toObject({
				excludeEmptyWallets: false,
				excludeLedgerWallets: false,
				addNetworkInformation: false,
				saveGeneralSettings: true,
			}),
		).toThrow("This is not implemented yet");
	});

	it("should not include general settings", async () => {
		profile.save();

		expect(() =>
			profile.toObject({
				excludeEmptyWallets: false,
				excludeLedgerWallets: false,
				addNetworkInformation: true,
				saveGeneralSettings: false,
			}),
		).toThrow("This is not implemented yet");
	});
});
