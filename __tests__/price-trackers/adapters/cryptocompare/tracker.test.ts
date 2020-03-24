import { CryptoCompare } from "../../../../src/price-trackers/adapters/cryptocompare/tracker";

let subject: CryptoCompare;

beforeEach(() => (subject = new CryptoCompare()));

describe("CryptoCompare", function () {
	it("should get the daily average", async () => {
		await expect(
			subject.dailyAverage({ token: "ark", currency: "btc", timestamp: Date.now().valueOf() }),
		).resolves.toMatchSnapshot();
	});
});
