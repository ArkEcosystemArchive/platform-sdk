import "jest-extended";

import { Coins } from "@arkecosystem/platform-sdk";
import { ARK } from "@arkecosystem/platform-sdk-ark";
import { BTC } from "@arkecosystem/platform-sdk-btc";
import { ETH } from "@arkecosystem/platform-sdk-eth";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import { removeSync } from "fs-extra";
import nock from "nock";
import { resolve } from "path";

import storageData from "../../test/fixtures/env-storage.json";
import corruptedStorageData from "../../test/fixtures/env-storage-corrupted.json";
import { identity } from "../../test/fixtures/identity";
import { StubStorage } from "../../test/stubs/storage";
import { Profile } from "../profiles/profile";
import { DataRepository } from "../repositories/data-repository";
import { ProfileRepository } from "../repositories/profile-repository";
import { container } from "./container";
import { Identifiers } from "./container.models";
import { Environment } from "./env";
import { WalletService } from "./services/wallet-service";
import { MemoryStorage } from "./storage/memory";

let subject: Environment;

beforeAll(() => {
	nock.disableNetConnect();

	nock(/.+/)
		.get("/api/node/configuration")
		.reply(200, require("../../test/fixtures/client/configuration.json"))
		.get("/api/node/configuration/crypto")
		.reply(200, require("../../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/node/syncing")
		.reply(200, require("../../test/fixtures/client/syncing.json"))
		.get("/api/peers")
		.reply(200, require("../../test/fixtures/client/peers.json"))
		.get("/api/node/fees")
		.query(true)
		.reply(200, require("../../test/fixtures/client/node-fees.json"))
		.get("/api/transactions/fees")
		.query(true)
		.reply(200, require("../../test/fixtures/client/transaction-fees.json"))
		.get("/api/delegates")
		.query(true)
		.reply(200, require("../../test/fixtures/client/delegates-2.json"))
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
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require("../../test/fixtures/client/wallet.json"))
		.get(/.+/)
		.query(true)
		.reply(200, (url) => {
			console.log("getting url", url);
			return { meta: {}, data: {} };
		})
		.persist();

	container.set(Identifiers.HttpClient, new Request());
	container.set(Identifiers.Coins, { ARK, BTC, ETH });
});

beforeEach(async () => {
	removeSync(resolve(__dirname, "../../test/stubs/env.json"));

	subject = new Environment({ coins: { ARK, BTC, ETH }, httpClient: new Request(), storage: new StubStorage() });
	await subject.verify();
	await subject.boot();
	await subject.persist();
});

it("should have a profile repository", async () => {
	expect(subject.profiles()).toBeInstanceOf(ProfileRepository);
});

it("should have a data repository", async () => {
	expect(subject.data()).toBeInstanceOf(DataRepository);
});

it("should have available networks", async () => {
	const coins: Record<string, Coins.CoinSpec> = { ARK, BTC, ETH };

	for (const network of subject.availableNetworks()) {
		expect(network.toObject()).toEqual(coins[network.coin()].manifest.networks[network.id()]);
	}
});

it("should create a profile with data and persist it when instructed to do so", async () => {
	/**
	 * Save data in the current environment.
	 */

	const profile = subject.profiles().create("John Doe");

	// Create a Contact
	profile.contacts().create("Jane Doe");

	// Create a Wallet
	await profile.wallets().importByMnemonic(identity.mnemonic, "ARK", "ark.devnet");

	// Create a Notification
	profile.notifications().push({
		icon: "warning",
		name: "Ledger Update Available",
		body: "...",
		type: "ledger",
		action: "Read Changelog",
	});

	// Create a DataEntry
	profile.data().set("key", "value");

	// Create a Setting
	profile.settings().set("ADVANCED_MODE", "value");

	// Create a Global DataEntry
	subject.data().set("key", "value");

	// Persist the data for the next instance to use.
	await subject.persist();

	/**
	 * Load data that the previous environment instance saved.
	 */

	const newEnv = new Environment({ coins: { ARK }, httpClient: new Request(), storage: new StubStorage() });
	await newEnv.verify();
	await newEnv.boot();

	const newProfile = newEnv.profiles().findById(profile.id());

	expect(newProfile).toBeInstanceOf(Profile);

	await newProfile.restore();

	expect(newProfile.wallets().keys()).toHaveLength(1);
	expect(newProfile.contacts().keys()).toHaveLength(1);
	expect(newProfile.notifications().keys()).toHaveLength(1);
	expect(newProfile.data().all()).toEqual({ key: "value" });
	expect(newProfile.settings().all()).toEqual({
		ADVANCED_MODE: "value",
		AUTOMATIC_SIGN_OUT_PERIOD: 15,
		BIP39_LOCALE: "english",
		EXCHANGE_CURRENCY: "BTC",
		LEDGER_UPDATE_METHOD: false,
		LOCALE: "en-US",
		MARKET_PROVIDER: "cryptocompare",
		NAME: "John Doe",
		SCREENSHOT_PROTECTION: true,
		THEME: "light",
		TIME_FORMAT: "h:mm A",
		USE_CUSTOM_PEER: false,
		USE_MULTI_PEER_BROADCAST: false,
		USE_TEST_NETWORKS: false,
	});
});

it("should boot the environment from fixed data", async () => {
	const env = new Environment({ coins: { ARK }, httpClient: new Request(), storage: new StubStorage() });
	await env.verify(storageData);
	await env.boot();

	const newProfile = env.profiles().findById("b999d134-7a24-481e-a95d-bc47c543bfc9");

	await newProfile.restore();

	expect(newProfile).toBeInstanceOf(Profile);
	expect(newProfile.wallets().keys()).toHaveLength(1);
	expect(newProfile.contacts().keys()).toHaveLength(1);
	expect(newProfile.notifications().keys()).toHaveLength(1);
	expect(newProfile.data().all()).toEqual({ key: "value" });
	expect(newProfile.settings().all()).toEqual({ ADVANCED_MODE: "value", NAME: "John Doe" });

	const restoredWallet = newProfile.wallets().findById("ac38fe6d-4b67-4ef1-85be-17c5f6841129");
	expect(restoredWallet.settings().all()).toEqual({ ALIAS: "Johnathan Doe", AVATAR: "..." });
	expect(restoredWallet.alias()).toBe("Johnathan Doe");
});

it("should boot with empty storage data", async () => {
	const env = new Environment({ coins: { ARK }, httpClient: new Request(), storage: new StubStorage() });
	await env.verify({ profiles: storageData.profiles, data: {} });
	await env.boot();
});

it("should boot with empty storage profiles", async () => {
	const env = new Environment({ coins: { ARK }, httpClient: new Request(), storage: new StubStorage() });
	await env.verify({ profiles: {}, data: { key: "value" } });
	await env.boot();
});

it("should create preselected storage given storage option as string", async () => {
	const env = new Environment({ coins: { ARK }, httpClient: new Request(), storage: "memory" });
	expect(container.get(Identifiers.Storage)).toBeInstanceOf(MemoryStorage);
});

it("should throw error when calling boot without verify first", async () => {
	const env = new Environment({ coins: { ARK }, httpClient: new Request(), storage: new StubStorage() });
	await expect(env.boot()).rejects.toThrowError("Please call [verify] before booting the environment.");
});

it("should get available coins", async () => {
	expect(subject.coins().values()).toEqual([]);
});

it("#exchangeRates", async () => {
	await subject.exchangeRates().syncAll();
	expect(subject.exchangeRates()).toEqual({});
});

it("#fees", async () => {
	await subject.fees().sync("ARK", "ark.devnet");
	expect(Object.keys(subject.fees().all("ARK", "ark.devnet"))).toHaveLength(14);
});

it("#delegates", async () => {
	await subject.delegates().sync("ARK", "ark.devnet");
	expect(subject.delegates().all("ARK", "ark.devnet")).toHaveLength(100);
});

it("#knownWallets", async () => {
	await subject.knownWallets().syncAll();
	expect(subject.knownWallets().is("ark.devnet", "unknownWallet")).toBeFalse();
});

it("#wallets", async () => {
	expect(subject.wallets()).toBeInstanceOf(WalletService);
});

it("#coin", async () => {
	await expect(subject.coin("ARK", "ark.devnet")).resolves.toBeInstanceOf(Coins.Coin);
});

it("#registerCoin", async () => {
	const env = new Environment({ coins: { ARK }, httpClient: new Request(), storage: new StubStorage() });
	await env.verify(storageData);
	await env.boot();

	env.registerCoin("BTC", BTC);
	expect(() => env.registerCoin("BTC", BTC)).toThrowError(/is already registered/);
});

it("should fail verification", async () => {
	const env = new Environment({ coins: { ARK }, httpClient: new Request(), storage: new StubStorage() });
	await expect(env.verify(corruptedStorageData)).rejects.toThrowError("Terminating due to corrupted state.");
});
