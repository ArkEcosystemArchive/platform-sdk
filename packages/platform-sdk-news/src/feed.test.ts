import "jest-extended";

import { readFileSync } from "fs-extra";
import nock from "nock";
import { resolve } from "path";

import { FeedService } from "./feed";

const fixture = readFileSync(resolve(__dirname, "../test/fixtures/feed.xml")).toString();

let subject: FeedService;

beforeEach(() => (subject = new FeedService()));

describe("FeedService", () => {
	describe("#parse", () => {
		it("should retrieve the feed and parse it", async () => {
			nock("https://blog.ark.io/").get("/feed").reply(200, fixture);

			await expect(subject.parse("https://blog.ark.io/feed")).resolves.toBeObject();
		});

		it("should throw an error when the request or parsing fails", async () => {
			nock("https://blog.ark.io/").get("/feed").reply(200, "malformed");

			await expect(subject.parse("https://blog.ark.io/feed")).rejects.toThrowError();
		});
	});

	describe("#items", () => {
		it("should retrieve the items of the feed", async () => {
			nock("https://blog.ark.io/").get("/feed").reply(200, fixture);

			await expect(subject.items("https://blog.ark.io/feed")).resolves.toBeArray();
		});

		it("should throw an error when the request or parsing fails", async () => {
			nock("https://blog.ark.io/").get("/feed").reply(200, "malformed");

			await expect(subject.items("https://blog.ark.io/feed")).rejects.toThrowError();
		});
	});
});
