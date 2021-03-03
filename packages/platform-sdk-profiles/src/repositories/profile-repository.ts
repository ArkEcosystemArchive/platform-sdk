import { Profile } from "../profiles/profile";
import { ProfileFactory } from "../profiles/profile.factory";
import { ProfileExportOptions } from "../profiles/profile.models";
import { DataRepository } from "./data-repository";

export class ProfileRepository {
	readonly #data: DataRepository;

	public constructor() {
		this.#data = new DataRepository();
	}

	public fill(profiles: object): void {
		for (const [id, profile] of Object.entries(profiles)) {
			this.#data.set(id, new Profile(profile));
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

	public findByName(name: string): Profile | undefined {
		return this.values().find((profile: Profile) => profile.name().toLowerCase() === name.toLowerCase());
	}

	public create(name: string): Profile {
		if (this.findByName(name)) {
			throw new Error(`The profile [${name}] already exists.`);
		}

		const result: Profile = ProfileFactory.fromName(name);

		this.#data.set(result.id(), result);

		return result;
	}

	// public import(data: string): void {
	// 	ProfileImportExport.import(data);
	// }

	public export(profile: Profile, options: ProfileExportOptions, password?: string): string {
		return profile.export(password, options);
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

	public flush(): void {
		this.#data.flush();
	}

	public count(): number {
		return this.#data.count();
	}

	public toObject(): Record<string, object> {
		const result: Record<string, object> = {};
		const profiles: [string, Profile][] = Object.entries(this.#data.all());

		for (const [id, profile] of profiles) {
			result[id] = profile.dump();
		}

		return result;
	}
}
