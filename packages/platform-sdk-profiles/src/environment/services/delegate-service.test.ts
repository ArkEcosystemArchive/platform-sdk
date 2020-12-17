import "jest-extended";

import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import nock from "nock";

import { container } from "../container";
import { Identifiers } from "../container.models";
import { CoinService } from "./coin-service";
import { DelegateService } from "./delegate-service";

let subject: DelegateService;

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
		.get("/api/delegates")
		.reply(200, require("../../../test/fixtures/client/delegates-1.json"))
		.get("/api/delegates?page=2")
		.reply(200, require("../../../test/fixtures/client/delegates-2.json"))
		.persist();

	container.singleton(Identifiers.HttpClient, Request);
	container.singleton(Identifiers.CoinService, CoinService);
	container.bind(Identifiers.Coins, { ARK });
});

beforeEach(async () => {
	subject = new DelegateService();
});

describe("DelegateService", () => {
	it("should sync the delegates", async () => {
		expect(() => subject.all("ARK", "ark.devnet")).toThrowError("have not been synchronized yet");

		await subject.sync("ARK", "ark.devnet");

		expect(subject.all("ARK", "ark.devnet")).toBeArray();
		expect(subject.all("ARK", "ark.devnet")).toHaveLength(200);
	});

	it("should sync the delegates of all coins", async () => {
		expect(() => subject.all("ARK", "ark.devnet")).toThrowError("have not been synchronized yet");

		await subject.syncAll();

		expect(subject.all("ARK", "ark.devnet")).toBeArray();
		expect(subject.all("ARK", "ark.devnet")).toHaveLength(200);
	});

	it("#findByAddress", async () => {
		await subject.syncAll();
		expect(subject.findByAddress("ARK", "ark.devnet", "DSyG9hK9CE8eyfddUoEvsga4kNVQLdw2ve")).toBeTruthy();
		expect(() => subject.findByAddress("ARK", "ark.devnet", "unknown")).toThrowError(/No delegate for/);
	});

	it("#findByPublicKey", async () => {
		await subject.syncAll();
		expect(
			subject.findByPublicKey(
				"ARK",
				"ark.devnet",
				"033a5474f68f92f254691e93c06a2f22efaf7d66b543a53efcece021819653a200",
			),
		).toBeTruthy();
		expect(() => subject.findByPublicKey("ARK", "ark.devnet", "unknown")).toThrowError(/No delegate for/);
	});

	it("#findByUsername", async () => {
		await subject.syncAll();
		expect(subject.findByUsername("ARK", "ark.devnet", "alessio")).toBeTruthy();
		expect(() => subject.findByUsername("ARK", "ark.devnet", "unknown")).toThrowError(/No delegate for/);
	});
});
