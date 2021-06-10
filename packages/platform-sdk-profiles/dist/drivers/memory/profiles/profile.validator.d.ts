import { IProfileData } from "../../../contracts";
import { IProfileValidator } from "../../../contracts/profiles/profile.validator";
export declare class ProfileValidator implements IProfileValidator {
	/**
	 * Validate the profile data.
	 *
	 * @param {IProfileData} [data]
	 * @return {Promise<IProfileData>}
	 * @memberof Profile
	 */
	validate(data: IProfileData): IProfileData;
}
