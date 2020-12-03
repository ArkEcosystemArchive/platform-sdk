import "jest-extended";

import nock from "nock";
import { Request } from "@arkecosystem/platform-sdk-http-got";

import { Business } from "./business";

let subject: Business;

beforeAll(() => nock.disableNetConnect());

beforeEach(async () => (subject = new Business((new Request).baseUrl('https://marketsquare.io/api'))));

afterEach(() => nock.cleanAll());

describe("Business", function () {
	it("should list all businesses owned by the given user", async () => {
		nock('https://marketsquare.io/')
			.get("/api/users/1/businesses")
			.reply(200, require(`${__dirname}/../../../test/fixtures/entity-list.json`));

		await expect(subject.all(1)).resolves.toContainAllKeys(["data", "links", "meta"]);
	});
});
