import { v4 as uuidv4 } from "uuid";

import {
	ProfileData,
	ProfileServiceOptions,
	StorageAdapter,
	StorageDeserializer,
	StorageSerializer,
} from "./contracts";
import { Profile } from "./profile";
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
		const raw: any[] = this.#deserializer(await this.#storage.getItem(this.#key));
		return raw.map((item) => new Profile(item));
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
			id: this.generateId(),
			wallets: [],
			...data,
		});

		profiles.push(profile);

		await this.#storage.setItem(this.#key, this.#serializer(profiles.map((item) => item.toObject())));

		return profile;
	}

	public async forget(id: string): Promise<Profile[]> {
		const profiles = await this.all();
		const filtered = profiles.filter((item: Profile) => item.id() !== id);

		await this.#storage.setItem(this.#key, this.#serializer(filtered.map((item) => item.toObject())));

		return filtered;
	}

	private generateId(): string {
		return uuidv4();
	}
}
