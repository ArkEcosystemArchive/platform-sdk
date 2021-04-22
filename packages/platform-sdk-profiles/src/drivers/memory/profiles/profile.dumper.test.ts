import "jest-extended";
import "reflect-metadata";

import { Base64 } from "@arkecosystem/platform-sdk-crypto";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import nock from "nock";

import { identity } from "../../../../test/fixtures/identity";
import { bootContainer, importByAddressWithLedgerPath, importByMnemonic, generateWallet } from "../../../../test/helpers";
import { PluginRepository } from "../plugins/plugin-repository";
import { ContactRepository } from "../repositories/contact-repository";
import { DataRepository } from "../../../repositories/data-repository";
import { NotificationRepository } from "../repositories/notification-repository";
import { SettingRepository } from "../repositories/setting-repository";
import { WalletRepository } from "../repositories/wallet-repository";
import { CountAggregate } from "./aggregates/count-aggregate";
import { RegistrationAggregate } from "./aggregates/registration-aggregate";
import { TransactionAggregate } from "./aggregates/transaction-aggregate";
import { WalletAggregate } from "./aggregates/wallet-aggregate";
import { Authenticator } from "./authenticator";
import { Profile } from "./profile";
import { IProfile, ProfileSetting } from "../../../contracts";
import { State } from "../../../environment/state";

let subject: IProfile;

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
	subject = new Profile({ id: "uuid", name: "name", data: "" });

	State.profile(subject);

	subject.settings().set(ProfileSetting.Name, "John Doe");
});

describe("#dump", () => {
	it("should dump the profile with a password", () => {
		subject.auth().setPassword("password");
		subject.save("password");

		const { id, password, data } = subject.dump();

		expect(id).toBeString();
		expect(password).toBeString();
		expect(data).toBeString();
	});

	it("should dump the profile without a password", () => {
		subject.save();
		const { id, password, data } = subject.dump();

		expect(id).toBeString();
		expect(password).toBeUndefined();
		expect(data).toBeString();
	});

	it("should fail to dump a profile with a password if the profile was not encrypted", () => {
		subject = new Profile({ id: "uuid", name: "name", data: "", password: "password" });

		expect(() => subject.dump()).toThrow(
			"The profile has not been encoded or encrypted. Please call [save] before dumping.",
		);
	});
});
