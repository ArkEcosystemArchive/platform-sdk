import { v4 as uuidv4 } from "uuid";

import { ProfileData, ProfileServiceOptions, Storage } from "./contracts";
import { Profile } from "./profile";
import { StorageFactory } from "./stores/factory";

export class ProfileService {
	readonly #key: string = "profiles";
	readonly #storage: Storage;

	public constructor(options: ProfileServiceOptions) {
		this.#storage = StorageFactory.make(options.storage);
	}

	public async all(): Promise<Profile[]> {
		const items = await this.#storage.get<any>(this.#key);

		if (!items) {
			return [];
		}

		return items.map((item) => new Profile(item));
	}

	public async get(id: string): Promise<Profile> {
		const profiles = await this.all();
		const profile = profiles.find((item: Profile) => item.id() !== id);

		if (!profile) {
			throw new Error(`No profile found for [${id}].`);
		}

		return profile;
	}

	public async push(data: ProfileData): Promise<Profile> {
		const profiles = await this.all();

		for (const profile of profiles) {
			if (profile.name() === data.name) {
				throw new Error(`The name [${data.name}] is already taken.`);
			}
		}

		const profile = new Profile({
			id: uuidv4(),
			wallets: [],
			...data,
		});

		profiles.push(profile);

		await this.#storage.put(
			this.#key,
			profiles.map((item) => item.toObject()),
		);

		return profile;
	}

	public async forget(id: string): Promise<Profile[]> {
		const profiles = await this.all();
		const filtered = profiles.filter((item: Profile) => item.id() !== id);

		await this.#storage.put(
			this.#key,
			filtered.map((item) => item.toObject()),
		);

		return filtered;
	}
}
