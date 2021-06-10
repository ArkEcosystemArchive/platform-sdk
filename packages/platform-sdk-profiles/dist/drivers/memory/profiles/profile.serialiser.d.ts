import { IProfileData, IProfileExportOptions, IProfile } from "../../../contracts";
import { IProfileSerialiser } from "../../../contracts/profiles/profile.serialiser";
export declare class ProfileSerialiser implements IProfileSerialiser {
	#private;
	constructor(profile: IProfile);
	/** {@inheritDoc IProfileSerialiser.toJSON} */
	toJSON(options?: IProfileExportOptions): IProfileData;
}
