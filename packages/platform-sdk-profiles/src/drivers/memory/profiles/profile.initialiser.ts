import { IProfile, ProfileSetting } from "../../../contracts";

export class ProfileInitialiser {
	readonly #profile: IProfile;

	public constructor(profile: IProfile) {
		this.#profile = profile;
	}

	/**
	 * Restore the default settings, including the name of the profile.
	 *
	 * @private
	 * @param {string} name
	 * @memberof Profile
	 */
	public reset(name: string): void {
		this.#profile.settings().set(ProfileSetting.Name, name);

		this.settings();
	}

	/**
	 * Initialize the factory settings.
	 *
	 * If the profile has modified any settings they will be overwritten!
	 *
	 * @memberof Profile
	 */
	public settings(): void {
		this.#profile.settings().set(ProfileSetting.AdvancedMode, false);
		this.#profile.settings().set(ProfileSetting.AutomaticSignOutPeriod, 15);
		this.#profile.settings().set(ProfileSetting.Bip39Locale, "english");
		this.#profile.settings().set(ProfileSetting.ExchangeCurrency, "BTC");
		this.#profile.settings().set(ProfileSetting.LedgerUpdateMethod, false);
		this.#profile.settings().set(ProfileSetting.Locale, "en-US");
		this.#profile.settings().set(ProfileSetting.MarketProvider, "cryptocompare");
		this.#profile.settings().set(ProfileSetting.ScreenshotProtection, true);
		this.#profile.settings().set(ProfileSetting.Theme, "light");
		this.#profile.settings().set(ProfileSetting.TimeFormat, "h:mm A");
		this.#profile.settings().set(ProfileSetting.UseCustomPeer, false);
		this.#profile.settings().set(ProfileSetting.UseMultiPeerBroadcast, false);
		this.#profile.settings().set(ProfileSetting.UseTestNetworks, false);
	}
}
