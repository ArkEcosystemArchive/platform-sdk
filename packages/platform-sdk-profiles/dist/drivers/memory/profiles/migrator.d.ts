import { IMigrator, IProfile } from "../../../contracts";
export declare class Migrator implements IMigrator {
	#private;
	constructor(profile: IProfile);
	/** {@inheritDoc IMigrator.migrate} */
	migrate(migrations: object, versionToMigrate: string): Promise<void>;
}
