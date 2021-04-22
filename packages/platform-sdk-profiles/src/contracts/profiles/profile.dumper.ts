import { IProfile, IProfileInput } from "./profile";

export interface IProfileDumper {
	/**
	 * Dumps the profile into a standardised object.
	 *
	 * @param {IProfile} profile
	 * @return {IProfileInput}
	 * @memberof ProfileDumper
	 */
	dump(profile: IProfile): IProfileInput;
}
