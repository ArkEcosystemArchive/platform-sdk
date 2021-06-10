import "jest-extended";

import { Request } from "@arkecosystem/platform-sdk-http-got";

import { PriceTracker } from "../test/stubs/tracker";
import { MarketService } from "./index";

let subject: MarketService;

const createSpyAdapter = (method) => {
	const adapter = new PriceTracker();
	const spy = jest.spyOn(adapter, method);

	subject.setAdapter(adapter);

	return spy;
};

describe("MarketService", () => {
	const token = "ARK";
	const currency = "USD";

	describe.each(["cryptocompare", "coingecko", "coincap"])("%s", (adapter) => {
		beforeEach(() => (subject = MarketService.make(adapter, new Request())));

		it("should call #verifyToken on the adapter instance", async () => {
			const spy = createSpyAdapter("verifyToken");

			await subject.verifyToken("ark");

			expect(spy).toHaveBeenCalledWith("ark");
		});

		it("should call #marketData on the adapter instance", async () => {
			const spy = createSpyAdapter("marketData");

			await subject.marketData(token);

			expect(spy).toHaveBeenCalledWith("ARK");
		});

		it("should call #historicalPrice for day values on the adapter instance", async () => {
			const spy = createSpyAdapter("historicalPrice");

			await subject.historicalPriceForDay(token, currency);

			expect(spy).toHaveBeenCalledWith({
				currency: "USD",
				dateFormat: "HH:mm",
				days: 24,
				token: "ARK",
				type: "hour",
			});
		});

		it("should call #historicalPrice for week values on the adapter instance", async () => {
			const spy = createSpyAdapter("historicalPrice");

			await subject.historicalPriceForWeek(token, currency);

			expect(spy).toHaveBeenCalledWith({
				currency: "USD",
				dateFormat: "ddd",
				days: 7,
				token: "ARK",
				type: "day",
			});
		});

		it("should call #historicalPrice for month values on the adapter instance", async () => {
			const spy = createSpyAdapter("historicalPrice");

			await subject.historicalPriceForMonth(token, currency);

			expect(spy).toHaveBeenCalledWith({
				currency: "USD",
				dateFormat: "DD",
				days: 30,
				token: "ARK",
				type: "day",
			});
		});

		it("should call #historicalPrice for quarter values on the adapter instance", async () => {
			const spy = createSpyAdapter("historicalPrice");

			await subject.historicalPriceForQuarter(token, currency);

			expect(spy).toHaveBeenCalledWith({
				currency: "USD",
				dateFormat: "DD.MM",
				days: 120,
				token: "ARK",
				type: "day",
			});
		});

		it("should call #historicalPrice for year values on the adapter instance", async () => {
			const spy = createSpyAdapter("historicalPrice");

			await subject.historicalPriceForYear(token, currency);

			expect(spy).toHaveBeenCalledWith({
				currency: "USD",
				dateFormat: "DD.MM",
				days: 365,
				token: "ARK",
				type: "day",
			});
		});

		it("should call #historicalVolume for day values on the adapter instance", async () => {
			const spy = createSpyAdapter("historicalVolume");

			await subject.historicalVolumeForDay(token, currency);

			expect(spy).toHaveBeenCalledWith({
				currency: "USD",
				dateFormat: "HH:mm",
				days: 24,
				token: "ARK",
				type: "hour",
			});
		});

		it("should call #historicalVolume for week values on the adapter instance", async () => {
			const spy = createSpyAdapter("historicalVolume");

			await subject.historicalVolumeForWeek(token, currency);

			expect(spy).toHaveBeenCalledWith({
				currency: "USD",
				dateFormat: "ddd",
				days: 7,
				token: "ARK",
				type: "day",
			});
		});

		it("should call #historicalVolume for month values on the adapter instance", async () => {
			const spy = createSpyAdapter("historicalVolume");

			await subject.historicalVolumeForMonth(token, currency);

			expect(spy).toHaveBeenCalledWith({
				currency: "USD",
				dateFormat: "DD",
				days: 30,
				token: "ARK",
				type: "day",
			});
		});

		it("should call #historicalVolume for quarter values on the adapter instance", async () => {
			const spy = createSpyAdapter("historicalVolume");

			await subject.historicalVolumeForQuarter(token, currency);

			expect(spy).toHaveBeenCalledWith({
				currency: "USD",
				dateFormat: "DD.MM",
				days: 120,
				token: "ARK",
				type: "day",
			});
		});

		it("should call #historicalVolume for year values on the adapter instance", async () => {
			const spy = createSpyAdapter("historicalVolume");

			await subject.historicalVolumeForYear(token, currency);

			expect(spy).toHaveBeenCalledWith({
				currency: "USD",
				dateFormat: "DD.MM",
				days: 365,
				token: "ARK",
				type: "day",
			});
		});

		it("should call #dailyAverage on the adapter instance", async () => {
			const spy = createSpyAdapter("dailyAverage");

			const timestamp = Date.now();

			await subject.dailyAverage(token, currency, timestamp);

			expect(spy).toHaveBeenCalledWith({ currency: "USD", timestamp: timestamp, token: "ARK" });
		});
	});
});
