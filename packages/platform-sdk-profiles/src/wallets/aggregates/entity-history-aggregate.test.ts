import "jest-extended";

import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import nock from "nock";
import { v4 as uuidv4 } from "uuid";

import { identity } from "../../../test/fixtures/identity";
import { container } from "../../environment/container";
import { Identifiers } from "../../environment/container.models";
import { CoinService } from "../../environment/services/coin-service";
import { Profile } from "../../profiles/profile";
import { ProfileSetting } from "../../profiles/profile.models";
import { Wallet } from "../../wallets/wallet";
import { EntityHistoryAggregate } from "./entity-history-aggregate";

let subject: EntityHistoryAggregate;

beforeAll(async () => {
	nock.disableNetConnect();

	nock(/.+/)
		.get("/api/node/configuration")
		.reply(200, require("../../../test/fixtures/client/configuration.json"))
		.get("/api/peers")
		.reply(200, require("../../../test/fixtures/client/peers.json"))
		.get("/api/node/configuration/crypto")
		.reply(200, require("../../../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/node/syncing")
		.reply(200, require("../../../test/fixtures/client/syncing.json"))
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require("../../../test/fixtures/client/wallet.json"))
		.get("/api/transactions/registrationId")
		.query(true)
		.reply(200, () => {
			const response = require("../../../test/fixtures/client/transactions.json");
			return { data: response.data[0] };
		})
		.get("/api/transactions")
		.query(true)
		.reply(200, require("../../../test/fixtures/client/registrations/business.json"))
		.persist();

	container.singleton(Identifiers.HttpClient, Request);
	container.singleton(Identifiers.CoinService, CoinService);
	container.bind(Identifiers.Coins, { ARK });

	const profile = new Profile({ id: "profile-id", data: "" });
	profile.settings().set(ProfileSetting.Name, "John Doe");

	const wallet = new Wallet(uuidv4(), profile);

	await wallet.setCoin("ARK", "ark.devnet");
	await wallet.setIdentity(identity.mnemonic);

	subject = new EntityHistoryAggregate(wallet);
});

it("should retrieve the registration, updates and resignations", async () => {
	await expect(subject.all("registrationId")).resolves.toHaveLength(3);
});
