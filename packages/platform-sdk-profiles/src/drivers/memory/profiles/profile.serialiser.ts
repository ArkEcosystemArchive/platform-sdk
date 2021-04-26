import { IProfileData, IProfileExportOptions, IProfile } from "../../../contracts";
import { IProfileSerialiser } from "../../../contracts/profiles/profile.serialiser";

export class ProfileSerialiser implements IProfileSerialiser {
	readonly #profile: IProfile;

	public constructor(profile: IProfile) {
		this.#profile = profile;
	}

	/** {@inheritDoc IProfileSerialiser.toJSON} */
	public toJSON(
		options: IProfileExportOptions = {
			excludeEmptyWallets: false,
			excludeLedgerWallets: false,
			addNetworkInformation: true,
			saveGeneralSettings: true,
		},
	): IProfileData {
		if (!options.saveGeneralSettings) {
			throw Error("This is not implemented yet");
		}

		return {
			id: this.#profile.id(),
			contacts: this.#profile.contacts().toObject(),
			data: this.#profile.data().all(),
			notifications: this.#profile.notifications().all(),
			peers: this.#profile.peers().toObject(),
			plugins: this.#profile.plugins().all(),
			settings: this.#profile.settings().all(),
			wallets: this.#profile.wallets().toObject(options),
		};
	}
}
