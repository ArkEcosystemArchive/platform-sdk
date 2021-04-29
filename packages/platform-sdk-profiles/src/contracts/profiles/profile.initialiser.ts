export interface IProfileInitialiser {
	/**
	 * Flush all data and restore the default settings.
	 *
	 * @private
	 * @param {string} name
	 * @memberof Profile
	 */
	initialise(name: string): void;

	/**
	 * Restore the default settings, including the name of the profile.
	 *
	 * @private
	 * @param {string} name
	 * @memberof Profile
	 */
	initialiseSettings(name: string): void;

	/**
	 * Restore the default data.
	 *
	 * @private
	 * @memberof Profile
	 */
	initialiseData(): void;
}
