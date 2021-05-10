import { Base64 } from "@arkecosystem/platform-sdk-crypto";
import Joi from "joi";
import { IProfileData, IProfile } from "../../../contracts";

import { Migrator } from "./migrator";
import { Identifiers } from "../../../environment/container.models";
import { container } from "../../../environment/container";
import { ProfileEncrypter } from "./profile.encrypter";
import { IProfileImporter } from "../../../contracts/profiles/profile.importer";

export class ProfileImporter implements IProfileImporter {
	readonly #profile: IProfile;

	public constructor(profile: IProfile) {
		this.#profile = profile;
	}

	/** {@inheritDoc IProfileImporter.import} */
	public async import(password?: string): Promise<void> {
		const data: IProfileData | undefined = await this.validate(await this.unpack(password));

		this.#profile.peers().fill(data.peers);

		this.#profile.notifications().fill(data.notifications);

		this.#profile.data().fill(data.data);

		this.#profile.plugins().fill(data.plugins);

		this.#profile.settings().fill(data.settings);

		await this.#profile.wallets().fill(data.wallets);

		this.#profile.contacts().fill(data.contacts);
	}

	/**
	 * Validate the profile data after decoding and/or decrypting it.
	 *
	 * @private
	 * @param {string} [password]
	 * @return {Promise<IProfileData>}
	 * @memberof Profile
	 */
	private async unpack(password?: string): Promise<IProfileData> {
		let data: IProfileData | undefined;
		let errorReason = "";

		try {
			if (typeof password === "string") {
				data = new ProfileEncrypter(this.#profile).decrypt(password);

				// For password-protected profiles, make sure password is available during active profile's session.
				// Will be accessed from env emitter to auto-save profile's changed data.
				this.#profile.password().set(password);
			} else {
				data = JSON.parse(Base64.decode(this.#profile.getAttributes().get<string>("data")));
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
	 * @return {Promise<IProfileData>}
	 * @memberof Profile
	 */
	private async validate(data: IProfileData): Promise<IProfileData> {
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
