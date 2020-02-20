import { HistoricalPriceTransformer } from "../../../../../src/price-trackers/adapters/coingecko/transformers/historical-price-transformer";

const stubResponse = require("../__fixtures__/historical.json");
const stubOptions = { type: "day", dateFormat: "DD.MM" };

describe("CoinGecko", function() {
	describe("HistoricalPriceTransformer", function() {
		it("should transform the given data", async () => {
			const subject = new HistoricalPriceTransformer(stubResponse);

			expect(subject.transform(stubOptions)).toMatchSnapshot();
		});
	});
});
