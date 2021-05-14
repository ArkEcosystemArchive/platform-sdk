import "jest-extended";
import "reflect-metadata";
import { mock } from "jest-mock-extended";

import { Coins } from "@arkecosystem/platform-sdk";
import nock from "nock";

import { bootContainer } from "../../../../../test/helpers";
import NodeFeesFixture from "../../../../../test/fixtures/client/node-fees.json";
import { Profile } from "../profile";
import { ICoinService, IDataRepository } from "../../../../contracts";
import { CoinService } from "./coin-service";

let subject: ICoinService;

beforeAll(() => {
	bootContainer();

	nock.disableNetConnect();

	nock(/.+/)
		.get("/api/node/configuration")
		.reply(200, require("../../../../../test/fixtures/client/configuration.json"))
		.get("/api/node/configuration/crypto")
		.reply(200, require("../../../../../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/node/syncing")
		.reply(200, require("../../../../../test/fixtures/client/syncing.json"))
		.get("/api/peers")
		.reply(200, require("../../../../../test/fixtures/client/peers.json"))
		.get("/api/node/fees")
		.query(true)
		.reply(200, NodeFeesFixture)
		.get("/api/transactions/fees")
		.query(true)
		.reply(200, require("../../../../../test/fixtures/client/transaction-fees.json"))
		.persist();
});

beforeEach(async () => {
	const profile = new Profile({ id: "uuid", name: "name", avatar: "avatar", data: "" });

	subject = new CoinService(profile.data());
});

describe("CoinService", () => {
	it("#push", () => {
		subject.set("ARK", "ark.devnet");
		const coin = subject.get("ARK", "ark.devnet");
		expect(coin.network().id()).toEqual("ark.devnet");
	});

	it("#has", async () => {
		subject.set("ARK", "ark.devnet");

		expect(subject.has("ARK", "ark.devnet")).toBeTrue();
		expect(subject.has("UNKNOWN", "ark.devnet")).toBeFalse();
	});

	it("#get", async () => {
		subject.set("ARK", "ark.devnet");

		expect(subject.get("ARK", "ark.devnet").network().id()).toEqual("ark.devnet");
		expect(() => subject.get("ARK", "unknown")).toThrow(/does not exist/);
	});

	it("#values", async () => {
		subject.set("ARK", "ark.devnet");

		const values = subject.values();
		expect(values).toEqual([{ ark: { devnet: expect.anything() } }]);
		//@ts-ignore
		expect(values[0].ark.devnet).toBeInstanceOf(Coins.Coin);
	});

	it("#all", async () => {
		subject.set("ARK", "ark.devnet");

		expect(Object.keys(subject.all())).toEqual(["ARK"]);
	});

	it("#entries", async () => {
		subject.set("ARK", "ark.devnet");

		expect(subject.entries()).toEqual([["ARK", ["ark.devnet"]]]);

		const mockUndefinedNetwork = jest
			.spyOn(subject, "all")
			// @ts-ignore
			.mockReturnValue({ ARK: { ark: undefined } });

		expect(subject.entries()).toEqual([["ARK", ["ark"]]]);

		mockUndefinedNetwork.mockRestore();
	});

	it("#flush", async () => {
		const dataRepository: IDataRepository = mock<IDataRepository>();
		subject = new CoinService(dataRepository);

		subject.flush();

		expect(dataRepository.flush).toHaveBeenCalled();
	});
});
