import "jest-extended";

import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import nock from "nock";

import { container } from "../environment/container";
import { Identifiers } from "../environment/container.models";
import { CoinRepository } from "./coin-repository";

let subject: CoinRepository;

beforeAll(() => {
	nock.disableNetConnect();

	nock(/.+/)
		.get("/api/node/configuration")
		.reply(200, require("../../test/fixtures/client/configuration.json"))
		.get("/api/node/configuration/crypto")
		.reply(200, require("../../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/node/syncing")
		.reply(200, require("../../test/fixtures/client/syncing.json"))
		.get("/api/peers")
		.reply(200, require("../../test/fixtures/client/peers.json"))
		.get("/api/delegates?page=1")
		.reply(200, require("../../test/fixtures/client/delegates-1.json"))
		.get("/api/delegates?page=2")
		.reply(200, require("../../test/fixtures/client/delegates-2.json"))
		.persist();

	container.set(Identifiers.HttpClient, new Request());
	container.set(Identifiers.Coins, { ARK });
});

beforeEach(() => (subject = new CoinRepository()));

it("should sync the delegates", async () => {
	expect(() => subject.delegates("ARK", "devnet")).toThrowError("have not been synchronized yet");

	await subject.syncDelegates("ARK", "devnet");

	expect(subject.delegates("ARK", "devnet")).toBeArray();
	expect(subject.delegates("ARK", "devnet")).toHaveLength(200);
});
