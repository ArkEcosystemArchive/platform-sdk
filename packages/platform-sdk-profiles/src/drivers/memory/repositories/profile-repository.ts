import { v4 as uuidv4 } from "uuid";
import { injectable } from "inversify";
import { IProfileRepository, IProfileExportOptions, IProfile, IProfileInput } from "../../../contracts";

import { Profile } from "../profiles/profile";
import { ProfileFactory } from "../profiles/profile.factory";
import { DataRepository } from "../../../repositories/data-repository";
import { ProfileExporter } from "../profiles/profile.exporter";
import { ProfileImporter } from "../profiles/profile.importer";
import { ProfileDumper } from "../profiles/profile.dumper";
import { ProfileInitialiser } from "../profiles/profile.initialiser";
import { State } from "../../../environment/state";
import { State as Identifiers } from "../../../environment/container.models";

@injectable()
export class ProfileRepository implements IProfileRepository {
	readonly #data: DataRepository;

	public constructor() {
		this.#data = new DataRepository();
	}

	/** {@inheritDoc IProfileRepository.fill} */
	public fill(profiles: object): void {
		for (const [id, profile] of Object.entries(profiles)) {
			this.#data.set(id, new Profile(profile));
		}
	}

	/** {@inheritDoc IProfileRepository.all} */
	public all(): Record<string, IProfile> {
		return this.#data.all() as Record<string, IProfile>;
	}

	/** {@inheritDoc IProfileRepository.first} */
	public first(): IProfile {
		return this.#data.first();
	}

	/** {@inheritDoc IProfileRepository.last} */
	public last(): IProfile {
		return this.#data.last();
	}

	/** {@inheritDoc IProfileRepository.keys} */
	public keys(): string[] {
		return this.#data.keys();
	}

	/** {@inheritDoc IProfileRepository.values} */
	public values(): IProfile[] {
		return this.#data.values();
	}

	/** {@inheritDoc IProfileRepository.findById} */
	public findById(id: string): IProfile {
		if (this.#data.missing(id)) {
			throw new Error(`No profile found for [${id}].`);
		}

		return this.#data.get(id) as IProfile;
	}

	/** {@inheritDoc IProfileRepository.findByName} */
	public findByName(name: string): IProfile | undefined {
		return this.values().find((profile: IProfile) => profile.name().toLowerCase() === name.toLowerCase());
	}

	/** {@inheritDoc IProfileRepository.create} */
	public push(profile: IProfile): void {
		this.#data.set(profile.id(), profile);
	}

	/** {@inheritDoc IProfileRepository.create} */
	public create(name: string): IProfile {
		if (this.findByName(name)) {
			throw new Error(`The profile [${name}] already exists.`);
		}

		const result: IProfile = ProfileFactory.fromName(name);

		this.push(result);

		new ProfileInitialiser(result).initialise(name);

		return result;
	}

	/** {@inheritDoc IProfileRepository.import} */
	public async import(data: string, password?: string): Promise<Profile> {
		const result = new Profile({
			id: uuidv4(),
			name: "",
			password,
			data,
		});

		await new ProfileImporter(result).import(password);

		return result;
	}

	/** {@inheritDoc IProfileRepository.export} */
	public export(profile: IProfile, options: IProfileExportOptions, password?: string): string {
		return new ProfileExporter(profile).export(password, options);
	}

	/** {@inheritDoc IProfileRepository.restore} */
	public async restore(profile: IProfile, password?: string): Promise<void> {
		new ProfileImporter(profile).import(password);
	}

	/** {@inheritDoc IProfileRepository.dump} */
	public dump(profile: IProfile): IProfileInput {
		return new ProfileDumper(profile).dump();
	}

	/** {@inheritDoc IProfileRepository.has} */
	public has(id: string): boolean {
		return this.#data.has(id);
	}

	/** {@inheritDoc IProfileRepository.forget} */
	public forget(id: string): void {
		if (this.#data.missing(id)) {
			throw new Error(`No profile found for [${id}].`);
		}

		this.#data.forget(id);
	}

	/** {@inheritDoc IProfileRepository.flush} */
	public flush(): void {
		this.#data.flush();
	}

	/** {@inheritDoc IProfileRepository.count} */
	public count(): number {
		return this.#data.count();
	}

	/** {@inheritDoc IProfileRepository.focus} */
	public tap<T>(id: string, callback: Function): T {
		const profile = this.findById(id);

		State.profile(profile);

		callback(profile);

		State.forget(Identifiers.Profile);
	}

	/** {@inheritDoc IProfileRepository.toObject} */
	public toObject(): Record<string, object> {
		const result: Record<string, object> = {};
		const profiles: [string, Profile][] = Object.entries(this.#data.all());

		for (const [id, profile] of profiles) {
			result[id] = new ProfileDumper(profile).dump();
		}

		return result;
	}
}
