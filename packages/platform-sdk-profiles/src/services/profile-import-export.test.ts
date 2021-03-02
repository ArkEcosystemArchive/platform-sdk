import { Profile } from "../profiles/profile";
import { ProfileSetting } from "../profiles/profile.models";
import { bootContainer } from "../../test/helpers";
import { ProfileImportExport } from "./profile-import-export";
import { identity } from "../../test/fixtures/identity";
import nock = require("nock");

let profile: Profile;

beforeAll(() => {
	bootContainer();

	nock.disableNetConnect();

	nock(/.+/)
		.get("/api/node/configuration/crypto")
		.reply(200, require("../../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/peers")
		.reply(200, require("../../test/fixtures/client/peers.json"))
		.get("/api/node/syncing")
		.reply(200, require("../../test/fixtures/client/syncing.json"))
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require("../../test/fixtures/client/wallet.json"))
		.get("/api/wallets/DNc92FQmYu8G9Xvo6YqhPtRxYsUxdsUn9w")
		.reply(200, require("../../test/fixtures/client/wallet-2.json"))
		.persist();
});

beforeEach(() => {
	profile = new Profile({ id: "uuid", name: "name", data: "" });
	profile.settings().set(ProfileSetting.Name, "John Doe");
});

describe("#export", () => {
	it("should not exclude anything", async () => {
		await profile.wallets().importByMnemonic(identity.mnemonic, "ARK", "ark.devnet");
		profile.save();

		const filtered = ProfileImportExport.filter(profile, {
			addNetworkInformation: false,
			excludeEmptyWallets: false,
			excludeLedgerWallets: false,
			excludeWalletsWithoutName: false,
			saveGeneralSettings: false,
		});

		expect(filtered.wallets().count()).toBe(1);
	});

	it("should exclude empty wallets", async () => {
		await profile.wallets().importByMnemonic(identity.mnemonic, "ARK", "ark.devnet");
		profile.save();

		const filtered = ProfileImportExport.filter(profile, {
			addNetworkInformation: false,
			excludeEmptyWallets: true,
			excludeLedgerWallets: false,
			excludeWalletsWithoutName: false,
			saveGeneralSettings: false,
		});

		expect(filtered.wallets().keys()).toBeEmpty();
	});

	it("should exclude ledger wallets", async () => {
		await profile.wallets().importByMnemonic(identity.mnemonic, "ARK", "ark.devnet");
		profile.save();

		const filtered = ProfileImportExport.filter(profile, {
			addNetworkInformation: false,
			excludeEmptyWallets: false,
			excludeLedgerWallets: true,
			excludeWalletsWithoutName: false,
			saveGeneralSettings: false,
		});

		expect(filtered.wallets().keys()).toBeEmpty();
	});

	it("should exclude wallets without a name", async () => {
		await profile.wallets().importByAddress("DNc92FQmYu8G9Xvo6YqhPtRxYsUxdsUn9w", "ARK", "ark.devnet");
		profile.save();

		const filtered = ProfileImportExport.filter(profile, {
			addNetworkInformation: false,
			excludeEmptyWallets: false,
			excludeLedgerWallets: false,
			excludeWalletsWithoutName: true,
			saveGeneralSettings: false,
		});

		expect(filtered.wallets().keys()).toBeEmpty();
	});

	it("should include network information", async () => {
		await profile.wallets().importByMnemonic(identity.mnemonic, "ARK", "ark.devnet");
		profile.save();

		const filtered = ProfileImportExport.filter(profile, {
			addNetworkInformation: true,
			excludeEmptyWallets: false,
			excludeLedgerWallets: false,
			excludeWalletsWithoutName: false,
			saveGeneralSettings: false,
		});

		expect(filtered.wallets().count()).toBe(1);
		expect(filtered.wallets().first().network()).toBeDefined();
		expect(filtered.settings()).toBeUndefined();
	});

	it("should include general settings", async () => {
		profile.save();

		const filtered = ProfileImportExport.filter(profile, {
			addNetworkInformation: false,
			excludeEmptyWallets: false,
			excludeLedgerWallets: false,
			excludeWalletsWithoutName: false,
			saveGeneralSettings: true,
		});

		expect(filtered.settings()).toBeDefined();
	});
});
