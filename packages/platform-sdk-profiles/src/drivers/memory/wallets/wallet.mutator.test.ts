import "jest-extended";
import "reflect-metadata";

import { encrypt } from "bip38";
import nock from "nock";
import { v4 as uuidv4 } from "uuid";
import { decode } from "wif";

import { identity } from "../../../../test/fixtures/identity";
import { bootContainer } from "../../../../test/helpers";
import { container } from "../../../environment/container";
import { Identifiers } from "../../../environment/container.models";
import { Wallet } from "./wallet";
import { IProfile, IProfileRepository, IReadWriteWallet, ProfileSetting, WalletData } from "../../../contracts";
import { State } from "../../../environment/state";

let profile: IProfile;
let subject: IReadWriteWallet;

beforeAll(() => bootContainer());

beforeEach(async () => {
	nock.cleanAll();

	nock(/.+/)
		.get("/api/node/configuration")
		.reply(200, require("../../../../test/fixtures/client/configuration.json"))
		.get("/api/peers")
		.reply(200, require("../../../../test/fixtures/client/peers.json"))
		.get("/api/node/configuration/crypto")
		.reply(200, require("../../../../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/node/syncing")
		.reply(200, require("../../../../test/fixtures/client/syncing.json"))

		// default wallet
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require("../../../../test/fixtures/client/wallet.json"))
		.get("/api/wallets/034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192")
		.reply(200, require("../../../../test/fixtures/client/wallet.json"))

		// second wallet
		.get("/api/wallets/022e04844a0f02b1df78dff2c7c4e3200137dfc1183dcee8fc2a411b00fd1877ce")
		.reply(200, require("../../../../test/fixtures/client/wallet-2.json"))
		.get("/api/wallets/DNc92FQmYu8G9Xvo6YqhPtRxYsUxdsUn9w")
		.reply(200, require("../../../../test/fixtures/client/wallet-2.json"))

		// Musig wallet
		.get("/api/wallets/DML7XEfePpj5qDFb1SbCWxLRhzdTDop7V1")
		.reply(200, require("../../../../test/fixtures/client/wallet-musig.json"))
		.get("/api/wallets/02cec9caeb855e54b71e4d60c00889e78107f6136d1f664e5646ebcb2f62dae2c6")
		.reply(200, require("../../../../test/fixtures/client/wallet-musig.json"))

		.get("/api/delegates")
		.reply(200, require("../../../../test/fixtures/client/delegates-1.json"))
		.get("/api/delegates?page=2")
		.reply(200, require("../../../../test/fixtures/client/delegates-2.json"))
		.get("/api/transactions/3e0b2e5ed00b34975abd6dee0ca5bd5560b5bd619b26cf6d8f70030408ec5be3")
		.query(true)
		.reply(200, () => {
			const response = require("../../../../test/fixtures/client/transactions.json");
			return { data: response.data[0] };
		})
		.get("/api/transactions/bb9004fa874b534905f9eff201150f7f982622015f33e076c52f1e945ef184ed")
		.query(true)
		.reply(200, () => {
			const response = require("../../../../test/fixtures/client/transactions.json");
			return { data: response.data[1] };
		})
		.get("/api/transactions")
		.query(true)
		.reply(200, require("../../../../test/fixtures/client/transactions.json"))
		// CryptoCompare
		.get("/data/histoday")
		.query(true)
		.reply(200, require("../../../../test/fixtures/markets/cryptocompare/historical.json"))
		.persist();

	const profileRepository = container.get<IProfileRepository>(Identifiers.ProfileRepository);
	profileRepository.flush();
	profile = profileRepository.create("John Doe");

	State.profile(profile);

	subject = new Wallet(uuidv4(), {});

	await subject.mutator().coin("ARK", "ark.devnet");
	await subject.mutator().identity(identity.mnemonic);
});

beforeAll(() => nock.disableNetConnect());

describe("#setCoin", () => {
	it("should use the default peer if no custom one is available", async () => {
		await subject.mutator().coin("ARK", "ark.devnet");

		expect(() => subject.coin().config().get("peer")).toThrow("unknown");
	});

	it("should use the custom relay peer if is available", async () => {
		profile.settings().set(ProfileSetting.UseCustomPeer, true);

		profile.peers().create("ARK", "ark.devnet", {
			name: "Relay",
			host: "https://relay.com/api",
			isMultiSignature: false,
		});

		await subject.mutator().coin("ARK", "ark.devnet");

		expect(subject.coin().config().get("peer")).toBe("https://relay.com/api");
	});

	it("should use the custom musig peer if is available", async () => {
		profile.settings().set(ProfileSetting.UseCustomPeer, true);

		profile.peers().create("ARK", "ark.devnet", {
			name: "MuSig",
			host: "https://musig.com/api",
			isMultiSignature: true,
		});

		await subject.mutator().coin("ARK", "ark.devnet");

		expect(subject.coin().config().get("peerMultiSignature")).toBe("https://musig.com/api");
	});

	it("should use the custom relay and musig peers if they are available", async () => {
		profile.settings().set(ProfileSetting.UseCustomPeer, true);

		profile.peers().create("ARK", "ark.devnet", {
			name: "Relay",
			host: "https://relay.com/api",
			isMultiSignature: false,
		});

		profile.peers().create("ARK", "ark.devnet", {
			name: "MuSig",
			host: "https://musig.com/api",
			isMultiSignature: true,
		});

		await subject.mutator().coin("ARK", "ark.devnet");

		expect(subject.coin().config().get("peer")).toBe("https://relay.com/api");
		expect(subject.coin().config().get("peerMultiSignature")).toBe("https://musig.com/api");
	});

	it("should return relays", async () => {
		profile.peers().create("ARK", "ark.devnet", {
			name: "Relay",
			host: "https://relay.com/api",
			isMultiSignature: false,
		});

		await subject.mutator().coin("ARK", "ark.devnet");

		expect(subject.getRelays()).toBeArrayOfSize(1);
	});
});
