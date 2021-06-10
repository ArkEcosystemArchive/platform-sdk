import { Base64 } from "@arkecosystem/platform-sdk-crypto";
import { IProfileExportOptions, IProfile } from "../../../contracts";
import { IProfileExporter } from "../../../contracts/profiles/profile.exporter";

import { ProfileEncrypter } from "./profile.encrypter";
import { ProfileSerialiser } from "./profile.serialiser";

export class ProfileExporter implements IProfileExporter {
	readonly #profile: IProfile;

	public constructor(profile: IProfile) {
		this.#profile = profile;
	}

	/** {@inheritDoc IProfileExporter.export} */
	public export(
		password?: string,
		options: IProfileExportOptions = {
			excludeEmptyWallets: false,
			excludeLedgerWallets: false,
			addNetworkInformation: true,
			saveGeneralSettings: true,
		},
	): string {
		const data = new ProfileSerialiser(this.#profile).toJSON(options);

		if (this.#profile.usesPassword()) {
			return Base64.encode(
				new ProfileEncrypter(this.#profile).encrypt(
					JSON.stringify({
						id: this.#profile.id(),
						name: this.#profile.name(),
						avatar: this.#profile.avatar(),
						password: this.#profile.getAttributes().get<string>("password"),
						data,
					}),
					password,
				),
			);
		}

		return Base64.encode(JSON.stringify(data));
	}
}
