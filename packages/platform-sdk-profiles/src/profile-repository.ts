import { Contracts } from "@arkecosystem/platform-sdk";
import { promises } from "fs";
import { v4 as uuidv4 } from "uuid";

import { Storage } from "./contracts";
import { Profile } from "./profile";

export class ProfileRepository {
	readonly #key: string = "profiles";

	readonly #httpClient: Contracts.HttpClient;
	readonly #storage: Storage;

	public constructor({ httpClient, storage }) {
		this.#httpClient = httpClient;
		this.#storage = storage;
	}

	public async all(): Promise<Profile[]> {
		const result: any[] | undefined = await this.#storage.get(this.#key);

		if (!result) {
			return [];
		}

		return Promise.all(
			result.map((profile) =>
				Profile.make({
					...profile,
					httpClient: this.#httpClient,
					storage: this.#storage,
				}),
			),
		);
	}

	public async get(id: string): Promise<Profile> {
		const profiles: Profile[] = await this.all();

		const result: Profile | undefined = profiles.find((item: Profile) => [item.name(), item.id()].includes(id));

		if (!result) {
			throw new Error(`No profile found for [${id}].`);
		}

		return result;
	}

	public async push(name: string): Promise<Profile> {
		const profiles: Profile[] = await this.all();

		for (const profile of profiles) {
			if (profile.name() === name) {
				throw new Error(`The profile [${name}] already exists.`);
			}
		}

		const result: Profile = await Profile.make({
			id: uuidv4(),
			name,
			wallets: [],
			httpClient: this.#httpClient,
			storage: this.#storage,
		});

		profiles.push(result);

		await this.#storage.set(this.#key, await Promise.all(profiles.map((item: Profile) => item.toObject())));

		return result;
	}

	public async forget(id: string): Promise<Profile[]> {
		const profiles: Profile[] = await this.all();

		const result: Profile[] | undefined = profiles.filter((item: Profile) => item.id() !== id);

		if (!result) {
			throw new Error(`No profile found for [${id}].`);
		}

		await this.#storage.set(this.#key, await Promise.all(result.map((item: Profile) => item.toObject())));

		return result;
	}
}
