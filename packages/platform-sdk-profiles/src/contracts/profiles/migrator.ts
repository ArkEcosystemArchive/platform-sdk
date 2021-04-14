export interface IMigrator {
	migrate(migrations: object, versionToMigrate: string): Promise<void>;
}
