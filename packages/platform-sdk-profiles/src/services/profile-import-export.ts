import { Profile } from "../profiles/profile";
import { ProfileExportOptions } from "../profiles/profile.models";

export class ProfileImportExport {
	public static import(data: string): Profile {
		return ProfileImportExport.fromProfileInput(data);
	}

	public static export(profile: Profile, options: ProfileExportOptions): string {
		return "";
	}

	private static fromProfileInput(data: string): Profile {
		return new Profile({
			data: "",
			id: "",
			name: "",
		});
	}
}
