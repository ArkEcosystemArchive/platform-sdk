import { v4 as uuidv4 } from "uuid";

import { Profile } from "../profile";
import { DataRepository } from "./data-repository";

export class ProfileRepository {
	readonly #data: DataRepository;

	public constructor() {
		this.#data = new DataRepository("app", "profiles");
	}

	public async all(): Promise<Profile[]> {
		const profiles: Profile[] = Object.values({ ...this.#data.all() });

		return Promise.all(profiles.map((profile: any) => this.createProfile(profile.id, profile.name)));
	}

	public get(id: string): Profile {
		if (this.#data.missing(id)) {
			throw new Error(`No profile found for [${id}].`);
		}

		return this.#data.get(id) as Profile;
	}

	public async push(name: string): Promise<Profile> {
		const profiles: Profile[] = await this.all();

		for (const profile of profiles) {
			if (profile.name() === name) {
				throw new Error(`The profile [${name}] already exists.`);
			}
		}

		const id: string = uuidv4();
		const result: Profile = await this.createProfile(id, name);

		this.#data.set(id, result);

		return result;
	}

	public forget(id: string): void {
		if (this.#data.missing(id)) {
			throw new Error(`No profile found for [${id}].`);
		}

		this.#data.forget(id);
	}

	private async createProfile(id: string, name: string): Promise<Profile> {
		const profile: Profile = new Profile(id, name);

		// TODO: load contacts
		// TODO: load wallets
		// TODO: load data
		// TODO: load settings

		return profile;
	}
}
