import { MarketTransformer } from "./market-transformer";

const stubResponse = require("../../test/fixtures/market.json");
const stubOptions = { type: "day", dateFormat: "DD.MM" };

describe("CoinGecko", function () {
	describe("MarketTransformer", function () {
		it("should transform the given data", async () => {
			const subject = new MarketTransformer(stubResponse.market_data);

			expect(subject.transform(stubOptions)).toMatchSnapshot();
		});
	});
});
