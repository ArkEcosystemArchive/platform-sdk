import { IProfile, IProfileInput } from "../../../contracts";
import { IProfileDumper } from "../../../contracts/profiles/profile.dumper";
export declare class ProfileDumper implements IProfileDumper {
	#private;
	constructor(profile: IProfile);
	/** {@inheritDoc IProfileDumper.dump} */
	dump(): IProfileInput;
}
