import { Bcrypt } from "@arkecosystem/platform-sdk-crypto";

import { ProfileContract, ProfileSetting } from "./profile.models";

export class Authenticator {
	readonly #profile;

	public constructor(profile: ProfileContract) {
		this.#profile = profile;
	}

	public setPassword(password: string): void {
		this.#profile.settings().set(ProfileSetting.Password, Bcrypt.hash(password));
	}

	public verifyPassword(password: string): boolean {
		return Bcrypt.verify(this.#profile.settings().get(ProfileSetting.Password), password);
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
