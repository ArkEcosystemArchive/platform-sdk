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
		this.#profile.setRawDataKey("password", encrypted); // This is needed for new profiles

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
