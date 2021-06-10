import { IProfile } from "../../../contracts";
import { IProfileImporter } from "../../../contracts/profiles/profile.importer";
export declare class ProfileImporter implements IProfileImporter {
	#private;
	constructor(profile: IProfile);
	/** {@inheritDoc IProfileImporter.import} */
	import(password?: string): Promise<void>;
}
