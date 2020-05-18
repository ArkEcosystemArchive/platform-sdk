import { StorageAdapter, ProfileServiceOptions, Profile, StorageSerializer, StorageDeserializer, ProfileModel } from "./interfaces";
import { serializer, deserializer } from "./deser";

export class ProfileService {
	#key: string;
	#storageAdapter: StorageAdapter;
	#storageSerializer: StorageSerializer;
	#storageDeserializer: StorageDeserializer;

	constructor(options: ProfileServiceOptions) {
		this.#key = options.key || "profiles";
		this.#storageAdapter = options.storage.adapter;
		this.#storageSerializer = options.storage.serializer || serializer;
		this.#storageDeserializer = options.storage.deserializer || deserializer;
	}

	public async all(): Promise<Profile[]> {
		const profiles = await this.#storageAdapter.getItem(this.#key);
		return this.#storageDeserializer(profiles);
	}

	public async add(profileModel: ProfileModel): Promise<Profile> {
		// TODO: Validate name and check if it is unique?
		const id = await this.generateId();
		const profile = {
			id,
			...profileModel
		};
		const serialization = this.#storageSerializer(profile);
		await this.#storageAdapter.setItem(this.#key, serialization);
		return profile;
	}

	public async remove(id: string): Promise<Profile[]> {
		const profiles = await this.all();
		const filtered = profiles.filter(item => !item.id);
		const serialization = this.#storageSerializer(filtered);
		await this.#storageAdapter.setItem(this.#key, serialization);
		return profiles;
	}

	// TODO: Add wallets?

	private async generateId(): Promise<string> {
		// TODO
		return Math.random().toString();
	}
}
