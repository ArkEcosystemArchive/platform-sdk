import "jest-extended";

import nock from "nock";

import { bootContainer } from "../../../test/helpers";
import { EntitySubType, EntityType } from "../../enums";
import { Profile } from "../../profiles/profile";
import { EntityAggregate } from "./entity-aggregate";

let subject: EntityAggregate;
let profile: Profile;
let wallet: any;

beforeAll(() => bootContainer());

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

	profile = new Profile({ id: "uuid", name: "name", avatar: "avatar", data: "" });
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
