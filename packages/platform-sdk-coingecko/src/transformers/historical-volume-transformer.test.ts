import { HistoricalVolumeTransformer } from "./historical-volume-transformer";

const stubResponse = require("../../test/fixtures/historical-volume.json");
const stubOptions = { type: "day", dateFormat: "DD.MM" };

describe("CoinGecko", () => {
	describe("HistoricalVolumeTransformer", () => {
		it("should transform the given data", async () => {
			const subject = new HistoricalVolumeTransformer(stubResponse);

			expect(subject.transform(stubOptions)).toMatchSnapshot();
		});
	});
});
