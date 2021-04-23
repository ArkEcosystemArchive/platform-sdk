import { IProfile, IProfileInput } from "../../../contracts";
import { IProfileDumper } from "../../../contracts/profiles/profile.dumper";

export class ProfileDumper implements IProfileDumper {
	/**
	 * Dumps the profile into a standardised object.
	 *
	 * @param {IProfile} profile
	 * @return {IProfileInput}
	 * @memberof ProfileDumper
	 */
	public dump(profile: IProfile): IProfileInput {
		if (!profile.getAttributes().get<string>('data')) {
			throw new Error(`The profile [${profile.name()}] has not been encoded or encrypted. Please call [save] before dumping.`);
		}

		return {
			id: profile.id(),
			name: profile.name(),
			avatar: profile.avatar(),
			password: profile.getAttributes().get<string>('password'),
			data: profile.getAttributes().get<string>('data'),
		};
	}
}
