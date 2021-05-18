import Joi from "joi";
import { IProfileData, IProfile } from "../../../contracts";

import { Migrator } from "./migrator";
import { Identifiers } from "../../../environment/container.models";
import { container } from "../../../environment/container";
import { IProfileValidator } from "../../../contracts/profiles/profile.validator";

export class ProfileValidator implements IProfileValidator {
	readonly #profile: IProfile;

	public constructor(profile: IProfile) {
		this.#profile = profile;
	}

	/**
	 * Validate the profile data.
	 *
	 * @param {IProfileData} [data]
	 * @return {Promise<IProfileData>}
	 * @memberof Profile
	 */
	public async validate(data: IProfileData): Promise<IProfileData> {
		if (container.has(Identifiers.MigrationSchemas) && container.has(Identifiers.MigrationVersion)) {
			await new Migrator(this.#profile).migrate(
				container.get(Identifiers.MigrationSchemas),
				container.get(Identifiers.MigrationVersion),
			);
		}

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
							name: Joi.string().required(),
							address: Joi.string().required(),
						}),
					),
					starred: Joi.boolean().required(),
				}),
			),
			// TODO: stricter validation to avoid unknown keys or values
			data: Joi.object().required(),
			// TODO: stricter validation to avoid unknown keys or values
			notifications: Joi.object().required(),
			// TODO: stricter validation to avoid unknown keys or values
			peers: Joi.object().required(),
			// TODO: stricter validation to avoid unknown keys or values
			plugins: Joi.object().required(),
			// TODO: stricter validation to avoid unknown keys or values
			settings: Joi.object().required(),
			wallets: Joi.object().pattern(
				Joi.string().uuid(),
				Joi.object({
					id: Joi.string().required(),
					coin: Joi.string().required(),
					network: Joi.string().required(),
					networkConfig: Joi.object({
						crypto: Joi.object({
							slip44: Joi.number().integer().required(),
						}).required(),
						networking: Joi.object({
							hosts: Joi.array().items(Joi.string()).required(),
							hostsMultiSignature: Joi.array().items(Joi.string()),
							hostsArchival: Joi.array().items(Joi.string()),
						}).required(),
					}),
					address: Joi.string().required(),
					publicKey: Joi.string(),
					data: Joi.object().required(),
					settings: Joi.object().required(),
				}),
			),
		}).validate(data);

		if (error !== undefined) {
			throw error;
		}

		return value as IProfileData;
	}
}