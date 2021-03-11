import forge from "node-forge";

/**
 *
 *
 * @export
 * @class AES
 */
export class AES {
	public static encrypt(message: string, password: string, salt: string, iv: string): string {
		const derivedKey = forge.pkcs5.pbkdf2(password, salt, 5000, 32);

		const cipher = forge.cipher.createCipher("AES-CBC", derivedKey);
		cipher.start({ iv: forge.util.decode64(iv) });
		cipher.update(forge.util.createBuffer(message));
		cipher.finish();

		return forge.util.encode64(cipher.output.getBytes());
	}

	/**
	 *
	 *
	 * @static
	 * @param {string} cipherText
	 * @param {string} password
	 * @param {string} salt
	 * @param {string} iv
	 * @returns {string}
	 * @memberof AES
	 */
	public static decrypt(cipherText: string, password: string, salt: string, iv: string): string {
		const derivedKey = forge.pkcs5.pbkdf2(password, salt, 5000, 32);

		const decipher = forge.cipher.createDecipher("AES-CBC", derivedKey);
		decipher.start({ iv: forge.util.decode64(iv) });
		decipher.update(forge.util.createBuffer(forge.util.decode64(cipherText)));
		decipher.finish();

		return decipher.output.toString();
	}
}
