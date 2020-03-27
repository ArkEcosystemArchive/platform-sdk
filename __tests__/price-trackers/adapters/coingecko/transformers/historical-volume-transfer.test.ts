import { HistoricalVolumeTransformer } from "../../../../../src/price-trackers/adapters/coingecko/transformers/historical-volume-transformer";

const stubResponse = require("../__fixtures__/historical-volume.json");
const stubOptions = { type: "day", dateFormat: "DD.MM" };

describe("CoinGecko", function () {
	describe("HistoricalVolumeTransformer", function () {
		it("should transform the given data", async () => {
			const subject = new HistoricalVolumeTransformer(stubResponse);

			expect(subject.transform(stubOptions)).toMatchSnapshot();
		});
	});
});
