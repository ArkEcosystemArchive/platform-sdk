import { IPasswordManager } from "../../../../contracts/profiles/services/password";

export class PasswordManager implements IPasswordManager {
	#password: string | undefined;

	/** {@inheritDoc IPasswordManager.get} */
	public get(): string {
		if (this.#password === undefined) {
			throw new Error("Failed to find a password for the given profile.");
		}

		return this.#password;
	}

	/** {@inheritDoc IPasswordManager.set} */
	public set(password: string): void {
		this.#password = password;
	}

	/** {@inheritDoc IPasswordManager.exists} */
	public exists(): boolean {
		return this.#password !== undefined;
	}

	/** {@inheritDoc IPasswordManager.forget} */
	public forget(): void {
		this.#password = undefined;
	}
}
