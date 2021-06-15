import { IProfileData } from "./contracts";

export interface IProfileEncrypter {
	/**
	 * Attempt to encrypt the profile data with the given password.
	 *
	 * @param unencrypted The JSON string to encrypt
	 * @param password? A hard-to-guess password to encrypt the contents.
	 */
	encrypt(unencrypted: string, password?: string): string;

	/**
	 * Attempt to decrypt the profile data with the given password.
	 *
	 * @param password A hard-to-guess password to decrypt the contents.
	 */
	decrypt(password: string): IProfileData;
}
