import "jest-extended";

import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import nock from "nock";

import { identity } from "../../../test/fixtures/identity";
import { container } from "../../environment/container";
import { Identifiers } from "../../environment/container.models";
import { CoinService } from "../../environment/services/coin-service";
import { Profile } from "../profile";
import { WalletAggregate } from "./wallet-aggregate";

let subject: WalletAggregate;
let profile: Profile;

beforeAll(() => {
	bootContainer();

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
});

beforeEach(async () => {
	profile = new Profile({ id: "uuid", data: "" });

	await profile.wallets().importByMnemonic(identity.mnemonic, "ARK", "ark.devnet");

	subject = new WalletAggregate(profile);
});

describe("WalletAggregate", () => {
	it("#balance", async () => {
		expect(subject.balance("test").toString()).toEqual("55827093444556");
		expect(subject.balance("live").toString()).toEqual("0");
		expect(subject.balance().toString()).toEqual("0");

		const mockWalletLive = jest.spyOn(profile.wallets().first().network(), "isLive").mockReturnValue(true);
		expect(subject.balance("live").toString()).toEqual("55827093444556");
		mockWalletLive.mockRestore();
	});

	it("#convertedBalance", async () => {
		expect(subject.convertedBalance().toString()).toEqual("0");
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
				total: "55827093444556",
			},
		});

		const mockWalletLive = jest.spyOn(profile.wallets().first(), "balance").mockReturnValue(BigNumber.ZERO);

		expect(subject.balancePerCoin("test")).toEqual({ DARK: { percentage: "0.00", total: "0" } });
		mockWalletLive.mockRestore();
	});
});
