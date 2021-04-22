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

it("should turn into an object with options", () => {
	let profile: IProfile;

	beforeEach(() => {
		profile = new Profile({ id: "uuid", name: "name", data: "" });
		profile.settings().set(ProfileSetting.Name, "John Doe");
	});

	it("should not exclude anything", async () => {
		await importByMnemonic(profile, identity.mnemonic, "ARK", "ark.devnet");
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
		await generateWallet(profile, "ARK", "ark.devnet");
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
		await importByAddressWithLedgerPath(profile, identity.address, "ARK", "ark.devnet", "0");
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
		await importByMnemonic(profile, identity.mnemonic, "ARK", "ark.devnet");
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
