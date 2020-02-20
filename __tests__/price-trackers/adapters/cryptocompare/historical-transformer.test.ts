import { HistoricalTransformer } from "../../../../src/price-trackers/adapters/cryptocompare/historical-transformer";

const stubResponse = require("./__fixtures__/historical.json");
const stubOptions = { type: "day", dateFormat: "DD.MM" };

describe("CryptoCompare", function() {
	describe("HistoricalTransformer", function() {
		it("should transform the given data", async () => {
			const subject = new HistoricalTransformer(stubResponse.Data);

			expect(subject.transform(stubOptions)).toMatchSnapshot();
		});
	});
});
