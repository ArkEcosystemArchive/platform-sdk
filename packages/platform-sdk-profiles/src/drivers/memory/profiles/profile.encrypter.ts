import { Base64, PBKDF2 } from "@arkecosystem/platform-sdk-crypto";
import { IProfile, IProfileData } from "../../../contracts";
import { IProfileEncrypter } from "../../../contracts/profiles/profile.encrypter";
import { MemoryPassword } from "../../../helpers/password";

export class ProfileEncrypter implements IProfileEncrypter {
	readonly #profile: IProfile;

	public constructor(profile: IProfile) {
		this.#profile = profile;
	}

	/** {@inheritDoc IProfileEncrypter.encrypt} */
	public encrypt(unencrypted: string, password?: string): string {
		if (typeof password !== "string") {
			password = MemoryPassword.get();
		}

		if (!this.#profile.auth().verifyPassword({ profile: this.#profile, password })) {
			throw new Error("The password did not match our records.");
		}

		return PBKDF2.encrypt(unencrypted, password);
	}

	/** {@inheritDoc IProfileEncrypter.decrypt} */
	public decrypt(password: string): IProfileData {
		if (!this.#profile.usesPassword()) {
			throw new Error("This profile does not use a password but password was passed for decryption");
		}

		const { id, data } = JSON.parse(
			PBKDF2.decrypt(Base64.decode(this.#profile.getAttributes().get<string>("data")), password),
		);

		return { id, ...data };
	}
}
