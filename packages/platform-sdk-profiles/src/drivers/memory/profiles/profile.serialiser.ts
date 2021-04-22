import { IProfileData, IProfileExportOptions, IProfile } from "../../../contracts";
import { IProfileSerialiser } from "../../../contracts/profiles/profile.serialiser";

export class ProfileSerialiser implements IProfileSerialiser {
	/**
	 * Normalise the profile into an object.
	 *
	 * @param {IProfileExportOptions} [options]
	 * @return {*}  {IProfileData}
	 * @memberof Profile
	 */
	public toJSON(
		profile: IProfile,
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
			id: profile.id(),
			contacts: profile.contacts().toObject(),
			data: profile.data().all(),
			notifications: profile.notifications().all(),
			peers: profile.peers().toObject(),
			plugins: profile.plugins().all(),
			settings: profile.settings().all(),
			wallets: profile.wallets().toObject(options),
		};
	}
}
