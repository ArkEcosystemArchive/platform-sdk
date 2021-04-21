import { Base64 } from "@arkecosystem/platform-sdk-crypto";
import {
	IProfileExportOptions,
	IProfile,
	IProfileInput,
} from "../../../contracts";

import { ProfileEncrypter } from "./profile.encrypter";

export class ProfileExporter {
	readonly #profile: IProfile;

	public constructor(profile: IProfile) {
		this.#profile = profile;
	}

	/**
	 * Export the profile data to a base64 string.
	 *
	 * @param {string} [password]
	 * @param {IProfileExportOptions} [options]
	 * @return {*}  {string}
	 * @memberof Profile
	 */
	public export(
		password?: string,
		options: IProfileExportOptions = {
			excludeEmptyWallets: false,
			excludeLedgerWallets: false,
			addNetworkInformation: true,
			saveGeneralSettings: true,
		},
	): string {
		const filtered = this.#profile.toObject(options);

		if (this.#profile.usesPassword()) {
			return Base64.encode(
				new ProfileEncrypter(this.#profile).encrypt(
					JSON.stringify({
						id: this.#profile.id(),
						name: this.#profile.name(),
						avatar: this.#profile.avatar(),
						password: this.#profile.getAttributes().get<IProfileInput>('data').password,
						data: this.#profile.toObject(options),
					}),
					password,
				),
			);
		}

		return Base64.encode(JSON.stringify(filtered));
	}
}
