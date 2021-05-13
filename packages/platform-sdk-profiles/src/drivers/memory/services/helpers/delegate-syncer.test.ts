import "jest-extended";
import "reflect-metadata";

import nock from "nock";

import { bootContainer, makeCoin } from "../../../../../test/helpers";
import { IDelegateSyncer, ParallelDelegateSyncer, SerialDelegateSyncer } from "./delegate-syncer";

let coin;

beforeAll(() => {
	bootContainer();

	nock.disableNetConnect();
});

beforeEach(async () => {
	nock.cleanAll();
	nock(/.+/)
		.get("/api/node/configuration")
		.reply(200, require("../../../../../test/fixtures/client/configuration.json"))
		.get("/api/node/configuration/crypto")
		.reply(200, require("../../../../../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/node/syncing")
		.reply(200, require("../../../../../test/fixtures/client/syncing.json"))
		.get("/api/peers")
		.reply(200, require("../../../../../test/fixtures/client/peers.json"))
		.get("/api/delegates")
		.reply(200, require("../../../../../test/fixtures/client/delegates-1.json"))
		.get("/api/delegates?page=2")
		.reply(200, require("../../../../../test/fixtures/client/delegates-2.json"));

	coin = await makeCoin("ARK", "ark.devnet");
});

describe.each(["serial", "parallel"])("IDelegateSyncer %s", (type) => {
	let subject: IDelegateSyncer;

	beforeEach(async () => {
		const clientService = coin.client();

		subject =
			type === "serial" ? new SerialDelegateSyncer(clientService) : new ParallelDelegateSyncer(clientService);
	});

	it("should sync", async () => {
		expect(await subject.sync()).toHaveLength(200);
	});

	it("should sync single page", async () => {
		nock.cleanAll();
		nock(/.+/)
			.get("/api/delegates")
			.reply(200, require("../../../../../test/fixtures/client/delegates-single-page.json"))
			.persist();

		expect(await subject.sync()).toHaveLength(10);
	});
});
