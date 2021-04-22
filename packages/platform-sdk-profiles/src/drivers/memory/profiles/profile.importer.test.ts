import "jest-extended";
import "reflect-metadata";

import { Base64 } from "@arkecosystem/platform-sdk-crypto";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import nock from "nock";

import { identity } from "../../../../test/fixtures/identity";
import { bootContainer, importByAddressWithLedgerPath, importByMnemonic, generateWallet } from "../../../../test/helpers";
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

describe("#restore", () => {
	it("should restore a profile with a password", async () => {
		subject.auth().setPassword("password");
		subject.save("password");

		const profile: IProfile = new Profile(subject.dump());

		await importByMnemonic(profile, identity.mnemonic, "ARK", "ark.devnet");

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
