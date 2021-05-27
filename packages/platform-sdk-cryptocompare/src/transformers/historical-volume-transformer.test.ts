import { HistoricalVolumeTransformer } from "./historical-volume-transformer";

const stubResponse = require("../../test/fixtures/historical.json");
const stubOptions = { type: "day", dateFormat: "DD.MM" };

describe("CryptoCompare", () => {
	describe("HistoricalVolumeTransformer", () => {
		it("should transform the given data", async () => {
			const subject = new HistoricalVolumeTransformer(stubResponse.Data);

			expect(subject.transform(stubOptions)).toMatchSnapshot();
		});
	});
});
