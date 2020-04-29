import { MarketTransformer } from "../../src/transformers/market-transformer";

const stubResponse = require("../__fixtures__/market.json");
const stubOptions = { type: "day", dateFormat: "DD.MM", token: "ARK" };

describe("CoinCap", function () {
	describe("MarketTransformer", function () {
		it("should transform the given data", async () => {
			const subject = new MarketTransformer(stubResponse);

			expect(subject.transform(stubOptions)).toMatchSnapshot();
		});
	});
});
