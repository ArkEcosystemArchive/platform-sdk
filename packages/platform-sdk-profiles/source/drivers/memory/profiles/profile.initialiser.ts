import { IProfile, ProfileSetting } from "../../../contracts";
import { IProfileInitialiser } from "../../../contracts/profiles/profile.initialiser";

export class ProfileInitialiser implements IProfileInitialiser {
	readonly #profile: IProfile;

	public constructor(profile: IProfile) {
		this.#profile = profile;
	}

	/** {@inheritDoc IProfileInitialiser.initialise} */
	public initialise(name: string): void {
		// Flush services
		this.#profile.contacts().flush();
		this.#profile.data().flush();
		this.#profile.notifications().flush();
		this.#profile.plugins().flush();
		this.#profile.settings().flush();
		this.#profile.wallets().flush();

		// Default Settings
		this.initialiseSettings(name);
	}

	/** {@inheritDoc IProfileInitialiser.initialiseSettings} */
	public initialiseSettings(name: string): void {
		this.#profile.settings().set(ProfileSetting.AdvancedMode, false);
		this.#profile.settings().set(ProfileSetting.AutomaticSignOutPeriod, 15);
		this.#profile.settings().set(ProfileSetting.Bip39Locale, "english");
		this.#profile.settings().set(ProfileSetting.DashboardConfiguration, false);
		this.#profile.settings().set(ProfileSetting.DashboardTransactionHistory, false);
		this.#profile.settings().set(ProfileSetting.DoNotShowFeeWarning, false);
		this.#profile.settings().set(ProfileSetting.ErrorReporting, false);
		this.#profile.settings().set(ProfileSetting.ExchangeCurrency, "BTC");
		this.#profile.settings().set(ProfileSetting.Locale, "en-US");
		this.#profile.settings().set(ProfileSetting.MarketProvider, "cryptocompare");
		this.#profile.settings().set(ProfileSetting.Name, name);
		this.#profile.settings().set(ProfileSetting.ScreenshotProtection, true);
		this.#profile.settings().set(ProfileSetting.Theme, "light");
		this.#profile.settings().set(ProfileSetting.TimeFormat, "h:mm A");
		this.#profile.settings().set(ProfileSetting.UseTestNetworks, false);

		this.#profile.status().markAsDirty();
	}
}
