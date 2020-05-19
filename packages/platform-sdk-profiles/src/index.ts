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
	readonly #storageSerializer: StorageSerializer;
	readonly #storageDeserializer: StorageDeserializer;

	public constructor(options: ProfileServiceOptions) {
		this.#key = options.key || "profiles";
		this.#storage = options.storage.adapter;
		this.#storageSerializer = options.storage.serializer || serializer;
		this.#storageDeserializer = options.storage.deserializer || deserializer;
	}

	public async all(): Promise<Profile[]> {
		return this.#storageDeserializer(await this.#storage.getItem(this.#key));
	}

	public async add(profileModel: ProfileModel): Promise<Profile> {
		// TODO: Validate name and check if it is unique?
		const profile = {
			id: await this.generateId(),
			...profileModel,
		};

		await this.#storage.setItem(this.#key, this.#storageSerializer(profile));

		return profile;
	}

	public async remove(id: string): Promise<Profile[]> {
		const profiles = await this.all();
		const filtered = profiles.filter((item: Profile) => item.id !== id);

		await this.#storage.setItem(this.#key, this.#storageSerializer(filtered));

		return profiles;
	}

	// TODO: Add wallets?

	private async generateId(): Promise<string> {
		return uuidv4();
	}
}
