import { v4 as uuidv4 } from "uuid";
import { injectable } from "inversify";
import { IProfileRepository, IProfileExportOptions, IProfile } from "../../../contracts";

import { Profile } from "../profiles/profile";
import { ProfileFactory } from "../profiles/profile.factory";
import { DataRepository } from "../../../repositories/data-repository";
import { ProfileExporter } from "../profiles/profile.exporter";
import { ProfileImporter } from "../profiles/profile.importer";
import { ProfileDumper } from "../profiles/profile.dumper";
import { State } from "../../../environment/state";
import { ProfileInitialiser } from "../profiles/profile.initialiser";

@injectable()
export class ProfileRepository implements IProfileRepository {
	readonly #data: DataRepository;

	/** {@inheritDoc IWalletFactory.generate} */
	public constructor() {
		this.#data = new DataRepository();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public fill(profiles: object): void {
		for (const [id, profile] of Object.entries(profiles)) {
			this.#data.set(id, new Profile(profile));
		}
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public all(): Record<string, IProfile> {
		return this.#data.all() as Record<string, IProfile>;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public first(): IProfile {
		return this.#data.first();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public last(): IProfile {
		return this.#data.last();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public keys(): string[] {
		return this.#data.keys();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public values(): IProfile[] {
		return this.#data.values();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public findById(id: string): IProfile {
		if (this.#data.missing(id)) {
			throw new Error(`No profile found for [${id}].`);
		}

		return this.#data.get(id) as IProfile;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public findByName(name: string): IProfile | undefined {
		return this.values().find((profile: IProfile) => profile.name().toLowerCase() === name.toLowerCase());
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public create(name: string): IProfile {
		if (this.findByName(name)) {
			throw new Error(`The profile [${name}] already exists.`);
		}

		const result: IProfile = ProfileFactory.fromName(name);

		this.#data.set(result.id(), result);

		new ProfileInitialiser(result).initialise(name);

		return result;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public async import(data: string, password?: string): Promise<Profile> {
		const profile = new Profile({
			id: uuidv4(),
			name: "",
			password,
			data,
		});

		await new ProfileImporter(profile).import(password);

		return profile;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public export(profile: IProfile, options: IProfileExportOptions, password?: string): string {
		return new ProfileExporter(profile).export(password, options);
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public async restore(profile: IProfile, password?: string): Promise<void> {
		new ProfileImporter(profile).import(password);
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public has(id: string): boolean {
		return this.#data.has(id);
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public forget(id: string): void {
		if (this.#data.missing(id)) {
			throw new Error(`No profile found for [${id}].`);
		}

		this.#data.forget(id);
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public flush(): void {
		this.#data.flush();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public count(): number {
		return this.#data.count();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public toObject(): Record<string, object> {
		const result: Record<string, object> = {};
		const profiles: [string, Profile][] = Object.entries(this.#data.all());

		for (const [id, profile] of profiles) {
			result[id] = new ProfileDumper(profile).dump();
		}

		return result;
	}
}
