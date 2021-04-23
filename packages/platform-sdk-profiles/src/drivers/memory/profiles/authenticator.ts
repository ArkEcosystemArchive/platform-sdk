import { Bcrypt } from "@arkecosystem/platform-sdk-crypto";

import { MemoryPassword } from "../../../helpers/password";
import { IAuthenticator, ProfileSetting } from "../../../contracts";
import { State } from "../../../environment/state";
import { emitProfileChanged } from "../helpers";

export class Authenticator implements IAuthenticator {
	/** {@inheritDoc IAuthenticator.setPassword} */
	public setPassword(password: string): void {
		const encrypted: string = Bcrypt.hash(password);

		State.profile().settings().set(ProfileSetting.Password, encrypted);

		// This is needed for new profiles because they are initialised
		// without any data besides their ID and name which means the
		// password will be omitted and we won't know to use it.
		State.profile().getAttributes().set("password", encrypted);

		// We'll need the password for future use in plain-text
		// during the lifetime of this profile session.
		MemoryPassword.set(password);

		emitProfileChanged();
	}

	/** {@inheritDoc IAuthenticator.verifyPassword} */
	public verifyPassword(password: string): boolean {
		if (!State.profile().usesPassword()) {
			throw new Error("No password is set.");
		}

		return Bcrypt.verify(State.profile().getAttributes().get("password"), password);
	}

	/** {@inheritDoc IAuthenticator.changePassword} */
	public changePassword(oldPassword: string, newPassword: string): void {
		const currentPassword: string | undefined = State.profile().settings().get(ProfileSetting.Password);

		if (!currentPassword) {
			throw new Error("No password is set. Call [setPassword] instead.");
		}

		if (!Bcrypt.verify(currentPassword, oldPassword)) {
			throw new Error("The current password does not match.");
		}

		this.setPassword(newPassword);
	}
}
