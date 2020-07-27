import "jest-extended";

import { Request } from "@arkecosystem/platform-sdk-http-got";
import nock from "nock";

import { Registry } from "./registry";

let subject: Registry;

beforeAll(() => nock.disableNetConnect());

beforeEach(() => (subject = new Registry(new Request())));

afterEach(() => nock.cleanAll());

describe("Registry", () => {
	describe("#all", () => {
		it("should list all plugins", async () => {
			nock("https://marketsquare.io")
				.get("/api/plugins")
				.query(true)
				.reply(200, require("../test/fixtures/plugins.json"));

			const result = await subject.all();

			expect(result).toBeObject();
			expect(result.data).toBeArray();
			expect(result.meta).toBeObject();
		});
	});
});
