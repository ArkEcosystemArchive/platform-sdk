import { Base64 } from "@arkecosystem/platform-sdk-crypto";
import Joi from "joi";
import { IProfileData, IProfile } from "../../../contracts";

import { Migrator } from "./migrator";
import { State } from "../../../environment/state";
import { Identifiers } from "../../../environment/container.models";
import { container } from "../../../environment/container";
import { ProfileEncrypter } from "./profile.encrypter";
import { IProfileImporter } from "../../../contracts/profiles/profile.importer";

export class ProfileImporter implements IProfileImporter {
	/**
	 * Restore a profile from either a base64 raw or base64 encrypted string.
	 *
	 * @param {string} [password]
	 * @returns {Promise<void>}
	 * @memberof Profile
	 */
	public async import(profile: IProfile, password?: string): Promise<void> {
		const data: IProfileData | undefined = await this.validate(profile, await this.unpack(profile, password));

		State.profile(profile);

		profile.peers().fill(data.peers);

		profile.notifications().fill(data.notifications);

		profile.data().fill(data.data);

		profile.plugins().fill(data.plugins);

		profile.settings().fill(data.settings);

		await profile.wallets().fill(data.wallets);

		profile.contacts().fill(data.contacts);
	}

	/**
	 * Validate the profile data after decoding and/or decrypting it.
	 *
	 * @private
	 * @param {string} [password]
	 * @return {*}  {Promise<IProfileData>}
	 * @memberof Profile
	 */
	private async unpack (profile: IProfile, password?: string): Promise<IProfileData> {
		let data: IProfileData | undefined;
		let errorReason = "";

		try {
			if (typeof password === "string") {
				data = new ProfileEncrypter(profile).decrypt(password);
			} else {
				data = JSON.parse(Base64.decode(profile.getAttributes().get<string>('data')));
			}
		} catch (error) {
			errorReason = ` Reason: ${error.message}`;
		}

		if (data === undefined) {
			throw new Error(`Failed to decode or decrypt the profile.${errorReason}`);
		}

		return data;
	}

	/**
	 * Validate the profile data after decoding and/or decrypting it.
	 *
	 * @private
	 * @param {string} [password]
	 * @return {*}  {Promise<IProfileData>}
	 * @memberof Profile
	 */
	private async validate (profile: IProfile, data: IProfileData): Promise<IProfileData> {
		if (container.has(Identifiers.MigrationSchemas) && container.has(Identifiers.MigrationVersion)) {
			await new Migrator(profile).migrate(
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
