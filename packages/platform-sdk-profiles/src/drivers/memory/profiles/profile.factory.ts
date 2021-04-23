import { v4 as uuidv4 } from "uuid";
import { IProfile, IProfileFactory } from "../../../contracts";
import { State } from "../../../environment/state";
import { Profile } from "./profile";

export class ProfileFactory implements IProfileFactory {
	public static fromName(name: string): IProfile {
		const result: IProfile = new Profile({ id: uuidv4(), name, data: "" });

		State.profile(result);

		return result;
	}
}
