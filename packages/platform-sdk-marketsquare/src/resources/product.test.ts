import "jest-extended";

import { Request } from "@arkecosystem/platform-sdk-http-got";
import nock from "nock";

import { Product } from "./product";

let subject: Product;

beforeAll(() => nock.disableNetConnect());

beforeEach(async () => (subject = new Product(new Request().baseUrl("https://marketsquare.io/api"))));

afterEach(() => nock.cleanAll());

describe("Product", function () {
	it("should list all products", async () => {
		nock("https://marketsquare.io/")
			.get("/api/products")
			.reply(200, require(`${__dirname}/../../test/fixtures/entity-list.json`));

		await expect(subject.all()).resolves.toContainAllKeys(["data", "links", "meta"]);
	});

	it("should show the product for the given ID", async () => {
		nock("https://marketsquare.io/")
			.get("/api/products/1")
			.reply(200, require(`${__dirname}/../../test/fixtures/entity-show.json`));

		await expect(subject.show(1)).resolves.toContainAllKeys([
			"id",
			"name",
			"display_name",
			"slug",
			"description",
			"excerpt",
			"avatar",
			"is_claimed",
			"is_featured",
			"is_grant",
			"is_hidden",
			"is_indexable",
			"is_official",
			"is_promoted",
			"is_resigned",
			"is_verified",
			"registered_at",
			"created_at",
			"updated_at",
			"identity",
			"aip36",
			"ipfs",
			"npm",
			"manifest",
		]);
	});
});
