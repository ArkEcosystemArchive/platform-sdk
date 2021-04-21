/**
 * Defines the implementation contract for the migrator.
 *
 * @export
 * @interface IMigrator
 */
export interface IMigrator {
	/**
	 * Applies migrations to the currently selected profile.
	 *
	 * @param {object} migrations
	 * @param {string} versionToMigrate
	 * @return {*}  {Promise<void>}
	 * @memberof IMigrator
	 */
	migrate(migrations: object, versionToMigrate: string): Promise<void>;
}
