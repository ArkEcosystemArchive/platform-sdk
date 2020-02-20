import "jest-extended";
import nock from "nock";
import { PriceTrackerService } from "../../src/price-trackers/service";
import { CURRENCIES } from "../../src/price-trackers/config";

const BASE_URL_CRYPTOCOMPARE = "https://min-api.cryptocompare.com";
const BASE_URL_COINGECKO = "https://api.coingecko.com/api/v3";
const BASE_URL_COINCAP = "https://api.coincap.io/v2";

const mockCryptoCompare = () => {
	nock(BASE_URL_CRYPTOCOMPARE)
		.get("/data/pricemultifull")
		.query(true)
		.reply(200, require("./adapters/cryptocompare/__fixtures__/market.json"));

	nock(BASE_URL_CRYPTOCOMPARE)
		.get(/\/data\/histo.+/)
		.reply(200, require("./adapters/cryptocompare/__fixtures__/historical.json"));
};

const mockCoinGecko = () => {
	nock(BASE_URL_COINGECKO)
		.get("/coins/list")
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
		]);

	nock(BASE_URL_COINGECKO)
		.get("/simple/price")
		.query(true)
		.reply(200, {
			ark: {
				btc: 0.0000207,
			},
		});

	nock(BASE_URL_COINGECKO)
		.get("/coins/ark")
		.reply(200, require("./adapters/coingecko/__fixtures__/market.json"));

	nock(BASE_URL_COINGECKO)
		.get("/coins/ark/market_chart")
		.query(true)
		.reply(200, require("./adapters/coingecko/__fixtures__/historical.json"));
};

const mockCoinCap = () => {
	nock(BASE_URL_COINCAP)
		.get("/assets")
		.query(true)
		.reply(200, require("./adapters/coincap/__fixtures__/assets.json"));

	nock(BASE_URL_COINCAP)
		.get("/assets/ark")
		.reply(200, {
			data: {
				id: "ark",
				rank: "97",
				symbol: "ARK",
				name: "Ark",
				supply: "118054742.0000000000000000",
				maxSupply: null,
				marketCapUsd: "25606314.3186528481730628",
				volumeUsd24Hr: "200149.6642060181260072",
				priceUsd: "0.2169020395525734",
				changePercent24Hr: "4.0498226198624989",
				vwap24Hr: "0.2168174454697512",
			},
			timestamp: 1581339180902,
		});

	nock(BASE_URL_COINCAP)
		.get("/rates")
		.reply(200, require("./adapters/coincap/__fixtures__/rates.json"));

	nock(BASE_URL_COINCAP)
		.get("/assets/ark/history")
		.query(true)
		.reply(200, require("./adapters/coincap/__fixtures__/historical.json"));
};

let subject: PriceTrackerService;

describe("PriceTrackerService", () => {
	const token = "ARK";
	const currency = "USD";

	describe.each(["cryptocompare", "coingecko", "coincap"])("%s", adapter => {
		beforeEach(() => {
			subject = PriceTrackerService.make(adapter.toLowerCase());

			if (adapter === "cryptocompare") {
				mockCryptoCompare();
			} else if (adapter === "coingecko") {
				mockCoinGecko();
			} else if (adapter === "coincap") {
				mockCoinCap();
			}
		});

		it("should return ticker values", async () => {
			const response = await subject.getMarketData(token);
			const entries = Object.keys(response);
			expect(entries).not.toBeEmpty();
			expect(entries).toIncludeAllMembers(Object.keys(CURRENCIES));

			if (adapter === "cryptocompare") {
				expect(response.USD.price).toBe(0.178045896);
			} else if (adapter === "coingecko") {
				expect(response.USD.price).toBe(0.176829);
			} else {
				expect(response.USD.price).toBe(0.2169020395525734);
			}
		});

		describe("verifyToken", () => {
			it("should return true if found", async () => {
				if (adapter === "cryptocompare") {
					nock(BASE_URL_CRYPTOCOMPARE)
						.get("/data/price")
						.query(true)
						.reply(200, {
							BTC: 0.00002073,
						});
				}

				expect(await subject.verifyToken("ark")).toBe(true);
			});

			it("should return false if not found", async () => {
				if (adapter === "cryptocompare") {
					nock(BASE_URL_CRYPTOCOMPARE)
						.get("/data/price")
						.query(true)
						.reply(200, {
							Response: "Error",
						});
				}

				expect(await subject.verifyToken("not-ark")).toBe(false);
			});
		});

		it("should return historic day values", async () => {
			const response = await subject.getHistoricalDataForDay(token, currency);
			expect(response).toBeObject();
			expect(response).toContainKeys(["labels", "datasets"]);
		});

		it("should return historic week values", async () => {
			const response = await subject.getHistoricalDataForWeek(token, currency);
			expect(response).toBeObject();
			expect(response).toContainKeys(["labels", "datasets"]);
		});

		it("should return historic month values", async () => {
			const response = await subject.getHistoricalDataForMonth(token, currency);
			expect(response).toBeObject();
			expect(response).toContainKeys(["labels", "datasets"]);
		});

		it("should return historic quarter values", async () => {
			const response = await subject.getHistoricalDataForQuarter(token, currency);
			expect(response).toBeObject();
			expect(response).toContainKeys(["labels", "datasets"]);
		});

		it("should return historic year values", async () => {
			const response = await subject.getHistoricalDataForYear(token, currency);
			expect(response).toBeObject();
			expect(response).toContainKeys(["labels", "datasets"]);
		});
	});
});
