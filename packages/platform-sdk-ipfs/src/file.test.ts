import "jest-extended";

import { Request } from "@arkecosystem/platform-sdk-http-got";
import nock from "nock";

import { File } from "./file";

let subject: File;

beforeAll(() => nock.disableNetConnect());

beforeEach(() => (subject = new File(new Request())));

afterEach(() => nock.cleanAll());

test("#upload", async () => {
	nock("https://platform.ark.io")
		.post("/api/ipfs")
		.reply(200, { data: { hash: "hash" } });

	await expect(subject.upload({ key: "value" })).resolves.toBe("hash");
});

test("#get", async () => {
	nock("https://platform.ark.io")
		.get("/api/ipfs/hash")
		.reply(200, { data: { key: "value" } });

	await expect(subject.get("hash")).resolves.toEqual({ key: "value" });
});
