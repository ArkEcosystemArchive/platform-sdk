import { Hash } from "@arkecosystem/platform-sdk-crypto";

import { IProfile } from "../contracts";
import { State } from "../environment/state";

const passwordKey = (profile: IProfile): string => Hash.sha256(`${profile.id()}/passwd`).toString("hex");

export class MemoryPassword {
	public static get(): string {
		const password: string | undefined = process.env[passwordKey(State.profile())];

		if (password === undefined) {
			throw new Error("Failed to find a password for the given profile.");
		}

		return password;
	}

	public static set(password: string): void {
		process.env[passwordKey(State.profile())] = password;
	}

	public static forget(): void {
		delete process.env[passwordKey(State.profile())];
	}
}
