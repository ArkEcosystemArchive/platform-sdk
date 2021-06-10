/**
 * Defines the implementation contract for the authentication service.
 *
 * @export
 * @interface IAuthenticator
 */
export interface IAuthenticator {
	/**
	 * Set a password for the currently selected profile.
	 *
	 * @param {string} password
	 * @memberof IAuthenticator
	 */
	setPassword(password: string): void;
	/**
	 * Verify the password for the currently selected profile.
	 *
	 * @param {string} password
	 * @return {boolean}
	 * @memberof IAuthenticator
	 */
	verifyPassword(password: string): boolean;
	/**
	 * Change the password for the currently selected profile.
	 *
	 * @param {string} oldPassword
	 * @param {string} newPassword
	 * @memberof IAuthenticator
	 */
	changePassword(oldPassword: string, newPassword: string): void;
}
