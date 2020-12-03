import "jest-extended";

import { Request } from "@arkecosystem/platform-sdk-http-got";
import nock from "nock";

import { Auth } from "./auth";

let subject: Auth;

beforeAll(() => nock.disableNetConnect());

beforeEach(async () => (subject = new Auth(new Request().baseUrl("https://marketsquare.io/api"))));

afterEach(() => nock.cleanAll());

describe("Auth", function () {
	it("should log in with the username and password", async () => {
		nock("https://marketsquare.io/")
			.post("/api/login")
			.reply(200, {
				user_id: 1,
				token: 'token',
				expires_at: '2020-01-01 12:00:00',
			});

		await expect(subject.login('username', 'password')).resolves.toEqual({
			user_id: 1,
			token: 'token',
			expires_at: '2020-01-01 12:00:00',
		});
	});
});
