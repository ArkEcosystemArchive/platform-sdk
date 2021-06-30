import "jest-extended";
import "reflect-metadata";

import nock from "nock";

import { identity } from "../test/fixtures/identity";
import { bootContainer, importByAddressWithDerivationPath, importByMnemonic, generateWallet } from "../test/mocking";
import { Profile } from "./profile";
import { IProfile, ProfileSetting } from "./contracts";
import { ProfileSerialiser } from "./profile.serialiser";

let subject: ProfileSerialiser;
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
		.get("/api/wallets/D6i8P5N44rFto6M6RALyUXLLs7Q1A1WREW")
		.reply(200, require("../test/fixtures/client/wallet.json"))
		.get("/api/wallets/DNc92FQmYu8G9Xvo6YqhPtRxYsUxdsUn9w")
		.reply(200, require("../test/fixtures/client/wallet-2.json"))
		.persist();
});

beforeEach(() => {
	profile = new Profile({ id: "uuid", name: "name", data: "" });
	subject = new ProfileSerialiser(profile);

	profile.settings().set(ProfileSetting.Name, "John Doe");
});

it("should turn into an object", () => {
	expect(subject.toJSON()).toMatchInlineSnapshot(`
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

describe("should turn into an object with options", () => {
	let profile: IProfile;

	beforeEach(() => {
		profile = new Profile({ id: "uuid", name: "name", data: "" });
		profile.settings().set(ProfileSetting.Name, "John Doe");

		subject = new ProfileSerialiser(profile);
	});

	it("should not exclude anything", async () => {
		await importByMnemonic(profile, identity.mnemonic, "ARK", "ark.devnet");

		const filtered = subject.toJSON({
			excludeEmptyWallets: false,
			excludeLedgerWallets: false,
			addNetworkInformation: true,
			saveGeneralSettings: true,
		});

		expect(Object.keys(filtered.wallets)).toHaveLength(1);
	});

	it("should exclude empty wallets", async () => {
		await generateWallet(profile, "ARK", "ark.devnet");
		const filtered = subject.toJSON({
			excludeEmptyWallets: true,
			excludeLedgerWallets: false,
			addNetworkInformation: true,
			saveGeneralSettings: true,
		});

		expect(Object.keys(filtered.wallets)).toHaveLength(0);
	});

	it("should exclude ledger wallets", async () => {
		await importByAddressWithDerivationPath(profile, identity.address, "ARK", "ark.devnet", "0");

		const filtered = subject.toJSON({
			excludeEmptyWallets: false,
			excludeLedgerWallets: true,
			addNetworkInformation: true,
			saveGeneralSettings: true,
		});

		expect(Object.keys(filtered.wallets)).toHaveLength(0);
	});

	it("should not include network information", async () => {
		await importByMnemonic(profile, identity.mnemonic, "ARK", "ark.devnet");

		expect(() =>
			subject.toJSON({
				excludeEmptyWallets: false,
				excludeLedgerWallets: false,
				addNetworkInformation: false,
				saveGeneralSettings: true,
			}),
		).toThrow("This is not implemented yet");
	});

	it("should not include general settings", async () => {
		expect(() =>
			subject.toJSON({
				excludeEmptyWallets: false,
				excludeLedgerWallets: false,
				addNetworkInformation: true,
				saveGeneralSettings: false,
			}),
		).toThrow("This is not implemented yet");
	});
});
