import "jest-extended";
import "reflect-metadata";

import nock from "nock";

import { bootContainer } from "../../../../test/helpers";
import { container } from "../../../environment/container";
import { Identifiers } from "../../../environment/container.models";
import { KnownWalletService } from "./known-wallet-service";
import { Profile } from "../profiles/profile";
import { State } from "../../../environment/state";

let subject: KnownWalletService;

beforeAll(() => {
	bootContainer();

	nock.disableNetConnect();
});

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
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require("../../../../test/fixtures/client/wallet.json"))
		.get("/api/delegates")
		.reply(200, require("../../../../test/fixtures/client/delegates-1.json"))
		.get("/api/delegates?page=2")
		.reply(200, require("../../../../test/fixtures/client/delegates-2.json"))
		.get("/ArkEcosystem/common/master/devnet/known-wallets-extended.json")
		.reply(200, [
			{
				type: "team",
				name: "ACF Hot Wallet",
				address: "AagJoLEnpXYkxYdYkmdDSNMLjjBkLJ6T67",
			},
			{
				type: "team",
				name: "ACF Hot Wallet (old)",
				address: "AWkBFnqvCF4jhqPSdE2HBPJiwaf67tgfGR",
			},
			{
				type: "exchange",
				name: "Binance",
				address: "AFrPtEmzu6wdVpa2CnRDEKGQQMWgq8nE9V",
			},
		])
		.persist();

	const profile = new Profile({ id: "uuid", name: "name", avatar: "avatar", data: "" });

	State.profile(profile);

	await profile.coins().push("ARK", "ark.devnet").__construct();

	subject = new KnownWalletService();

	await subject.syncAll();
});

afterEach(() => nock.cleanAll());

describe("KnownWalletService", () => {
	test("#name", async () => {
		expect(subject.name("ark.devnet", "AagJoLEnpXYkxYdYkmdDSNMLjjBkLJ6T67")).toEqual("ACF Hot Wallet");
		expect(subject.name("ark.devnet", "AWkBFnqvCF4jhqPSdE2HBPJiwaf67tgfGR")).toEqual("ACF Hot Wallet (old)");
		expect(subject.name("ark.devnet", "AWkBFnqvCF4jhqPSdE2HBPJiwaf67tgfGRa")).toEqual(undefined);
	});

	test("#is", async () => {
		expect(subject.is("ark.devnet", "AFrPtEmzu6wdVpa2CnRDEKGQQMWgq8nE9V")).toBeTrue();
		expect(subject.is("ark.devnet", "AagJoLEnpXYkxYdYkmdDSNMLjjBkLJ6T67s")).toBeFalse();
	});

	test("#isExchange", async () => {
		expect(subject.isExchange("ark.devnet", "AFrPtEmzu6wdVpa2CnRDEKGQQMWgq8nE9V")).toBeTrue();
		expect(subject.isExchange("ark.devnet", "AagJoLEnpXYkxYdYkmdDSNMLjjBkLJ6T67")).toBeFalse();
		expect(subject.isExchange("unknown", "AagJoLEnpXYkxYdYkmdDSNMLjjBkLJ6T67")).toBeFalse();
	});

	test("#isTeam", async () => {
		expect(subject.isTeam("ark.devnet", "AagJoLEnpXYkxYdYkmdDSNMLjjBkLJ6T67")).toBeTrue();
		expect(subject.isTeam("ark.devnet", "AFrPtEmzu6wdVpa2CnRDEKGQQMWgq8nE9V")).toBeFalse();
	});
});
