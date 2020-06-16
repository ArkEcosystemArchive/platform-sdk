import "jest-extended";
import { Data } from "@arkecosystem/platform-sdk";
import nock from "nock";

import { PriceTracker } from "../src";
import { HttpClient } from "./__stubs__/client";

const BASE_URL_COINGECKO = "https://api.coingecko.com/api/v3";
const token = "ARK";
const currency = "USD";

let subject: PriceTracker;

beforeEach(() => {
	subject = new PriceTracker(new HttpClient());

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

	nock(BASE_URL_COINGECKO).get("/coins/ark").reply(200, require("./__fixtures__/market.json"));

	nock(BASE_URL_COINGECKO)
		.get("/coins/ark/market_chart")
		.query(true)
		.reply(200, require("./__fixtures__/historical.json"));
});

describe("PriceTracker", () => {
	it("should return ticker values", async () => {
		const response = await subject.marketData(token);
		const entries = Object.keys(response);
		expect(entries).not.toBeEmpty();
		expect(entries).toIncludeAllMembers(Object.keys(Data.CURRENCIES));
		expect(response.USD.price).toBe(0.176829);
	});

	describe("verifyToken", () => {
		it("should return true if found", async () => {
			expect(await subject.verifyToken("ark")).toBe(true);
		});

		it("should return false if not found", async () => {
			expect(await subject.verifyToken("not-ark")).toBe(false);
		});
	});

	it("should return historic day values", async () => {
		const response = await subject.historicalPrice({
			token,
			currency,
			days: 24,
			type: "hour",
			dateFormat: "HH:mm",
		});
		expect(response).toBeObject();
		expect(response).toContainKeys(["labels", "datasets"]);
	});
});
