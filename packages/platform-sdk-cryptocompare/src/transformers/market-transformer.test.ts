import { MarketTransformer } from "./market-transformer";

const stubResponse = require("../../test/fixtures/market.json");
const stubOptions = { type: "day", dateFormat: "DD.MM", token: "ARK" };

describe("CryptoCompare", function () {
	describe("MarketTransformer", function () {
		it("should transform the given data", async () => {
			const subject = new MarketTransformer(stubResponse.RAW.ARK);

			expect(subject.transform(stubOptions)).toMatchSnapshot();
		});
	});
});
