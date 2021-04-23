import "jest-extended";
import "reflect-metadata";

import nock from "nock";

import { bootContainer } from "../../../../test/helpers";
import { Profile } from "./profile";
import { IProfile, ProfileSetting } from "../../../contracts";
import { State } from "../../../environment/state";
import { ProfileDumper } from "./profile.dumper";

let subject: ProfileDumper;
let profile: IProfile;

beforeAll(() => {
	bootContainer();

	nock.disableNetConnect();

	nock(/.+/)
		.get("/api/node/configuration/crypto")
		.reply(200, require("../../../../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/peers")
		.reply(200, require("../../../../test/fixtures/client/peers.json"))
		.get("/api/node/syncing")
		.reply(200, require("../../../../test/fixtures/client/syncing.json"))
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require("../../../../test/fixtures/client/wallet.json"))
		.get("/api/wallets/DNc92FQmYu8G9Xvo6YqhPtRxYsUxdsUn9w")
		.reply(200, require("../../../../test/fixtures/client/wallet-2.json"))
		.persist();
});

beforeEach(() => {
	subject = new ProfileDumper();
	profile = new Profile({ id: "uuid", name: "name", data: "" });

	State.profile(profile);

	profile.settings().set(ProfileSetting.Name, "John Doe");
});

describe("#dump", () => {
	it("should dump the profile with a password", () => {
		profile.auth().setPassword("password");
		profile.save("password");

		const { id, password, data } = subject.dump(profile);

		expect(id).toBeString();
		expect(password).toBeString();
		expect(data).toBeString();
	});

	it("should dump the profile without a password", () => {
		profile.save();
		const { id, password, data } = subject.dump(profile);

		expect(id).toBeString();
		expect(password).toBeUndefined();
		expect(data).toBeString();
	});

	it("should fail to dump a profile with a password if the profile was not encrypted", () => {
		profile = new Profile({ id: "uuid", name: "name", data: "", password: "password" });

		expect(() => subject.dump(profile)).toThrow(
			"The profile has not been encoded or encrypted. Please call [save] before dumping.",
		);
	});
});
