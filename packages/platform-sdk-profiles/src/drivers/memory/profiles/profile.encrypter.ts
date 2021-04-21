import { Base64, PBKDF2 } from "@arkecosystem/platform-sdk-crypto";
import { IProfile, IProfileData, IProfileInput } from "../../../contracts";
import { MemoryPassword } from "../../../helpers/password";

export class ProfileEncrypter {
	readonly #profile: IProfile;

	public constructor(profile: IProfile) {
		this.#profile = profile;
	}

	/**
	 * Attempt to encrypt the profile data with the given password.
	 *
	 * @param unencrypted The JSON string to encrypt
	 * @param password? A hard-to-guess password to encrypt the contents.
	 */
	public encrypt(unencrypted: string, password?: string): string {
		if (typeof password !== "string") {
			password = MemoryPassword.get();
		}

		if (!this.#profile.auth().verifyPassword(password)) {
			throw new Error("The password did not match our records.");
		}

		return PBKDF2.encrypt(unencrypted, password);
	}

	/**
	 * Attempt to decrypt the profile data with the given password.
	 *
	 * @param password A hard-to-guess password to decrypt the contents.
	 */
	public decrypt(password: string): IProfileData {
		if (!this.#profile.usesPassword()) {
			throw new Error("This profile does not use a password but password was passed for decryption");
		}

		const { id, data } = JSON.parse(PBKDF2.decrypt(Base64.decode(this.#profile.getAttributes().get<IProfileInput>('data').data), password));

		return { id, ...data };
	}
}
