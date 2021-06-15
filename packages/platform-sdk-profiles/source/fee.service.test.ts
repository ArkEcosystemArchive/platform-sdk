import "jest-extended";
import "reflect-metadata";

import nock from "nock";

import { bootContainer } from "../test/mocking";
import { FeeService } from "./fee.service";

let subject: FeeService;
import NodeFeesFixture from "../test/fixtures/client/node-fees.json";
import { Profile } from "./profile";

let profile: Profile;

beforeAll(() => {
	bootContainer();

	nock.disableNetConnect();

	nock(/.+/)
		.get("/api/node/configuration")
		.reply(200, require("../test/fixtures/client/configuration.json"))
		.get("/api/node/configuration/crypto")
		.reply(200, require("../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/node/syncing")
		.reply(200, require("../test/fixtures/client/syncing.json"))
		.get("/api/peers")
		.reply(200, require("../test/fixtures/client/peers.json"))
		.get("/api/node/fees")
		.query(true)
		.reply(200, NodeFeesFixture)
		.get("/api/transactions/fees")
		.query(true)
		.reply(200, require("../test/fixtures/client/transaction-fees.json"))
		.persist();
});

beforeEach(async () => {
	profile = new Profile({ id: "uuid", name: "name", avatar: "avatar", data: "" });
	profile.coins().set("ARK", "ark.devnet");

	subject = new FeeService();
});

describe("FeeService", () => {
	it("should sync fees", async () => {
		expect(() => subject.all("ARK", "ark.devnet")).toThrowError("have not been synchronized yet");

		await subject.sync(profile, "ARK", "ark.devnet");
		expect(Object.keys(subject.all("ARK", "ark.devnet"))).toHaveLength(11);
	});

	it("should sync fees of all coins", async () => {
		expect(() => subject.all("ARK", "ark.devnet")).toThrowError("have not been synchronized yet");

		await subject.syncAll(profile);

		expect(Object.keys(subject.all("ARK", "ark.devnet"))).toHaveLength(11);
	});

	it("#findByType", async () => {
		expect(() => subject.all("ARK", "ark.devnet")).toThrowError("have not been synchronized yet");

		await subject.syncAll(profile);

		const fees = subject.findByType("ARK", "ark.devnet", "transfer");

		expect(fees.min.toString()).toEqual("357000");
		expect(fees.avg.toString()).toEqual("10000000");
		expect(fees.max.toString()).toEqual("10000000");
		expect(fees.static.toString()).toEqual("10000000");
	});
});
