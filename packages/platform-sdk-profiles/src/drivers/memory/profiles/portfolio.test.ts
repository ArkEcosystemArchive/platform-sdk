import "jest-extended";
import "reflect-metadata";

import nock from "nock";
import { v4 as uuidv4 } from "uuid";

import { identity } from "../../../../test/fixtures/identity";
import { bootContainer, importByMnemonic } from "../../../../test/helpers";
import { container } from "../../../environment/container";
import { Identifiers } from "../../../environment/container.models";
import { Wallet } from "../wallets/wallet";
import { IExchangeRateService, IProfile, IProfileRepository, IReadWriteWallet, WalletData } from "../../../contracts";
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
		.get("/api/wallets/D94iLJaZSbjXG6XaR9BGRVBfzzYmxNt1Bi")
		.reply(200, require("../../../../test/fixtures/client/wallet.json"))
		.get("/api/wallets/DTShJdDKECzQLW3uomKfuPvmU51sxyNWUL")
		.reply(200, require("../../../../test/fixtures/client/wallet.json"))
		.get("/api/wallets/DQzosAzwyYStw2bUeUTCUnqiMonEz9ER2o")
		.reply(200, require("../../../../test/fixtures/client/wallet.json"))
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

it("should aggregate the balances of all wallets", async () => {
	nock(/.+/)
		.get("/data/dayAvg")
		.query(true)
		.reply(200, { BTC: 0.00005048, ConversionType: { type: "direct", conversionSymbol: "" } })
		.persist();

	const [a, b, c] = await Promise.all([
		importByMnemonic(profile, "ark", "ARK", "ark.devnet"),
		importByMnemonic(profile, "btc", "ARK", "ark.devnet"),
		importByMnemonic(profile, "eth", "ARK", "ark.devnet"),
	]);
	a.data().set(WalletData.Balance, 1e8);
	b.data().set(WalletData.Balance, 1e8);
	c.data().set(WalletData.Balance, 1e8);

	jest.spyOn(a.network(), "isLive").mockReturnValue(true);
	jest.spyOn(a.network(), "isTest").mockReturnValue(false);
	jest.spyOn(a.network(), "ticker").mockReturnValue("ARK");

	jest.spyOn(b.network(), "isLive").mockReturnValue(true);
	jest.spyOn(b.network(), "isTest").mockReturnValue(false);
	jest.spyOn(b.network(), "ticker").mockReturnValue("ARK");

	jest.spyOn(c.network(), "isLive").mockReturnValue(true);
	jest.spyOn(c.network(), "isTest").mockReturnValue(false);
	jest.spyOn(c.network(), "ticker").mockReturnValue("ARK");

	await container.get<IExchangeRateService>(Identifiers.ExchangeRateService).syncAll(profile, "ARK");

	expect(profile.portfolio().breakdown()[0].source).toBe(3);
	expect(profile.portfolio().breakdown()[0].target).toBe(0.00015144);
	expect(profile.portfolio().breakdown()[0].shares).toBe(100);
});

it("should ignore test network wallets", async () => {
	await Promise.all([
		importByMnemonic(profile, "ark", "ARK", "ark.devnet"),
		importByMnemonic(profile, "btc", "ARK", "ark.devnet"),
		importByMnemonic(profile, "eth", "ARK", "ark.devnet"),
	]);

	expect(profile.portfolio().breakdown()).toEqual([]);
});
