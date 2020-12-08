import "jest-extended";

import { Coins } from "@arkecosystem/platform-sdk";
import { ValidatorSchema } from "@arkecosystem/platform-sdk-support";
import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import nock from "nock";

import { container } from "../container";
import { Identifiers } from "../container.models";
import { CoinService } from "./coin-service";

let subject: CoinService;
import NodeFeesFixture from "../../../test/fixtures/client/node-fees.json";

beforeAll(() => {
	nock.disableNetConnect();

	nock(/.+/)
		.get("/api/node/configuration")
		.reply(200, require("../../../test/fixtures/client/configuration.json"))
		.get("/api/node/configuration/crypto")
		.reply(200, require("../../../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/node/syncing")
		.reply(200, require("../../../test/fixtures/client/syncing.json"))
		.get("/api/peers")
		.reply(200, require("../../../test/fixtures/client/peers.json"))
		.get("/api/node/fees")
		.query(true)
		.reply(200, NodeFeesFixture)
		.get("/api/transactions/fees")
		.query(true)
		.reply(200, require("../../../test/fixtures/client/transaction-fees.json"))
		.persist();

	container.set(Identifiers.HttpClient, new Request());
	container.set(Identifiers.CoinService, new CoinService());
	container.set(Identifiers.Coins, { ARK });
});

beforeEach(async () => {
	subject = container.get(Identifiers.CoinService);
});

describe("CoinService", () => {
	it("#push", async () => {
		await subject.push("ARK", "ark.devnet");
		const coin = subject.get("ARK", "ark.devnet");
		expect(coin.network().id()).toEqual("ark.devnet");

		const useForce = false;
		await subject.push("ARK", "ark.devnet", {}, useForce);
		expect(coin.network().id()).toEqual("ark.devnet");
	});

	it("#has", async () => {
		expect(subject.has("ARK", "ark.devnet")).toBeTrue();
		expect(subject.has("UNKNOWN", "ark.devnet")).toBeFalse();
	});

	it("#get", async () => {
		expect(subject.get("ARK", "ark.devnet").network().id()).toEqual("ark.devnet");
		expect(() => subject.get("ARK", "unknown")).toThrow(/does not exist/);
	});

	it("#values", async () => {
		const values = subject.values();
		expect(values).toEqual([{ ark: { devnet: expect.anything() } }]);
		//@ts-ignore
		expect(values[0].ark.devnet).toBeInstanceOf(Coins.Coin);
	});

	it("#all", async () => {
		expect(Object.keys(subject.all())).toEqual(["ARK"]);
	});

	it("#entries", async () => {
		expect(subject.entries()).toEqual([["ARK", ["ark.devnet"]]]);

		const mockUndefinedNetwork = jest
			.spyOn(subject, "all")
			// @ts-ignore
			.mockReturnValue({ ARK: { ark: undefined } });

		expect(subject.entries()).toEqual([["ARK", ["ark"]]]);

		mockUndefinedNetwork.mockRestore();
	});
});
