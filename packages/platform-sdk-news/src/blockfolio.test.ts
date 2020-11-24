import "jest-extended";

import { Request } from "@arkecosystem/platform-sdk-http-got";
import nock from "nock";

import { Blockfolio } from "./blockfolio";

let subject: Blockfolio;

beforeAll(() => nock.disableNetConnect());

beforeEach(() => (subject = new Blockfolio(new Request())));

afterEach(() => nock.cleanAll());

describe("Blockfolio", () => {
	describe("#findByCoin", () => {
		it("should retrieve the feed and findByCoin it", async () => {
			nock("https://platform.ark.io")
				.get("/api/coins/signals")
				.query(true)
				.reply(200, require("../test/fixtures/blockfolio.json"));

			const result = await subject.findByCoin({ coins: ["ARK"] });

			expect(result).toBeObject();
			expect(result.data).toBeArray();
			expect(result.meta).toBeObject();
		});
	});
});
