import "jest-extended";

import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import nock from "nock";

import { identity } from "../../../test/fixtures/identity";
import { container } from "../../environment/container";
import { Identifiers } from "../../environment/container.models";
import { CoinService } from "../../environment/services/coin-service";
import { Profile } from "../profile";
import { RegistrationAggregate } from "./registration-aggregate";

let subject: RegistrationAggregate;
let profile: Profile;

beforeAll(() => {
	nock(/.+/)
		.get("/api/node/configuration/crypto")
		.reply(200, require("../../../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/peers")
		.reply(200, require("../../../test/fixtures/client/peers.json"))
		.get("/api/node/syncing")
		.reply(200, require("../../../test/fixtures/client/syncing.json"))
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require("../../../test/fixtures/client/wallet.json"))
		.persist();

	container.bind(Identifiers.HttpClient, new Request());
	container.bind(Identifiers.CoinService, new CoinService());
	container.bind(Identifiers.Coins, { ARK });
});

beforeEach(async () => {
	profile = new Profile({ id: "uuid", data: "" });

	await profile.wallets().importByMnemonic(identity.mnemonic, "ARK", "ark.devnet");

	subject = new RegistrationAggregate(profile);
});

describe("RegistrationAggregate", () => {
	it("#delegates", async () => {
		const delegates = subject.delegates();

		expect(delegates).toHaveLength(1);
		expect(delegates[0].address()).toEqual("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
	});
});
