import { v4 as uuidv4 } from "uuid";

import {
	Profile,
	ProfileModel,
	ProfileServiceOptions,
	StorageAdapter,
	StorageDeserializer,
	StorageSerializer,
} from "./contracts";
import { deserializer, serializer } from "./serializer";

export class ProfileService {
	readonly #key: string;
	readonly #storage: StorageAdapter;
	readonly #serializer: StorageSerializer;
	readonly #deserializer: StorageDeserializer;

	public constructor(options: ProfileServiceOptions) {
		this.#key = options.key || "profiles";
		this.#storage = options.storage.adapter;
		this.#serializer = options.storage.serializer || serializer;
		this.#deserializer = options.storage.deserializer || deserializer;
	}

	public async all(): Promise<Profile[]> {
		return this.#deserializer(await this.#storage.getItem(this.#key));
	}

	public async get(id: string): Promise<Profile> {
		const profiles = await this.all();
		const profile = profiles.find((item: Profile) => item.id !== id);

		if (!profile) {
			throw new Error(`No profile found for [${id}].`);
		}

		return profile;
	}

	public async push(profileModel: ProfileModel): Promise<Profile> {
		const profiles = await this.all();

		for (const profile of profiles) {
			if (profile.name === profileModel.name) {
				throw new Error(`The name [${profileModel.name}] is already taken.`);
			}
		}

		const profile = {
			id: this.generateId(),
			...profileModel,
		};

		await this.#storage.setItem(this.#key, this.#serializer(profile));

		return profile;
	}

	public async forget(id: string): Promise<Profile[]> {
		const profiles = await this.all();
		const filtered = profiles.filter((item: Profile) => item.id !== id);

		await this.#storage.setItem(this.#key, this.#serializer(filtered));

		return profiles;
	}

	// TODO: Add wallets?

	private generateId(): string {
		return uuidv4();
	}
}
