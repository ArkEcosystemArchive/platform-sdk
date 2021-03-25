import { Hash } from "@arkecosystem/platform-sdk-crypto";
import { IProfile } from "../contracts";

const passwordKey = (profile: IProfile): string => Hash.sha256(`${profile.id()}/passwd`).toString("hex");

export class MemoryPassword {
	public static get(profile: IProfile): string {
		const password: string | undefined = process.env[passwordKey(profile)];

		if (password === undefined) {
			throw new Error("Failed to find a password for the given profile.");
		}

		return password;
	}

	public static set(profile: IProfile, password: string): void {
		process.env[passwordKey(profile)] = password;
	}

	public static forget(profile: IProfile): void {
		delete process.env[passwordKey(profile)];
	}
}
