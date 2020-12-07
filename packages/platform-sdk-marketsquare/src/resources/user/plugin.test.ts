import "jest-extended";

import { Request } from "@arkecosystem/platform-sdk-http-got";
import nock from "nock";

import { Plugin } from "./plugin";

let subject: Plugin;

beforeAll(() => nock.disableNetConnect());

beforeEach(async () => (subject = new Plugin(new Request().baseUrl("https://marketsquare.io/api"))));

afterEach(() => nock.cleanAll());

describe("Plugin", function () {
	it("should list all plugins owned by the given user", async () => {
		nock("https://marketsquare.io/")
			.get("/api/users/1/plugins")
			.reply(200, require(`${__dirname}/../../../test/fixtures/entity-list.json`));

		await expect(subject.all(1)).resolves.toContainAllKeys(["data", "links", "meta"]);
	});
});
