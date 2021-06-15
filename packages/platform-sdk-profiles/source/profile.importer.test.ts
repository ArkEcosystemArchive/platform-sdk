import "jest-extended";
import "reflect-metadata";

import { Base64 } from "@arkecosystem/platform-sdk-crypto";
import nock from "nock";

import { identity } from "../test/fixtures/identity";
import { bootContainer, importByMnemonic } from "../test/mocking";
import { Profile } from "./profile";
import { IProfile, IProfileRepository, ProfileSetting } from "./contracts";
import { ProfileImporter } from "./profile.importer";
import { ProfileDumper } from "./profile.dumper";
import { ProfileSerialiser } from "./profile.serialiser";
import { container } from "./container";
import { Identifiers } from "./container.models";
import { ProfileRepository } from "./profile.repository";

let subject: ProfileImporter;
let dumper: ProfileDumper;
let serialiser: ProfileSerialiser;
let repository: ProfileRepository;
let profile: IProfile;

beforeAll(() => {
	bootContainer();

	nock.disableNetConnect();

	nock(/.+/)
		.get("/api/node/configuration/crypto")
		.reply(200, require("../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/peers")
		.reply(200, require("../test/fixtures/client/peers.json"))
		.get("/api/node/syncing")
		.reply(200, require("../test/fixtures/client/syncing.json"))
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require("../test/fixtures/client/wallet.json"))
		.get("/api/wallets/DNc92FQmYu8G9Xvo6YqhPtRxYsUxdsUn9w")
		.reply(200, require("../test/fixtures/client/wallet-2.json"))
		.persist();
});

beforeEach(() => {
	container.get<IProfileRepository>(Identifiers.ProfileRepository).flush();

	profile = container.get<IProfileRepository>(Identifiers.ProfileRepository).create("John Doe");
	subject = new ProfileImporter(profile);
	dumper = new ProfileDumper(profile);
	serialiser = new ProfileSerialiser(profile);
	repository = new ProfileRepository();
});

describe("#restore", () => {
	it("should restore a profile with a password", async () => {
		profile.auth().setPassword("password");

		repository.persist(profile);

		const profileCopy: IProfile = new Profile(dumper.dump());

		await importByMnemonic(profileCopy, identity.mnemonic, "ARK", "ark.devnet");

		serialiser = new ProfileSerialiser(profileCopy);

		await subject.import("password");
		await profileCopy.sync();

		expect(serialiser.toJSON()).toContainAllKeys([
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

		subject = new ProfileImporter(profile);

		await expect(subject.import()).rejects.toThrow();
	});

	it("should restore a profile without a password", async () => {
		const profileCopy: IProfile = new Profile(dumper.dump());

		subject = new ProfileImporter(profileCopy);

		await subject.import();

		expect(new ProfileSerialiser(profile).toJSON()).toEqual(new ProfileSerialiser(profileCopy).toJSON());
	});

	it("should fail to restore if profile is not using password but password is passed", async () => {
		const profileCopy: IProfile = new Profile(dumper.dump());

		subject = new ProfileImporter(profileCopy);

		await expect(subject.import("password")).rejects.toThrow(
			"Failed to decode or decrypt the profile. Reason: This profile does not use a password but password was passed for decryption",
		);
	});

	it("should fail to restore a profile with a password if no password was provided", async () => {
		profile.auth().setPassword("password");

		repository.persist(profile);

		const profileCopy: IProfile = new Profile(dumper.dump());

		subject = new ProfileImporter(profileCopy);

		await expect(subject.import()).rejects.toThrow("Failed to decode or decrypt the profile.");
	});

	it("should fail to restore a profile with a password if an invalid password was provided", async () => {
		profile.auth().setPassword("password");

		const profileCopy: IProfile = new Profile(dumper.dump());

		subject = new ProfileImporter(profileCopy);

		await expect(subject.import("invalid-password")).rejects.toThrow("Failed to decode or decrypt the profile.");
	});

	it("should restore a profile with wallets and contacts", async () => {
		const withWallets = {
			id: "uuid",
			contacts: {
				"448042c3-a405-4895-970e-a33c6e907905": {
					id: "448042c3-a405-4895-970e-a33c6e907905",
					name: "John",
					starred: false,
					addresses: [
						{
							id: "3a7a9e03-c10b-4135-88e9-92e586d53e69",
							coin: "ARK",
							network: "ark.devnet",
							address: "test",
						},
						{
							id: "dfc3a16d-47b8-47f2-9b6f-fe4b8365a64a",
							coin: "ARK",
							network: "ark.mainnet",
							address: "test",
						},
					],
				},
			},
			data: { key: "value" },
			notifications: {},
			peers: {},
			plugins: {
				data: {},
			},
			settings: {
				[ProfileSetting.AdvancedMode]: false,
				[ProfileSetting.AutomaticSignOutPeriod]: 60,
				[ProfileSetting.Bip39Locale]: "english",
				[ProfileSetting.DashboardTransactionHistory]: false,
				[ProfileSetting.DoNotShowFeeWarning]: false,
				[ProfileSetting.ErrorReporting]: false,
				[ProfileSetting.ExchangeCurrency]: "ADA",
				[ProfileSetting.Locale]: "en-US",
				[ProfileSetting.MarketProvider]: "coingecko",
				[ProfileSetting.Name]: "John Doe",
				[ProfileSetting.NewsFilters]: JSON.stringify({ categories: [], coins: ["ARK"] }),
				[ProfileSetting.ScreenshotProtection]: false,
				[ProfileSetting.Theme]: "dark",
				[ProfileSetting.TimeFormat]: "HH::MM",
				[ProfileSetting.UseTestNetworks]: false,
			},
			wallets: {
				"88ff9e53-7d40-420d-8f39-9f24acee2164": {
					id: "88ff9e53-7d40-420d-8f39-9f24acee2164",
					data: {
						COIN: "ARK",
						NETWORK: "ark.devnet",
						ADDRESS: "D6Z26L69gdk9qYmTv5uzk3uGepigtHY4ax",
						PUBLIC_KEY: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
						BALANCE: {},
						SEQUENCE: {},
					},
					settings: {
						AVATAR: "...",
					},
				},
				"ac38fe6d-4b67-4ef1-85be-17c5f6841129": {
					id: "ac38fe6d-4b67-4ef1-85be-17c5f6841129",
					data: {
						COIN: "ARK",
						NETWORK: "ark.devnet",
						ADDRESS: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
						PUBLIC_KEY: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
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
		subject = new ProfileImporter(profile);
		await subject.import();

		expect(profile.wallets().count()).toEqual(2);
		expect(profile.settings().get(ProfileSetting.Theme)).toEqual("dark");
	});

	it("should apply migrations if any are set", async () => {
		const migrationFunction = jest.fn();
		const migrations = { "1.0.1": migrationFunction };

		container.constant(Identifiers.MigrationSchemas, migrations);
		container.constant(Identifiers.MigrationVersion, "1.0.2");

		subject = new ProfileImporter(new Profile(dumper.dump()));

		await subject.import();

		expect(migrationFunction).toHaveBeenCalled();
	});
});
