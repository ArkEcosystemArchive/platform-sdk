import { IProfile, IProfileFactory } from "../../../contracts";
import { Events } from "../events";
import { communicate } from "../helpers";
import { Profile } from "./profile";

export class ProfileFactory implements IProfileFactory {
	public static fromName(name: string): IProfile {
		// @TODO: we need to make this (and other) methods async to be able to communicate with main

		return new Profile(await communicate(Events.ProfileFactory.fromName, { name }));
	}
}
