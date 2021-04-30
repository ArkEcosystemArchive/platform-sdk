import { IProfile, ProfileSetting } from "../../../contracts";
import { IProfileInitialiser } from "../../../contracts/profiles/profile.initialiser";
import { emitProfileChanged } from "../helpers";

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
		if (name === undefined) {
			throw new Error("The name of the profile could not be found. This looks like a bug.");
		}

		// Default Settings
		this.#profile.settings().set(ProfileSetting.Name, name);
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

		emitProfileChanged();
	}
}
