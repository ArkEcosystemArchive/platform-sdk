import { IProfileData } from "./profile";

export interface IProfileValidator {
	/**
	 * Validate the profile data
	 *
	 * @param {IProfileData} [data]
	 * @return {IProfileData}
	 * @memberof Profile
	 */
	validate(data: IProfileData): IProfileData;
}
