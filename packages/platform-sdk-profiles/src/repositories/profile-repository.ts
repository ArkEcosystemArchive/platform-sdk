import { Contracts } from "@arkecosystem/platform-sdk";
import { inject, injectable } from "inversify";
import { v4 as uuidv4 } from "uuid";

import { Identifiers, ProfileFactory, Storage } from "../contracts";
import { Profile } from "../profile";

@injectable()
export class ProfileRepository {
	readonly #key: string = "profiles";

	@inject(Identifiers.HttpClient)
	private readonly httpClient!: Contracts.HttpClient;

	@inject(Identifiers.Storage)
	private readonly storage!: Storage;

	@inject(Identifiers.ProfileFactory)
	private readonly createProfileFactory!: ProfileFactory;

	public async all(): Promise<Profile[]> {
		const result: any[] | undefined = await this.storage.get(this.#key);

		if (!result) {
			return [];
		}

		return Promise.all(result.map((profile) => this.createProfileFactory(profile.id, profile.name)));
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

		const result: Profile = this.createProfileFactory(uuidv4(), name);

		profiles.push(result);

		await this.storage.set(this.#key, await Promise.all(profiles.map((item: Profile) => item.toObject())));

		return result;
	}

	public async forget(id: string): Promise<Profile[]> {
		const profiles: Profile[] = await this.all();

		const result: Profile[] | undefined = profiles.filter((item: Profile) => item.id() !== id);

		if (!result) {
			throw new Error(`No profile found for [${id}].`);
		}

		await this.storage.set(this.#key, await Promise.all(result.map((item: Profile) => item.toObject())));

		return result;
	}
}
