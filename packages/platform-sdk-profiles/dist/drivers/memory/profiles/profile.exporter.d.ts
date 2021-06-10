import { IProfileExportOptions, IProfile } from "../../../contracts";
import { IProfileExporter } from "../../../contracts/profiles/profile.exporter";
export declare class ProfileExporter implements IProfileExporter {
	#private;
	constructor(profile: IProfile);
	/** {@inheritDoc IProfileExporter.export} */
	export(password?: string, options?: IProfileExportOptions): string;
}
