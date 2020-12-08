import "jest-extended";

import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import nock from "nock";

import { EntitySubType, EntityType } from "../../enums";
import { container } from "../../environment/container";
import { Identifiers } from "../../environment/container.models";
import { CoinService } from "../../environment/services/coin-service";
import { Profile } from "../profile";

let profile: Profile;

beforeEach(async () => {
	nock.disableNetConnect();

	nock(/.+/)
		.get("/api/node/configuration/crypto")
		.reply(200, require("../../../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/node/configuration")
		.reply(200, require("../../../test/fixtures/client/configuration.json"))
		.get("/api/peers")
		.reply(200, require("../../../test/fixtures/client/peers.json"))
		.get("/api/node/syncing")
		.reply(200, require("../../../test/fixtures/client/syncing.json"))
		.get("/api/wallets/D5sRKWckH4rE1hQ9eeMeHAepgyC3cvJtwb")
		.reply(200, require("../../../test/fixtures/wallets/D5sRKWckH4rE1hQ9eeMeHAepgyC3cvJtwb.json"))
		.persist();

	container.set(Identifiers.HttpClient, new Request());
	container.set(Identifiers.CoinService, new CoinService());
	container.set(Identifiers.Coins, { ARK });
	profile = new Profile({ id: "uuid" });
	const address = "D5sRKWckH4rE1hQ9eeMeHAepgyC3cvJtwb";

	await profile.wallets().importByAddress(address, "ARK", "ark.devnet");
});

afterAll(() => nock.enableNetConnect());

it("should aggregate registrations for the given type and sub-type", async () => {
	nock.cleanAll();
	nock(/.+/)
		.get("/api/transactions")
		.query(true)
		.reply(200, require("../../../test/fixtures/client/registrations/business.json"));

	const registrations = await profile.entityAggregate().registrations(EntityType.Business, EntitySubType.None);

	expect(registrations.items()).toHaveLength(1);
	expect(registrations.findById("df520b0a278314e998dc93be1e20c72b8313950c19da23967a9db60eb4e990da")).toBeTruthy();
});

it("should aggregate updates for the given type and sub-type", async () => {
	nock.cleanAll();
	nock(/.+/)
		.get("/api/transactions")
		.query(true)
		.reply(200, require("../../../test/fixtures/client/registrations/business.json"));

	const updates = await profile.entityAggregate().updates(EntityType.Business, EntitySubType.None);

	expect(updates.items()).toHaveLength(1);
	expect(updates.findById("df520b0a278314e998dc93be1e20c72b8313950c19da23967a9db60eb4e990da")).toBeTruthy();
});

it("should aggregate resignations for the given type and sub-type", async () => {
	nock.cleanAll();
	nock(/.+/)
		.get("/api/transactions")
		.query(true)
		.reply(200, require("../../../test/fixtures/client/registrations/business.json"));

	const resignations = await profile.entityAggregate().resignations(EntityType.Business, EntitySubType.None);

	expect(resignations.items()).toHaveLength(1);
	expect(resignations.findById("df520b0a278314e998dc93be1e20c72b8313950c19da23967a9db60eb4e990da")).toBeTruthy();
});

it("#flush", async () => {
	nock.cleanAll();
	nock(/.+/)
		.get("/api/transactions")
		.query(true)
		.reply(200, require("../../../test/fixtures/client/registrations/business.json"));

	profile.entityAggregate().flush();
	const resignations = await profile.entityAggregate().resignations(EntityType.Business, EntitySubType.None);

	expect(resignations.items()).toHaveLength(1);
	expect(resignations.findById("df520b0a278314e998dc93be1e20c72b8313950c19da23967a9db60eb4e990da")).toBeTruthy();
});

it("#should fetch all available registrations", async () => {
	nock.cleanAll();
	nock(/.+/)
		.get("/api/transactions")
		.query(true)
		.reply(200, require("../../../test/fixtures/client/registrations/business.json"));

	const firstPage = await profile.entityAggregate().registrations(EntityType.Business, EntitySubType.None);
	expect(firstPage.findById("df520b0a278314e998dc93be1e20c72b8313950c19da23967a9db60eb4e990da")).toBeTruthy();

	const secondPage = await profile.entityAggregate().registrations(EntityType.Business, EntitySubType.None);
	expect(secondPage.items()).toHaveLength(0);
	expect(profile.entityAggregate().hasMore("0.0.updates")).toBeFalse();
});

it("should filter out empty registration results", async () => {
	nock.cleanAll();
	nock(/.+/)
		.get("/api/transactions")
		.query(true)
		.reply(200, require("../../../test/fixtures/client/registrations/business.json"));

	const firstPage = await profile.entityAggregate().registrations(EntityType.Business, EntitySubType.None);
	expect(firstPage.findById("df520b0a278314e998dc93be1e20c72b8313950c19da23967a9db60eb4e990da")).toBeTruthy();

	nock.cleanAll();
	nock(/.+/).get("/api/transactions").query(true).reply(200, { meta: {}, data: [] });

	profile.entityAggregate().flush();
	const nextPage = await profile.entityAggregate().registrations(EntityType.Business, EntitySubType.None);
	expect(nextPage.items()).toHaveLength(0);
});
