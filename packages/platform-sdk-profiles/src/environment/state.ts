import { Exceptions } from "@arkecosystem/platform-sdk";

import { IProfile } from "../contracts";
import { container } from "./container";
import { State as Identifiers } from "./container.models";

export class State {
	/**
	 * Get or set the active profile.
	 *
	 * @returns {IProfile}
	 */
	public static profile(instance?: IProfile): IProfile {
		if (instance !== undefined) {
			if (container.has(Identifiers.Profile)) {
				container.rebind(Identifiers.Profile, instance);
			} else {
				container.bind(Identifiers.Profile, instance);
			}
		}

		const profile: IProfile | undefined = container.get(Identifiers.Profile);

		if (profile === undefined) {
			throw new Exceptions.BadStateException("useProfile", "There is no active profile");
		}

		return profile;
	}
}
