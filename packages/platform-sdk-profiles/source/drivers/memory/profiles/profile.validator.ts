import Joi from "joi";
import { IProfileData, IProfile, ProfileSetting, ProfileData } from "../../../contracts";

import { IProfileValidator } from "../../../contracts/profiles/profile.validator";

export class ProfileValidator implements IProfileValidator {
	/**
	 * Validate the profile data.
	 *
	 * @param {IProfileData} [data]
	 * @return {Promise<IProfileData>}
	 * @memberof Profile
	 */
	public validate(data: IProfileData): IProfileData {
		const { error, value } = Joi.object({
			id: Joi.string().required(),
			contacts: Joi.object().pattern(
				Joi.string().uuid(),
				Joi.object({
					id: Joi.string().required(),
					name: Joi.string().required(),
					addresses: Joi.array().items(
						Joi.object({
							id: Joi.string().required(),
							coin: Joi.string().required(),
							network: Joi.string().required(),
							address: Joi.string().required(),
						}),
					),
					starred: Joi.boolean().required(),
				}),
			),
			data: Joi.object({
				[ProfileData.LatestMigration]: Joi.boolean(),
				[ProfileData.HasCompletedIntroductoryTutorial]: Joi.boolean(),
				[ProfileData.HasAcceptedManualInstallationDisclaimer]: Joi.boolean(),
			}).required(),
			notifications: Joi.object().pattern(
				Joi.string().uuid(),
				Joi.object({
					id: Joi.string().required(),
					icon: Joi.string().required(),
					name: Joi.string().required(),
					body: Joi.string().required(),
					type: Joi.string().required(),
					action: Joi.string().required(),
					read_at: Joi.number(),
					meta: Joi.object(),
				}),
			).required(),
			peers: Joi.object().pattern(
				Joi.string().uuid(),
					Joi.object({
					name: Joi.string().required(),
					host: Joi.string().required(),
					isMultiSignature: Joi.boolean().required(),
				}),
			).required(),
			plugins: Joi.object().pattern(
				Joi.string().uuid(),
				Joi.object({
					id: Joi.string().required(),
					name: Joi.string().required(),
					version: Joi.string().required(),
					isEnabled: Joi.boolean().required(),
					permissions: Joi.array().items(Joi.string()).required(),
					urls: Joi.array().items(Joi.string()).required(),
				}),
			).required(),
			// @TODO: assert specific values for enums
			settings: Joi.object({
				[ProfileSetting.AdvancedMode]: Joi.boolean(), // @TODO: should we initialise this on profile creation?
				[ProfileSetting.AutomaticSignOutPeriod]: Joi.number().required(),
				[ProfileSetting.Avatar]: Joi.string(),
				[ProfileSetting.Bip39Locale]: Joi.string().required(),
				[ProfileSetting.DashboardConfiguration]: Joi.boolean(), // @TODO: should we initialise this on profile creation?
				[ProfileSetting.DashboardTransactionHistory]: Joi.boolean(), // @TODO: should we initialise this on profile creation?
				[ProfileSetting.DoNotShowFeeWarning]: Joi.boolean(), // @TODO: should we initialise this on profile creation?
				[ProfileSetting.ErrorReporting]: Joi.boolean(), // @TODO: should we initialise this on profile creation?
				[ProfileSetting.ExchangeCurrency]: Joi.string().required(),
				[ProfileSetting.Locale]: Joi.string().required(),
				[ProfileSetting.MarketProvider]: Joi.string().allow("coincap", "cryptocompare", "coingecko").required(),
				[ProfileSetting.Name]: Joi.string().required(),
				[ProfileSetting.NewsFilters]: Joi.string(),
				[ProfileSetting.Password]: Joi.string(),
				[ProfileSetting.ScreenshotProtection]: Joi.boolean().default(false),
				[ProfileSetting.Theme]: Joi.string().required(),
				[ProfileSetting.TimeFormat]: Joi.string().required(),
				[ProfileSetting.UseTestNetworks]: Joi.boolean().default(false),
			}).required(),
			wallets: Joi.object().pattern(
				Joi.string().uuid(),
				Joi.object({
					id: Joi.string().required(),
					data: Joi.object().required(),
					settings: Joi.object().required(),
				}),
			),
		}).validate(data, { stripUnknown: true, allowUnknown: true });

		if (error !== undefined) {
			throw error;
		}

		return value as IProfileData;
	}
}
