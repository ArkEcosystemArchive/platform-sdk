import "jest-extended";

import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import nock from "nock";

import { container } from "../container";
import { Identifiers } from "../container.models";
import { CoinService } from "./coin-service";
import { KnownWalletsService } from "./known-wallets-service";
import KnownWalletsFixture from "../../../test/fixtures/wallets/known-wallets.json";

let subject: KnownWalletsService;

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

	container.set(Identifiers.HttpClient, new Request());
	container.set(Identifiers.CoinService, new CoinService());
	container.set(Identifiers.Coins, { ARK });
});

beforeEach(() => (subject = new KnownWalletsService(KnownWalletsFixture)));

it("should find known wallet by address", async () => {
	expect(subject.findByAddress("AWkBFnqvCF4jhqPSdE2HBPJiwaf67tgfGR")).toEqual({
		type: "team",
		name: "ACF Hot Wallet (old)",
		address: "AWkBFnqvCF4jhqPSdE2HBPJiwaf67tgfGR",
	});
});

it("should check if given address is known", async () => {
	expect(subject.isKnown("AWkBFnqvCF4jhqPSdE2HBPJiwaf67tgfGR")).toBeTrue();
});

it("should check if  address has a particular type (team, exchange or custom)", async () => {
	expect(subject.hasType("AFrPtEmzu6wdVpa2CnRDEKGQQMWgq8nE9V", "exchange")).toBeTrue();
	expect(subject.hasType("AFrPtEmzu6wdVpa2CnRDEKGQQMWgq8nE9V", "team")).toBeFalse();
});

it("should check if address is owned by exchange", async () => {
	expect(subject.isOwnedByExchange("AFrPtEmzu6wdVpa2CnRDEKGQQMWgq8nE9V")).toBeTrue();
});

it("should check if address is owned by team", async () => {
	expect(subject.isOwnedByExchange("AFrPtEmzu6wdVpa2CnRDEKGQQMWgq8nE9V")).toBeTrue();
});

it("should get address display name", async () => {
	expect(subject.displayName("AFrPtEmzu6wdVpa2CnRDEKGQQMWgq8nE9V")).toBe('Binance');
});
