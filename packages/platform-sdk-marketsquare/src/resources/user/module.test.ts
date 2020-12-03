import "jest-extended";

import { Request } from "@arkecosystem/platform-sdk-http-got";
import nock from "nock";

import { Module } from "./module";

let subject: Module;

beforeAll(() => nock.disableNetConnect());

beforeEach(async () => (subject = new Module(new Request().baseUrl("https://marketsquare.io/api"))));

afterEach(() => nock.cleanAll());

describe("Module", function () {
	it("should list all modules owned by the given user", async () => {
		nock("https://marketsquare.io/")
			.get("/api/users/1/modules")
			.reply(200, require(`${__dirname}/../../../test/fixtures/entity-list.json`));

		await expect(subject.all(1)).resolves.toContainAllKeys(["data", "links", "meta"]);
	});
});
