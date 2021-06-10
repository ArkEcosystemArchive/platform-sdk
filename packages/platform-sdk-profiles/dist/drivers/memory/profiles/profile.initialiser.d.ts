import { IProfile } from "../../../contracts";
import { IProfileInitialiser } from "../../../contracts/profiles/profile.initialiser";
export declare class ProfileInitialiser implements IProfileInitialiser {
	#private;
	constructor(profile: IProfile);
	/** {@inheritDoc IProfileInitialiser.initialise} */
	initialise(name: string): void;
	/** {@inheritDoc IProfileInitialiser.initialiseSettings} */
	initialiseSettings(name: string): void;
}
