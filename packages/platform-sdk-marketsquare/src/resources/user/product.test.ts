import "jest-extended";

import nock from "nock";
import { Request } from "@arkecosystem/platform-sdk-http-got";

import { Product } from "./product";

let subject: Product;

beforeAll(() => nock.disableNetConnect());

beforeEach(async () => (subject = new Product((new Request).baseUrl('https://marketsquare.io/api'))));

afterEach(() => nock.cleanAll());

describe("Product", function () {
	it("should list all products owned by the given user", async () => {
		nock('https://marketsquare.io/')
			.get("/api/users/1/products")
			.reply(200, require(`${__dirname}/../../../test/fixtures/entity-list.json`));

		await expect(subject.all(1)).resolves.toContainAllKeys(["data", "links", "meta"]);
	});
});
