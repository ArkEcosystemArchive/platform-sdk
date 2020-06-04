import "jest-extended";
import nock from "nock";

import { ARK } from "@arkecosystem/platform-sdk-ark";

import { Environment, Profile, Identifiers } from "../src";
import { DataRepository } from "../src/repositories/data-repository";
import { ProfileRepository } from "../src/repositories/profile-repository";
import { HttpClient } from "./stubs/client";
import { container } from "../src/container";
import { identity } from "./__fixtures__/identity";
import { writeFileSync, readFileSync } from "fs";
import { resolve } from "path";

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
		.reply(200, require("./__fixtures__/client/cryptoConfiguration.json"))
		.get("/api/node/syncing")
		.reply(200, require("./__fixtures__/client/syncing.json"))
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require("./__fixtures__/client/wallet.json"))
		.persist();

	container.set(Identifiers.HttpClient, new HttpClient());
});

beforeEach(async () => {
	subject = new Environment({ httpClient: new HttpClient(), storage: new StubStorage() });

	await subject.boot();
});

it("should have a profile repository", async () => {
	expect(subject.profiles()).toBeInstanceOf(ProfileRepository);
});

it("should have a data repository", async () => {
	expect(subject.data()).toBeInstanceOf(DataRepository);
});

it.only("should listen for data modifications, save it and load it", async () => {
	/**
	 * Save data in the current environment.
	 */

	const profile = await subject.profiles().create("John Doe");

	// Create a Contact
	profile.contacts().create({
		name: "Jane Doe",
		addresses: [{ coin: "Ethereum", network: "testnet", address: "TESTNET-ADDRESS" }],
		starred: true,
	});

	// Create a Wallet
	await profile.wallets().create(identity.mnemonic, ARK, "devnet");

	// Create a DataEntry
	profile.data().set("key", "value");

	// Create a Setting
	profile.settings().set("ADVANCED_MODE", "value");

	// Persist the data for the next instance to use.
	await subject.persist();

	/**
	 * Load data that the previous environment instance saved.
	 */

	const newEnv = new Environment({ httpClient: new HttpClient(), storage: new StubStorage() });
	await newEnv.boot();

	const newProfile = newEnv.profiles().get(profile.id());

	expect(newProfile).toBeInstanceOf(Profile);
	expect(newProfile.wallets().keys()).toHaveLength(1);
	expect(newProfile.contacts().keys()).toHaveLength(1);
	expect(newProfile.data().all()).toEqual({ key: "value" });
	expect(newProfile.settings().all()).toEqual({ ADVANCED_MODE: "value" });
});
