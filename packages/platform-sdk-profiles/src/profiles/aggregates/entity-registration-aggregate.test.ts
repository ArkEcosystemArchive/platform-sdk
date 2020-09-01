import "jest-extended";

import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import nock from "nock";

import { container } from "../../environment/container";
import { Identifiers } from "../../environment/container.models";
import { Profile } from "../profile";
import { CoinService } from "../../environment/services/coin-service";

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
	profile = new Profile("uuid");
	const address = "D5sRKWckH4rE1hQ9eeMeHAepgyC3cvJtwb";

	await profile.wallets().importByAddress(address, "ARK", "devnet");
});

afterAll(() => nock.enableNetConnect());

it("should aggregate all registrations", async () => {
	nock(/.+/)
		.post("/api/transactions/search")
		.reply(200, require("../../../test/fixtures/client/registrations/all.json"));

	const allRegistrations = await profile.entityRegistrationAggregate().all();

	expect(allRegistrations.items()).toHaveLength(3);
	expect(allRegistrations.findById("03e44853b26f450d5aba78e3fad390faa8ae9aa6995b1fa80b8d191516b52f1e")).toBeTruthy();
	expect(allRegistrations.findById("9d25ddf8e59d8595a74d7fe74fdee3380660d60333c453b1a352326d80ba4b43")).toBeTruthy();
	expect(allRegistrations.findById("df520b0a278314e998dc93be1e20c72b8313950c19da23967a9db60eb4e990da")).toBeTruthy();
});

it("should aggregate business registrations", async () => {
	nock.cleanAll();
	nock(/.+/)
		.post("/api/transactions/search")
		.reply(200, require("../../../test/fixtures/client/registrations/business.json"));

	const registrations = await profile.entityRegistrationAggregate().businesses();

	expect(registrations.items()).toHaveLength(1);
	expect(registrations.findById("df520b0a278314e998dc93be1e20c72b8313950c19da23967a9db60eb4e990da")).toBeTruthy();
});

it("should aggregate core plugin registrations", async () => {
	nock.cleanAll();
	nock(/.+/)
		.post("/api/transactions/search")
		.reply(200, require("../../../test/fixtures/client/registrations/core-plugins.json"));

	const registrations = await profile.entityRegistrationAggregate().corePlugins();

	expect(registrations.items()).toHaveLength(1);
	expect(registrations.findById("9d25ddf8e59d8595a74d7fe74fdee3380660d60333c453b1a352326d80ba4b43")).toBeTruthy();
});

it("should aggregate desktop wallet plugin registrations", async () => {
	nock.cleanAll();
	nock(/.+/)
		.post("/api/transactions/search")
		.reply(200, require("../../../test/fixtures/client/registrations/desktop-plugins.json"));

	const registrations = await profile.entityRegistrationAggregate().desktopWalletPlugins();

	expect(registrations.items()).toHaveLength(1);
	expect(registrations.findById("03e44853b26f450d5aba78e3fad390faa8ae9aa6995b1fa80b8d191516b52f1e")).toBeTruthy();
});
