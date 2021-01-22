import { Bcrypt } from "@arkecosystem/platform-sdk-crypto";

import { MemoryPassword } from "../helpers/password";
import { ProfileContract, ProfileSetting } from "./profile.models";

export class Authenticator {
	readonly #profile;

	public constructor(profile: ProfileContract) {
		this.#profile = profile;
	}

	public setPassword(password: string): void {
		const encrypted: string = Bcrypt.hash(password);

		this.#profile.settings().set(ProfileSetting.Password, encrypted);

		// This is needed for new profiles because they are initialised
		// without any data besides their ID and name which means the
		// password will be omitted and we won't know to use it.
		this.#profile.setRawDataKey("password", encrypted);

		// When the password gets changed we need to re-encrypt the
		// data of the profile or we could end up with a corrupted
		// profile that can no longer be used or restored.
		this.#profile.encrypt(password);

		// We'll need the password for future use in plain-text
		// during the lifetime of this profile session.
		MemoryPassword.set(this.#profile, password);
	}

	public verifyPassword(password: string): boolean {
		if (!this.#profile.usesPassword()) {
			throw new Error("No password is set.");
		}

		return Bcrypt.verify(this.#profile.getRawData().password, password);
	}

	public changePassword(oldPassword: string, newPassword: string): void {
		const currentPassword: string | undefined = this.#profile.settings().get(ProfileSetting.Password);

		if (!currentPassword) {
			throw new Error("No password is set. Call [setPassword] instead.");
		}

		if (!Bcrypt.verify(currentPassword, oldPassword)) {
			throw new Error("The current password does not match.");
		}

		this.setPassword(newPassword);
	}
}
