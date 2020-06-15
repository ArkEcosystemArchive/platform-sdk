import "jest-extended";
import { Data } from "@arkecosystem/platform-sdk";
import nock from "nock";

import { PriceTracker } from "../src";
import { HttpClient } from "./__stubs__/client";

const BASE_URL_CRYPTOCOMPARE = "https://min-api.cryptocompare.com";
const token = "ARK";
const currency = "USD";

let subject: PriceTracker;

beforeEach(() => {
	subject = new PriceTracker(new HttpClient());

	nock(BASE_URL_CRYPTOCOMPARE)
		.get("/data/pricemultifull")
		.query(true)
		.reply(200, require("./__fixtures__/market.json"));

	nock(BASE_URL_CRYPTOCOMPARE)
		.get(/\/data\/histo.+/)
		.reply(200, require("./__fixtures__/historical.json"));
});

describe("PriceTracker", () => {
	it("should return ticker values", async () => {
		const response = await subject.marketData(token);
		const entries = Object.keys(response);
		expect(entries).not.toBeEmpty();
		expect(entries).toIncludeAllMembers(Object.keys(Data.CURRENCIES));
		expect(response.USD.price).toBe(0.178045896);
	});

	describe("verifyToken", () => {
		it("should return true if found", async () => {
			nock(BASE_URL_CRYPTOCOMPARE).get("/data/price").query(true).reply(200, {
				BTC: 0.00002073,
			});

			expect(await subject.verifyToken("ark")).toBe(true);
		});

		it("should return false if not found", async () => {
			nock(BASE_URL_CRYPTOCOMPARE).get("/data/price").query(true).reply(200, {
				Response: "Error",
			});

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
