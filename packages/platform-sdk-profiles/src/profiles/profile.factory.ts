import { v4 as uuidv4 } from "uuid";

import { Profile } from "./profile";
import { ProfileSetting } from "./profile.models";

export class ProfileFactory {
	public static fromName(name: string): Profile {
		const result: Profile = new Profile({ id: uuidv4(), name: "name", data: "" });

		result.settings().set(ProfileSetting.Name, name);
		result.initializeSettings();

		return result;
	}
}
