import "jest-extended";

import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
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

let liveSpy: jest.SpyInstance;
let testSpy: jest.SpyInstance;

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
		// coingecho
		.get("/api/v3/coins/dark/history")
		.query(true)
		.reply(200, {
			id: "ark",
			symbol: "ark",
			name: "Ark",
			market_data: {
				current_price: {
					btc: 0.0006590832396635801,
				},
				market_cap: {
					btc: 64577.8220851173,
				},
				total_volume: {
					btc: 3054.8117101964535,
				},
			},
		})
		// coingecho
		.get("/api/v3/coins/list")
		.query(true)
		.reply(200, [
			{
				id: "ark",
				symbol: "ark",
				name: "ark",
			},
			{
				id: "dark",
				symbol: "dark",
				name: "dark",
			},
		])
		.persist();

	const profileRepository = new ProfileRepository();

	container.set(Identifiers.HttpClient, new Request());
	container.set(Identifiers.CoinService, new CoinService());
	container.set(Identifiers.Coins, { ARK });
	container.set(Identifiers.ProfileRepository, profileRepository);
	container.set(Identifiers.ExchangeRateService, new ExchangeRateService());

	profile = profileRepository.create("John Doe");
	wallet = await profile.wallets().importByMnemonic(identity.mnemonic, "ARK", "ark.devnet");

	liveSpy = jest.spyOn(wallet.network(), "isLive").mockReturnValue(true);
	testSpy = jest.spyOn(wallet.network(), "isTest").mockReturnValue(false);

	subject = container.get(Identifiers.ExchangeRateService);
});

afterEach(() => {
	liveSpy.mockRestore();
	testSpy.mockRestore();
});

beforeAll(() => nock.disableNetConnect());

describe("ExchangeRateService", () => {
	it("should sync the exchange rate for ARK to BTC", async () => {
		// cryptocompare
		nock(/.+/)
			.get("/data/dayAvg")
			.query(true)
			.reply(200, { BTC: 0.00005048, ConversionType: { type: "direct", conversionSymbol: "" } })
			.persist();

		profile.settings().set(ProfileSetting.MarketProvider, "cryptocompare");
		await subject.syncAll();
		expect(wallet.exchangeRate().toNumber()).toBe(0.00005048);
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

			expect(wallet.exchangeRate().toNumber()).toBe(0.00005048);
		});

		it("should sync a coin using coingecho as default market provider", async () => {
			profile.settings().set(ProfileSetting.MarketProvider, false);

			await subject.syncCoinByProfile(
				profile,
				"DARK",
				profile
					.wallets()
					.values()
					.filter((wallet: ReadWriteWallet) => wallet.currency() === "DARK"),
			);

			expect(wallet.exchangeRate().toNumber()).toBe(0.0006590832396635801);
			profile.settings().set(ProfileSetting.MarketProvider, "cryptocompare");
		});

		it("should sync a coin using btc as default exchange currency", async () => {
			profile.settings().set(ProfileSetting.ExchangeCurrency, false);

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

			expect(wallet.exchangeRate().toNumber()).toBe(0.00005048);
			profile.settings().set(ProfileSetting.ExchangeCurrency, "BTC");
		});

		it("should sync a coin for specific profile without wallets argument", async () => {
			profile.settings().set(ProfileSetting.MarketProvider, "cryptocompare");

			nock(/.+/)
				.get("/data/dayAvg")
				.query(true)
				.reply(200, { BTC: 0.00002134, ConversionType: { type: "direct", conversionSymbol: "" } })
				.persist();

			await subject.syncCoinByProfile(profile, "DARK");

			expect(wallet.exchangeRate().toNumber()).toBe(0.00002134);
		});

		it("should fail to sync a coin for a specific profile if there are no wallets", async () => {
			profile.wallets().flush();

			expect(wallet.data().get(WalletData.ExchangeCurrency)).toBeUndefined();
			expect(wallet.data().get(WalletData.ExchangeRate)).toBeUndefined();

			await subject.syncCoinByProfile(profile, "DARK");

			expect(wallet.data().get(WalletData.ExchangeCurrency)).toBeUndefined();
			expect(wallet.data().get(WalletData.ExchangeRate)).toBeUndefined();
		});

		it("should store exchange rates and currency in profile wallets if undefined", async () => {
			const exchangeService = new ExchangeRateService({ ttl: 5 });

			// cryptocompare
			nock(/.+/)
				.get("/data/dayAvg")
				.query(true)
				.reply(200, { BTC: 0.00005048, ConversionType: { type: "direct", conversionSymbol: "" } })
				.persist();

			profile.settings().set(ProfileSetting.MarketProvider, "cryptocompare");
			const date = DateTime.make().format("YYYY-MM-DD");

			expect(wallet.data().get(WalletData.ExchangeRates)).toBeUndefined();

			await exchangeService.syncAll();
			expect(exchangeService.rates().all()).toEqual({ "DARK-BTC": { [date]: 0.00005048 } });
		});

		it("should cache historic exchange rates", async () => {
			const exchangeService = new ExchangeRateService({ ttl: 5 });

			// cryptocompare
			nock(/.+/)
				.get("/data/dayAvg")
				.query(true)
				.reply(200, { BTC: 0.00005048, ConversionType: { type: "direct", conversionSymbol: "" } })
				.persist();

			profile.settings().set(ProfileSetting.MarketProvider, "cryptocompare");
			const date = DateTime.make().format("YYYY-MM-DD");

			expect(wallet.data().get(WalletData.ExchangeRates)).toBeUndefined();

			await exchangeService.syncAll();
			expect(exchangeService.rates().all()).toEqual({ "DARK-BTC": { [date]: 0.00005048 } });

			nock(/.+/)
				.get("/data/dayAvg")
				.query(true)
				.reply(200, { BTC: 0.00005555, ConversionType: { type: "direct", conversionSymbol: "" } })
				.persist();

			await exchangeService.syncAll();
			// The price should be the cached price from previous sync: 0.00005048
			expect(exchangeService.rates().all()).toEqual({ "DARK-BTC": { [date]: 0.00005048 } });
		});
	});
});
