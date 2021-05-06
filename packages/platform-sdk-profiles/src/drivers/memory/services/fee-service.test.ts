import "jest-extended";
import "reflect-metadata";

import { Coins } from "@arkecosystem/platform-sdk";
import nock from "nock";

import { bootContainer } from "../../../../test/helpers";
import { FeeService } from "./fee-service";

let subject: FeeService;
import NodeFeesFixture from "../../../../test/fixtures/client/node-fees.json";
import { Profile } from "../profiles/profile";

let profile: Profile;
let coin: Coins.Coin;

beforeAll(() => {
	bootContainer();

	nock.disableNetConnect();

	nock(/.+/)
		.get("/api/node/configuration")
		.reply(200, require("../../../../test/fixtures/client/configuration.json"))
		.get("/api/node/configuration/crypto")
		.reply(200, require("../../../../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/node/syncing")
		.reply(200, require("../../../../test/fixtures/client/syncing.json"))
		.get("/api/peers")
		.reply(200, require("../../../../test/fixtures/client/peers.json"))
		.get("/api/node/fees")
		.query(true)
		.reply(200, NodeFeesFixture)
		.get("/api/transactions/fees")
		.query(true)
		.reply(200, require("../../../../test/fixtures/client/transaction-fees.json"))
		.persist();
});

beforeEach(async () => {
	profile = new Profile({ id: "uuid", name: "name", avatar: "avatar", data: "" });
	coin = profile.coinFactory().make("ARK", "ark.devnet");
	await coin.__construct();
	profile.coins().set(coin);

	subject = new FeeService();
});

describe("FeeService", () => {
	it("should sync fees", async () => {
		expect(() => subject.all(coin)).toThrowError("have not been synchronized yet");

		await subject.sync(coin);

		expect(Object.keys(subject.all(coin))).toHaveLength(11);
	});

	it("should sync fees of all coins", async () => {
		expect(() => subject.all(coin)).toThrowError("have not been synchronized yet");

		await subject.syncAll(profile);

		expect(Object.keys(subject.all(coin))).toHaveLength(11);
	});

	test("#findByType", async () => {
		expect(() => subject.all(coin)).toThrowError("have not been synchronized yet");

		await subject.syncAll(profile);

		expect(subject.findByType(coin, "transfer")).toEqual({
			avg: "71538139",
			max: "663000000",
			min: "357000",
			static: "10000000",
		});
	});
});
