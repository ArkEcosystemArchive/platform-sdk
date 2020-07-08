import "jest-extended";

import { ARK } from "@arkecosystem/platform-sdk-ark";
import { readFileSync, writeFileSync } from "fs";
import nock from "nock";
import { resolve } from "path";

import { Environment, Identifiers, Profile } from "../src";
import { identity } from "../test/fixtures/identity";
import { HttpClient } from "../test/stubs/client";
import { container } from "./container";
import { DataRepository } from "./repositories/data-repository";
import { ProfileRepository } from "./repositories/profile-repository";

let subject: Environment;

class StubStorage {
	readonly #storage;

	public constructor() {
		try {
			this.#storage = JSON.parse(readFileSync(resolve(__dirname, "env.json")).toString());
		} catch {
			this.#storage = {};
		}
	}

	public async all(): Promise<object> {
		return this.#storage;
	}

	public async get<T = any>(key: string): Promise<T | undefined> {
		return this.#storage[key];
	}

	public async set(key: string, value: string | object): Promise<void> {
		this.#storage[key] = value;

		writeFileSync(resolve(__dirname, "env.json"), JSON.stringify(this.#storage));
	}

	public async has(key: string): Promise<boolean> {
		return Object.keys(this.#storage).includes(key);
	}

	public async forget(key: string): Promise<void> {
		//
	}

	public async flush(): Promise<void> {
		//
	}

	public async count(): Promise<number> {
		return 0;
	}

	public async snapshot(): Promise<void> {
		//
	}

	public async restore(): Promise<void> {
		//
	}
}

beforeAll(() => {
	nock(/.+/)
		.get("/api/node/configuration/crypto")
		.reply(200, require("../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/node/syncing")
		.reply(200, require("../test/fixtures/client/syncing.json"))
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require("../test/fixtures/client/wallet.json"))
		.persist();

	container.set(Identifiers.HttpClient, new HttpClient());
});

beforeEach(async () => {
	subject = new Environment({ coins: { ARK }, httpClient: new HttpClient(), storage: new StubStorage() });

	await subject.boot();
});

it("should have a profile repository", async () => {
	expect(subject.profiles()).toBeInstanceOf(ProfileRepository);
});

it("should have a data repository", async () => {
	expect(subject.data()).toBeInstanceOf(DataRepository);
});

it("should create a profile with data and persist it when instructed to do so", async () => {
	/**
	 * Save data in the current environment.
	 */

	const profile = subject.profiles().create("John Doe");

	// Create a Contact
	profile.contacts().create("Jane Doe");

	// Create a Wallet
	await profile.wallets().import(identity.mnemonic, ARK, "devnet");

	// Create a Notification
	profile.notifications().push({
		icon: "warning",
		name: "Ledger Update Available",
		body: "...",
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

	const newEnv = new Environment({ coins: { ARK }, httpClient: new HttpClient(), storage: new StubStorage() });
	await newEnv.boot();

	const newProfile = newEnv.profiles().findById(profile.id());

	expect(newProfile).toBeInstanceOf(Profile);
	expect(newProfile.wallets().keys()).toHaveLength(1);
	expect(newProfile.contacts().keys()).toHaveLength(1);
	expect(newProfile.notifications().keys()).toHaveLength(1);
	expect(newProfile.data().all()).toEqual({ key: "value" });
	expect(newProfile.settings().all()).toEqual({ ADVANCED_MODE: "value" });
});
