import { v4 as uuidv4 } from "uuid";

import { Profile } from "../profiles/profile";
import { ProfileSetting } from "../profiles/profile.models";
import { DataRepository } from "./data-repository";

export class ProfileRepository {
	readonly #data: DataRepository;

	public constructor() {
		this.#data = new DataRepository();
	}

	public async fill(profiles: object): Promise<void> {
		for (const [id, profile] of Object.entries(profiles)) {
			const result: Profile = new Profile(profile.id);

			result.peers().fill(profile.peers);

			result.notifications().fill(profile.notifications);

			result.data().fill(profile.data);

			result.plugins().fill(profile.plugins);

			result.settings().fill(profile.settings);

			await result.contacts().fill(profile.contacts);

			await Promise.all(
				[...Object.values(profile.wallets)].map((wallet) => result.wallets().restore(wallet as any)),
			);

			this.#data.set(id, result);
		}
	}

	public all(): Record<string, Profile> {
		return this.#data.all() as Record<string, Profile>;
	}

	public first(): Profile {
		return this.#data.first();
	}

	public last(): Profile {
		return this.#data.last();
	}

	public keys(): string[] {
		return this.#data.keys();
	}

	public values(): Profile[] {
		return this.#data.values();
	}

	public findById(id: string): Profile {
		if (this.#data.missing(id)) {
			throw new Error(`No profile found for [${id}].`);
		}

		return this.#data.get(id) as Profile;
	}

	public create(name: string): Profile {
		const profiles: Profile[] = this.values();

		for (const profile of profiles) {
			if (profile.name() === name) {
				throw new Error(`The profile [${name}] already exists.`);
			}
		}

		const id: string = uuidv4();
		const result: Profile = new Profile(id);

		result.settings().set(ProfileSetting.Name, name);
		result.initializeSettings();

		this.#data.set(id, result);

		return result;
	}

	public has(id: string): boolean {
		return this.#data.has(id);
	}

	public forget(id: string): void {
		if (this.#data.missing(id)) {
			throw new Error(`No profile found for [${id}].`);
		}

		this.#data.forget(id);
	}

	public count(): number {
		return this.#data.count();
	}

	public toObject(): Record<string, object> {
		const result: Record<string, object> = {};

		for (const [id, profile] of Object.entries(this.#data.all())) {
			result[id] = profile.toObject();
		}

		return result;
	}
}
