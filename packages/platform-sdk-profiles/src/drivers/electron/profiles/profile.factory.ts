import { IProfile, IProfileFactory } from "../../../contracts";
import { Events } from "../events";
import { communicate } from "../helpers";
import { Profile } from "./profile";

export class ProfileFactory implements IProfileFactory {
	public static async fromName(name: string): Promise<IProfile> {
		return new Profile(await communicate(Events.ProfileFactory.fromName, { name }));
	}

	public static async fromId(id: string): Promise<IProfile> {
		return new Profile(await communicate(Events.ProfileFactory.fromId, { id }));
	}
}
