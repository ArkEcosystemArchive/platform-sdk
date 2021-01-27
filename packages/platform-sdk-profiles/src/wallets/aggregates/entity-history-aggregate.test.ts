import "jest-extended";

import nock from "nock";
import { v4 as uuidv4 } from "uuid";

import { identity } from "../../../test/fixtures/identity";
import { bootContainer } from "../../../test/helpers";
import { Profile } from "../../profiles/profile";
import { ProfileSetting } from "../../profiles/profile.models";
import { Wallet } from "../../wallets/wallet";
import { EntityHistoryAggregate } from "./entity-history-aggregate";

let subject: EntityHistoryAggregate;

beforeAll(async () => {
	bootContainer();

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

	const profile = new Profile({ id: "profile-id", name: "name", avatar: "avatar", data: "" });
	profile.settings().set(ProfileSetting.Name, "John Doe");

	const wallet = new Wallet(uuidv4(), profile);

	await wallet.setCoin("ARK", "ark.devnet");
	await wallet.setIdentity(identity.mnemonic);

	subject = new EntityHistoryAggregate(wallet);
});

it("should retrieve the registration, updates and resignations", async () => {
	await expect(subject.all("registrationId")).resolves.toHaveLength(3);
});
