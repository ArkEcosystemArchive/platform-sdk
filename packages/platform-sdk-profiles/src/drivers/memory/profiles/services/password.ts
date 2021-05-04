import { Hash } from "@arkecosystem/platform-sdk-crypto";
import { IProfile } from "../../../../contracts";
import { IPasswordManager } from "../../../../contracts/profiles/services/password";

export class PasswordManager implements IPasswordManager {
	readonly #profile: IProfile;

	public constructor(profile: IProfile) {
		this.#profile = profile;
	}

	public get(): string {
		const password: string | undefined = process.env[this.passwordKey()];

		if (password === undefined) {
			throw new Error("Failed to find a password for the given profile.");
		}

		return password;
	}

	public set(password: string): void {
		process.env[this.passwordKey()] = password;
	}

	public exists(): boolean {
		return process.env[this.passwordKey()] !== undefined;
	}

	public forget(): void {
		delete process.env[this.passwordKey()];
	}

	private passwordKey(): string {
		return Hash.sha256(`${this.#profile.id()}/passwd`).toString("hex");
	}
}
