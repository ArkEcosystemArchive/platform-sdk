import "jest-extended";

import nock from "nock";

import { createConfig } from "../../test/helpers";
import { KnownWalletService } from "./known-wallets";

let subject: KnownWalletService;

beforeEach(async () => {
	subject = await KnownWalletService.construct(createConfig());
});

describe("KnownWalletService", () => {
	it("should return a list of known wallets if the request succeeds", () => {
		nock()
			.get('')
			.respond(200, [{
				"type": "team",
				"name": "ACF Hot Wallet",
				"address": "AagJoLEnpXYkxYdYkmdDSNMLjjBkLJ6T67"
			},
			{
				"type": "team",
				"name": "ACF Hot Wallet (old)",
				"address": "AWkBFnqvCF4jhqPSdE2HBPJiwaf67tgfGR"
			}])
	});

	it("should fail to return a list of known wallets if the request fails", () => {
		nock()
			.get('')
			.respond(404)
	});
});
