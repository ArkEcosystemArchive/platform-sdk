import "jest-extended";

import { Data } from "@arkecosystem/platform-sdk";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import nock from "nock";

import { CoinCap } from "./index";

const BASE_URL_COINCAP = "https://api.coincap.io/v2";
const token = "ARK";
const currency = "USD";

let subject: CoinCap;

beforeEach(() => {
	subject = new CoinCap(new Request());

	nock(BASE_URL_COINCAP).get("/assets").query(true).reply(200, require("../../../test/fixtures/coincap/assets.json"));

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

	nock(BASE_URL_COINCAP).get("/rates").reply(200, require("../../../test/fixtures/coincap/rates.json"));

	nock(BASE_URL_COINCAP)
		.get("/assets/ark/history")
		.query(true)
		.reply(200, require("../../../test/fixtures/coincap/historical.json"));

	nock(BASE_URL_COINCAP)
		.get("/assets/ark/history")
		.query((queryObject: any) => queryObject.interval === "h1")
		.reply(200, require("../../../test/fixtures/coincap/daily-average.json"));
});

describe("CoinCap", () => {
	it("should return ticker values", async () => {
		const response = await subject.marketData(token);
		const entries = Object.keys(response);
		expect(entries).not.toBeEmpty();
		expect(entries).toIncludeAllMembers(Object.keys(Data.CURRENCIES));

		expect(response.USD.price).toBe(0.2169020395525734);
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

	it("should return daily average", async () => {
		const response = await subject.dailyAverage({
			token,
			currency,
			timestamp: Date.now(),
		});
		expect(response).toBe(0.38803514004956435);
	});
});
