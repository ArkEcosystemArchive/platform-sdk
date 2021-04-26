export interface IProfileImporter {
	/**
	 * Restore a profile from either a base64 raw or base64 encrypted string.
	 *
	 * @param {string} [password]
	 * @returns {Promise<void>}
	 * @memberof Profile
	 */
	import(password?: string): Promise<void>;
}
