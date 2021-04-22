import { IProfile, IProfileData, IProfileExportOptions } from "./profile";

export interface IProfileSerialiser {
	/**
	 * Normalise the profile into an object.
	 *
	 * @param {IProfileExportOptions} [options]
	 * @return {IProfileData}
	 * @memberof Profile
	 */
	toJSON(
		profile: IProfile,
		options: IProfileExportOptions,
	): IProfileData;
}
