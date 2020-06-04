import { v4 as uuidv4 } from "uuid";

import { Profile } from "../profile";
import { DataRepository } from "./data-repository";

export class ProfileRepository {
	readonly #data: DataRepository;

	public constructor() {
		this.#data = new DataRepository();
	}

	public async fill(profiles: object): Promise<void> {
		for (const [id, profile] of Object.entries(profiles)) {
			const result: Profile = new Profile(profile.id, profile.name);

			for (const wallet of Object.values(profile.wallets)) {
				await result.wallets().createFromObject(wallet as any);
			}

			result.contacts().fill(profile.contacts);
			result.data().fill(profile.data);
			result.settings().fill(profile.settings);

			this.#data.set(id, result);
		}
	}

	public async all(): Promise<Profile[]> {
		const profiles: Profile[] = Object.values(this.#data.all());

		return Promise.all(profiles.map((profile: any) => new Profile(profile.id, profile.name)));
	}

	public get(id: string): Profile {
		if (this.#data.missing(id)) {
			throw new Error(`No profile found for [${id}].`);
		}

		return this.#data.get(id) as Profile;
	}

	public async create(name: string): Promise<Profile> {
		const profiles: Profile[] = await this.all();

		for (const profile of profiles) {
			if (profile.name() === name) {
				throw new Error(`The profile [${name}] already exists.`);
			}
		}

		const id: string = uuidv4();
		const result: Profile = new Profile(id, name);

		this.#data.set(id, result);

		return result;
	}

	public forget(id: string): void {
		if (this.#data.missing(id)) {
			throw new Error(`No profile found for [${id}].`);
		}

		this.#data.forget(id);
	}

	public toObject(): Record<string, object> {
		const result: Record<string, object> = {};

		for (const [id, profile] of Object.entries(this.#data.all())) {
			result[id] = profile.toObject();
		}

		return result;
	}
}
