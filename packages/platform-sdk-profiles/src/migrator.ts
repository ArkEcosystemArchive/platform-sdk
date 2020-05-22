import { get, set } from "dot-prop";
import semver from "semver";

import { Storage } from "./contracts";
import { Data } from "./data";
import { Profiles } from "./profiles";

export class Migrator {
	readonly #data: Data;
	readonly #profiles: Profiles;
	readonly #storage: Storage;
	readonly #namespace: string = "migrations";

	public constructor({ data, profiles, storage }: { data: Data; profiles: Profiles; storage: Storage }) {
		this.#data = data;
		this.#profiles = profiles;
		this.#storage = storage;
	}

	public async migrate(migrations: object, versionToMigrate: string): Promise<void> {
		let previousMigratedVersion: string = await this.getPreviousMigratedVersion("0.0.0");

		const newerVersions: string[] = Object.keys(migrations).filter((candidateVersion) =>
			this.shouldPerformMigration(candidateVersion, previousMigratedVersion, versionToMigrate),
		);

		for (const version of newerVersions) {
			try {
				await this.#storage.snapshot();

				await migrations[version]({ data: this.#data, profiles: this.#profiles });

				await this.set(version);

				previousMigratedVersion = version;
			} catch (error) {
				await this.#storage.restore();

				throw new Error(
					`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${error}`,
				);
			}
		}

		if (
			this.isVersionInRangeFormat(previousMigratedVersion) ||
			!semver.eq(previousMigratedVersion, versionToMigrate)
		) {
			await this.set(versionToMigrate);
		}
	}

	private isVersionInRangeFormat(version: string): boolean {
		return semver.clean(version) === null;
	}

	private shouldPerformMigration(
		candidateVersion: string,
		previousMigratedVersion: string,
		versionToMigrate: string,
	): boolean {
		if (this.isVersionInRangeFormat(candidateVersion)) {
			if (previousMigratedVersion !== "0.0.0" && semver.satisfies(previousMigratedVersion, candidateVersion)) {
				return false;
			}

			return semver.satisfies(versionToMigrate, candidateVersion);
		}

		if (semver.lte(candidateVersion, previousMigratedVersion)) {
			return false;
		}

		if (semver.gt(candidateVersion, versionToMigrate)) {
			return false;
		}

		return true;
	}

	private async set(migration: string): Promise<void> {
		const result: object = (await this.#storage.get(this.#namespace)) || {};

		set(result, "latest", migration);

		await this.#storage.set(this.#namespace, result);
	}

	private async getPreviousMigratedVersion(defaultVersion: string): Promise<string> {
		return get(this.#storage.get(this.#namespace), "latest", defaultVersion);
	}
}
