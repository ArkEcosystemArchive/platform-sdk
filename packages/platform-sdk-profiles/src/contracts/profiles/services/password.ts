export interface IPasswordManager {
	/**
	 * Get the password.
	 *
	 * @return {*}  {string}
	 * @memberof IPasswordManager
	 */
	get(): string;

	/**
	 * Set the password.
	 *
	 * @param {string} password
	 * @memberof IPasswordManager
	 */
	set(password: string): void;

	/**
	 * Check if a password has been set.
	 *
	 * @return {*}  {boolean}
	 * @memberof IPasswordManager
	 */
	exists(): boolean;

	/**
	 * Clear password
	 *
	 * @memberof IPasswordManager
	 */
	forget(): void;
}
