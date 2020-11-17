import "jest-extended";

import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import nock from "nock";

import { identity } from "../../../test/fixtures/identity";
import { container } from "../../environment/container";
import { Identifiers } from "../../environment/container.models";
import { Profile } from "../../profiles/profile";
import { ProfileSetting } from "../../profiles/profile.models";
import { ProfileRepository } from "../../repositories/profile-repository";
import { ReadWriteWallet, WalletData } from "../../wallets/wallet.models";
import { CoinService } from "./coin-service";
import { ExchangeRateService } from "./exchange-rate-service";

let profile: Profile;
let wallet: ReadWriteWallet;
let subject: ExchangeRateService;

beforeEach(async () => {
	nock.cleanAll();

	nock(/.+/)
		.get("/api/node/configuration")
		.reply(200, require("../../../test/fixtures/client/configuration.json"))
		.get("/api/peers")
		.reply(200, require("../../../test/fixtures/client/peers.json"))
		.get("/api/node/configuration/crypto")
		.reply(200, require("../../../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/node/syncing")
		.reply(200, require("../../../test/fixtures/client/syncing.json"))
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require("../../../test/fixtures/client/wallet.json"))
		.get("/api/delegates")
		.reply(200, require("../../../test/fixtures/client/delegates-1.json"))
		.get("/api/delegates?page=2")
		.reply(200, require("../../../test/fixtures/client/delegates-2.json"))
		.persist();

	const profileRepository = new ProfileRepository();

	container.set(Identifiers.HttpClient, new Request());
	container.set(Identifiers.CoinService, new CoinService());
	container.set(Identifiers.Coins, { ARK });
	container.set(Identifiers.ProfileRepository, profileRepository);

	profile = profileRepository.create("John Doe");
	wallet = await profile.wallets().importByMnemonic(identity.mnemonic, "ARK", "ark.devnet");

	subject = new ExchangeRateService();
});

beforeAll(() => nock.disableNetConnect());

it("should sync the exchange rate for ARK to BTC", async () => {
	profile.settings().set(ProfileSetting.MarketProvider, "cryptocompare");

	nock(/.+/)
		.get("/data/dayAvg")
		.query(true)
		.reply(200, { BTC: 0.00005048, ConversionType: { type: "direct", conversionSymbol: "" } })
		.persist();

	await subject.syncAll();

	expect(wallet.data().get(WalletData.ExchangeRate)).toBe(0.00005048);
});

describe("#syncCoinByProfile", () => {
	it("should sync a coin for specific profile with wallets argument", async () => {
		profile.settings().set(ProfileSetting.MarketProvider, "cryptocompare");

		nock(/.+/)
			.get("/data/dayAvg")
			.query(true)
			.reply(200, { BTC: 0.00005048, ConversionType: { type: "direct", conversionSymbol: "" } })
			.persist();

		await subject.syncCoinByProfile(
			profile,
			"DARK",
			profile
				.wallets()
				.values()
				.filter((wallet: ReadWriteWallet) => wallet.currency() === "DARK"),
		);

		expect(wallet.data().get(WalletData.ExchangeRate)).toBe(0.00005048);
	});

	it("should sync a coin for specific profile without wallets argument", async () => {
		const networkSpy = jest.spyOn(wallet.network(), "isLive").mockReturnValue(true);

		profile.settings().set(ProfileSetting.MarketProvider, "cryptocompare");

		nock(/.+/)
			.get("/data/dayAvg")
			.query(true)
			.reply(200, { BTC: 0.00002134, ConversionType: { type: "direct", conversionSymbol: "" } })
			.persist();

		await subject.syncCoinByProfile(profile, "DARK");

		expect(wallet.data().get(WalletData.ExchangeRate)).toBe(0.00002134);

		networkSpy.mockRestore();
	});
});
