import "jest-extended";

import { Request } from "@arkecosystem/platform-sdk-http-got";
import nock from "nock";

import { PluginRegistry } from "./plugin-registry";

let subject: PluginRegistry;

beforeAll(() => nock.disableNetConnect());

beforeEach(() => (subject = new PluginRegistry(new Request())));

afterEach(() => nock.cleanAll());

describe("PluginRegistry", () => {
	describe("#all", () => {
		it("should list all plugins", async () => {
			nock("https://marketsquare.io")
				.get("/api/plugins")
				.query(true)
				.reply(200, require("../../test/fixtures/plugins/index.json"));

			const result = await subject.all();

			expect(result).toBeObject();
			expect(result.data).toBeArray();
			expect(result.meta).toBeObject();
		});
	});

	describe("#findById", () => {
		it("should list all plugins", async () => {
			nock("https://marketsquare.io")
				.get("/api/plugins/486")
				.query(true)
				.reply(200, require("../../test/fixtures/plugins/show.json"));

			await expect(subject.findById(486)).resolves.toBeObject();
		});
	});
});
