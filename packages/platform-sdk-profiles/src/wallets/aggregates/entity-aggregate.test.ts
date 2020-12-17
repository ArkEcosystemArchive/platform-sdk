import "jest-extended";

import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import nock from "nock";

import { EntitySubType, EntityType } from "../../enums";
import { container } from "../../environment/container";
import { Identifiers } from "../../environment/container.models";
import { CoinService } from "../../environment/services/coin-service";
import { Profile } from "../../profiles/profile";
import { Wallet } from "../wallet";
import { EntityAggregate } from "./entity-aggregate";

let subject: EntityAggregate;
let profile: Profile;
let wallet: any;

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

	container.bind(Identifiers.HttpClient, new Request());
	container.bind(Identifiers.CoinService, new CoinService());
	container.bind(Identifiers.Coins, { ARK });
	profile = new Profile({ id: "uuid", data: "" });
	const address = "D5sRKWckH4rE1hQ9eeMeHAepgyC3cvJtwb";

	wallet = await profile.wallets().importByAddress(address, "ARK", "ark.devnet");

	subject = new EntityAggregate(wallet);
});

afterAll(() => nock.enableNetConnect());

it("should aggregate registrations for the given type and sub-type", async () => {
	nock.cleanAll();
	nock(/.+/)
		.get("/api/transactions")
		.query(true)
		.reply(200, require("../../../test/fixtures/client/registrations/business.json"));

	const registrations = await subject.registrations(EntityType.Business, EntitySubType.None);

	expect(registrations.items()).toHaveLength(1);
	expect(registrations.findById("df520b0a278314e998dc93be1e20c72b8313950c19da23967a9db60eb4e990da")).toBeTruthy();
});

it("should aggregate updates for the given type and sub-type", async () => {
	nock.cleanAll();
	nock(/.+/)
		.get("/api/transactions")
		.query(true)
		.reply(200, require("../../../test/fixtures/client/registrations/business.json"));

	const updates = await subject.updates(EntityType.Business, EntitySubType.None);

	expect(updates.items()).toHaveLength(1);
	expect(updates.findById("df520b0a278314e998dc93be1e20c72b8313950c19da23967a9db60eb4e990da")).toBeTruthy();
});

it("should aggregate resignations for the given type and sub-type", async () => {
	nock.cleanAll();
	nock(/.+/)
		.get("/api/transactions")
		.query(true)
		.reply(200, require("../../../test/fixtures/client/registrations/business.json"));

	const resignations = await subject.resignations(EntityType.Business, EntitySubType.None);

	expect(resignations.items()).toHaveLength(1);
	expect(resignations.findById("df520b0a278314e998dc93be1e20c72b8313950c19da23967a9db60eb4e990da")).toBeTruthy();
});
