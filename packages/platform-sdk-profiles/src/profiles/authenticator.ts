import { Bcrypt } from "@arkecosystem/platform-sdk-crypto";
import { MemoryPassword } from "../helpers/password";

import { ProfileContract, ProfileSetting } from "./profile.models";

export class Authenticator {
	readonly #profile;

	public constructor(profile: ProfileContract) {
		this.#profile = profile;
	}

	public setPassword(password: string): void {
		this.#profile.settings().set(ProfileSetting.Password, Bcrypt.hash(password));
		/**
		 * @README!
		 *
		 * For any change on storing/retrieving password from/to memory using `MemoryPassword#get/get`
		 * the below line should be changed accordingly.

		 * See ProfileRepository#toObject `src/repository/profile-repository.ts#L96`
		 */
		MemoryPassword.set(this.#profile, password);
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
