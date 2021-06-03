import { MarketTransformer } from "./market-transformer";

const stubResponse = require("../../../../test/fixtures/coingecko/market.json");
const stubOptions = { type: "day", dateFormat: "DD.MM" };

describe("MarketTransformer", () => {
	it("should transform the given data", async () => {
		const subject = new MarketTransformer(stubResponse.market_data);

		expect(subject.transform(stubOptions)).toMatchSnapshot();
	});

	it("should skip unknown currencies", async () => {
		const subject = new MarketTransformer(stubResponse.market_data);

		expect(subject.transform({ ...stubOptions, currencies: { invalid: {} } })).toMatchSnapshot();
	});
});
