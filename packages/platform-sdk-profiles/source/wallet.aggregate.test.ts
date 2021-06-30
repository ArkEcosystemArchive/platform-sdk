import "jest-extended";
import "reflect-metadata";

import { BigNumber } from "@arkecosystem/platform-sdk-support";
import nock from "nock";

import { identity } from "../test/fixtures/identity";
import { bootContainer, importByMnemonic } from "../test/mocking";
import { Profile } from "./profile";
import { WalletAggregate } from "./wallet.aggregate";
import { IProfile } from "./contracts";

let subject: WalletAggregate;
let profile: IProfile;

beforeAll(() => {
	bootContainer();

	nock(/.+/)
		.get("/api/node/configuration/crypto")
		.reply(200, require("../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/peers")
		.reply(200, require("../test/fixtures/client/peers.json"))
		.get("/api/node/syncing")
		.reply(200, require("../test/fixtures/client/syncing.json"))
		.get("/api/wallets/D6i8P5N44rFto6M6RALyUXLLs7Q1A1WREW")
		.reply(200, require("../test/fixtures/client/wallet.json"))
		.persist();
});

beforeEach(async () => {
	profile = new Profile({ id: "uuid", name: "name", avatar: "avatar", data: "" });

	await importByMnemonic(profile, identity.mnemonic, "ARK", "ark.devnet");

	subject = new WalletAggregate(profile);
});

describe("WalletAggregate", () => {
	it("#balance", async () => {
		expect(subject.balance("test")).toEqual(558270.93444556);
		expect(subject.balance("live")).toEqual(0);
		expect(subject.balance()).toEqual(0);

		const mockWalletLive = jest.spyOn(profile.wallets().first().network(), "isLive").mockReturnValue(true);
		expect(subject.balance("live")).toEqual(558270.93444556);
		mockWalletLive.mockRestore();
	});

	it("#convertedBalance", async () => {
		expect(subject.convertedBalance()).toEqual(0);
	});

	it("#balancesByNetworkType", async () => {
		expect(subject.balancesByNetworkType()).toEqual({
			live: BigNumber.ZERO,
			test: BigNumber.make("55827093444556"),
		});
	});

	it("#balancePerCoin", async () => {
		expect(subject.balancePerCoin()).toEqual({});
		expect(subject.balancePerCoin("live")).toEqual({});

		expect(subject.balancePerCoin("test")).toEqual({
			DARK: {
				percentage: "100.00",
				total: "558270.93444556",
			},
		});

		const mockWalletLive = jest.spyOn(profile.wallets().first(), "balance").mockReturnValue(0);

		expect(subject.balancePerCoin("test")).toEqual({ DARK: { percentage: "0.00", total: "0" } });
		mockWalletLive.mockRestore();
	});
});
