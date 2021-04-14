import "jest-extended";
import "reflect-metadata";

import { resolve } from "path";
import { Coins } from "@arkecosystem/platform-sdk";
import { ARK } from "@arkecosystem/platform-sdk-ark";
import { BTC } from "@arkecosystem/platform-sdk-btc";
import { ETH } from "@arkecosystem/platform-sdk-eth";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import { removeSync } from "fs-extra";
import nock from "nock";

import storageData from "../../test/fixtures/env-storage.json";
import { identity } from "../../test/fixtures/identity";
import { StubStorage } from "../../test/stubs/storage";
import { Profile } from "../drivers/memory/profiles/profile";
import { ProfileRepository } from "../drivers/memory/repositories/profile-repository";
import { ExchangeRateService } from "../drivers/memory/services/exchange-rate-service";
import { WalletService } from "../drivers/memory/services/wallet-service";
import { DataRepository } from "../repositories/data-repository";
import { container } from "./container";
import { Identifiers } from "./container.models";
import { Environment } from "./env";
import { MemoryStorage } from "./storage/memory";

let subject: Environment;

const makeSubject = async (): Promise<void> => {
	subject = new Environment({ coins: { ARK, BTC, ETH }, httpClient: new Request(), storage: new StubStorage() });
	await subject.verify();
	await subject.boot();
	await subject.persist();
};

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
		.reply(200, require("../../test/fixtures/client/delegates-1.json"))
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
});

beforeEach(async () => {
	removeSync(resolve(__dirname, "../../test/stubs/env.json"));

	container.flush();
});

it("should have a profile repository", async () => {
	await makeSubject();

	expect(subject.profiles()).toBeInstanceOf(ProfileRepository);
});

it("should have a data repository", async () => {
	await makeSubject();

	expect(subject.data()).toBeInstanceOf(DataRepository);
});

it("should have available networks", async () => {
	await makeSubject();

	const coins: Record<string, Coins.CoinSpec> = { ARK, BTC, ETH };

	for (const network of subject.availableNetworks()) {
		expect(network.toObject()).toEqual(coins[network.coin()].manifest.networks[network.id()]);
	}
});

it("should create a profile with data and persist it when instructed to do so", async () => {
	await makeSubject();

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

	// Encode all data
	profile.save();

	// Create a Global DataEntry
	subject.data().set("key", "value");

	// Persist the data for the next instance to use.
	await subject.persist();

	/**
	 * Load data that the previous environment instance saved.
	 */

	container.flush();

	const newEnv = new Environment({ coins: { ARK }, httpClient: new Request(), storage: new StubStorage() });
	await newEnv.verify();
	await newEnv.boot();

	const newProfile = newEnv.profiles().findById(profile.id());

	expect(newProfile).toBeInstanceOf(Profile);

	await newProfile.restore();
	await newProfile.sync();

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

	const newProfile = env.profiles().findById("8101538b-b13a-4b8d-b3d8-e710ccffd385");

	await newProfile.restore();

	expect(newProfile).toBeInstanceOf(Profile);
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

	const restoredWallet = newProfile.wallets().first();
	expect(restoredWallet.settings().all()).toEqual({
		AVATAR:
			'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="picasso" width="100" height="100" viewBox="0 0 100 100"><style>.picasso circle{mix-blend-mode:soft-light;}</style><rect fill="rgb(233, 30, 99)" width="100" height="100"/><circle r="50" cx="60" cy="40" fill="rgb(139, 195, 74)"/><circle r="45" cx="0" cy="30" fill="rgb(0, 188, 212)"/><circle r="40" cx="90" cy="50" fill="rgb(255, 193, 7)"/></svg>',
	});

	expect(restoredWallet.alias()).toBe(undefined);
});

it("should boot with empty storage data", async () => {
	const env = new Environment({ coins: { ARK }, httpClient: new Request(), storage: new StubStorage() });

	await expect(env.verify({ profiles: storageData.profiles, data: {} })).resolves.toBeUndefined();
	await expect(env.boot()).resolves.toBeUndefined();
});

it("should boot with empty storage profiles", async () => {
	const env = new Environment({ coins: { ARK }, httpClient: new Request(), storage: new StubStorage() });

	await expect(env.verify({ profiles: {}, data: { key: "value" } })).resolves.toBeUndefined();
	await expect(env.boot()).resolves.toBeUndefined();
});

it("should boot with exchange service data", async () => {
	const env = new Environment({ coins: { ARK }, httpClient: new Request(), storage: new StubStorage() });

	await container.get<Storage>(Identifiers.Storage).set("EXCHANGE_RATE_SERVICE", {});

	await expect(env.verify({ profiles: {}, data: {} })).resolves.toBeUndefined();
	await expect(env.boot()).resolves.toBeUndefined();
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
	await makeSubject();

	expect(subject.coins().values()).toEqual([]);
});

it("#exchangeRates", async () => {
	await makeSubject();

	expect(subject.exchangeRates()).toBeInstanceOf(ExchangeRateService);
});

it("#fees", async () => {
	await makeSubject();

	await subject.fees().sync("ARK", "ark.devnet");
	expect(Object.keys(subject.fees().all("ARK", "ark.devnet"))).toHaveLength(11);
});

it("#delegates", async () => {
	await makeSubject();

	await subject.delegates().sync("ARK", "ark.devnet");
	expect(subject.delegates().all("ARK", "ark.devnet")).toHaveLength(200);
});

it("#knownWallets", async () => {
	await makeSubject();

	await subject.knownWallets().syncAll();
	expect(subject.knownWallets().is("ark.devnet", "unknownWallet")).toBeFalse();
});

it("#wallets", async () => {
	await makeSubject();

	expect(subject.wallets()).toBeInstanceOf(WalletService);
});

it("#coin", async () => {
	await makeSubject();

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

	// @ts-ignore
	await expect(env.verify({ profiles: [], data: {} })).rejects.toThrowError(
		'Terminating due to corrupted state: ValidationError: "profiles" must be of type object',
	);
});

it("should create a profile with password and persist", async () => {
	await makeSubject();

	const profile = subject.profiles().create("John Doe");
	profile.auth().setPassword("password");
	expect(() => subject.persist()).not.toThrowError();
});

it("should flush all bindings", async () => {
	container.bind("test", true);
	subject.reset();
	expect(() => container.get("test")).toThrow();
});

it("should flush all bindings and rebind them", async () => {
	await makeSubject();

	expect(() => container.get(Identifiers.Storage)).not.toThrow();

	subject.reset({ coins: { ARK, BTC, ETH }, httpClient: new Request(), storage: new StubStorage() });

	expect(() => container.get(Identifiers.Storage)).not.toThrow();
});

it("should persist the env and restore it", async () => {
	// Create initial environment
	await makeSubject();

	const john = subject.profiles().create("John");
	await john.wallets().importByMnemonic(identity.mnemonic, "ARK", "ark.devnet");
	john.save();

	const jane = subject.profiles().create("Jane");
	jane.auth().setPassword("password");
	jane.save("password");

	const jack = subject.profiles().create("Jack");
	jack.auth().setPassword("password");
	jack.save("password");

	await subject.persist();

	// Boot new env after we persisted the data
	subject.reset({ coins: { ARK, BTC, ETH }, httpClient: new Request(), storage: new StubStorage() });
	await subject.verify();
	await subject.boot();

	// Assert that we got back what we dumped in the previous env
	const restoredJohn = subject.profiles().findById(john.id());
	await restoredJohn.restore();
	await restoredJohn.sync();

	const restoredJane = subject.profiles().findById(jane.id());
	await restoredJane.restore("password");
	await restoredJane.sync();

	const restoredJack = subject.profiles().findById(jack.id());
	await restoredJack.restore("password");
	await restoredJack.sync();

	expect(restoredJohn.toObject()).toEqual(john.toObject());
	expect(restoredJane.toObject()).toEqual(jane.toObject());
	expect(restoredJack.toObject()).toEqual(jack.toObject());
});
