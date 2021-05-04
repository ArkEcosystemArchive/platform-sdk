export interface IPasswordManager {
	/**
	 * Get the password of the profile.
	 *
	 * @return {*}  {string}
	 * @memberof IPasswordManager
	 */
	get(): string;

	/**
	 *
	 *
	 * @param {string} password
	 * @memberof IPasswordManager
	 */
	set(password: string): void;

	/**
	 *
	 *
	 * @return {*}  {boolean}
	 * @memberof IPasswordManager
	 */
	exists(): boolean;
}
