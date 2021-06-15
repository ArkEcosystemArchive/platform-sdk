import { v4 as uuidv4 } from "uuid";
import { IProfile, IProfileFactory } from "./contracts";
import { Profile } from "./profile";

export class ProfileFactory implements IProfileFactory {
	/** {@inheritDoc IProfileFactory.fromName} */
	public static fromName(name: string): IProfile {
		return new Profile({ id: uuidv4(), name, data: "" });
	}
}
