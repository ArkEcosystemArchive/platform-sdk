import "jest-extended";

import { Request } from "@arkecosystem/platform-sdk-http-got";
import nock from "nock";

import { AIP36 } from "./aip36";

let subject: AIP36;

beforeAll(() => nock.disableNetConnect());

beforeEach(async () => (subject = new AIP36(new Request().baseUrl("https://marketsquare.io/api"))));

afterEach(() => nock.cleanAll());

describe("AIP36", function () {
	it("should validate the data and return it", async () => {
		nock("https://marketsquare.io/")
			.post("/api/aip36/validate")
			.reply(200, { key: 'value' });

		await expect(subject.validate({ key: 'value' })).resolves.toEqual({ key: 'value' });
	});
});
