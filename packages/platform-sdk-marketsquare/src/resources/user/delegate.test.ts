import "jest-extended";

import { Request } from "@arkecosystem/platform-sdk-http-got";
import nock from "nock";

import { Delegate } from "./delegate";

let subject: Delegate;

beforeAll(() => nock.disableNetConnect());

beforeEach(async () => (subject = new Delegate(new Request().baseUrl("https://marketsquare.io/api"))));

afterEach(() => nock.cleanAll());

describe("Delegate", function () {
	it("should list all delegates owned by the given user", async () => {
		nock("https://marketsquare.io/")
			.get("/api/users/1/delegates")
			.reply(200, require(`${__dirname}/../../../test/fixtures/entity-list.json`));

		await expect(subject.all(1)).resolves.toContainAllKeys(["data", "links", "meta"]);
	});
});
