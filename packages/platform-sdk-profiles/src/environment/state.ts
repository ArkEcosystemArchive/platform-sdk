import { Exceptions } from "@arkecosystem/platform-sdk";

import { IProfile } from "../contracts";
import { container } from "./container";
import { State as Identifiers } from "./container.models";

export class State {
	/**
	 * Get or set the active profile.
	 *
	 * @static
	 * @param {IProfile} [instance]
	 * @return {*}  {IProfile}
	 * @memberof State
	 */
	public static profile(instance?: IProfile): IProfile {
		if (instance !== undefined) {
			if (container.has(Identifiers.Profile)) {
				container.rebind(Identifiers.Profile, instance);
			} else {
				container.bind(Identifiers.Profile, instance);
			}
		}

		if (container.missing(Identifiers.Profile)) {
			throw new Exceptions.BadStateException("profile", "There is no active profile.");
		}

		return container.get(Identifiers.Profile);
	}

	/**
	 * Forget the given key.
	 *
	 * @static
	 * @memberof State
	 */
	public static reset(): void {
		if (container.missing(Identifiers.Profile)) {
			throw new Exceptions.BadStateException("forget", "There is no active profile.");
		}

		container.unbind(Identifiers.Profile);
	}
}
