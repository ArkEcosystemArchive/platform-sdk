import "jest-extended";

import { Request } from "@arkecosystem/platform-sdk-http-got";
import nock from "nock";

import { Wallet } from "./wallet";

let subject: Wallet;

beforeAll(() => nock.disableNetConnect());

beforeEach(async () => (subject = new Wallet(new Request().baseUrl("https://marketsquare.io/api"))));

afterEach(() => nock.cleanAll());

describe("Wallet", function () {
	it("should get the desktop wallet settings", async () => {
		nock("https://marketsquare.io/").get("/api/wallets/desktop/sync").reply(200, { key: "value" });

		await expect(subject.show("desktop")).resolves.toEqual({ key: "value" });
	});

	it("should update the desktop wallet settings", async () => {
		nock("https://marketsquare.io/").put("/api/wallets/desktop/sync").reply(204, "{}");

		await expect(subject.update("desktop", { key: "value" })).resolves.toBeUndefined();
	});
});
