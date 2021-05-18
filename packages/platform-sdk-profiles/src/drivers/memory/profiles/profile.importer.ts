import { Base64 } from "@arkecosystem/platform-sdk-crypto";
import { IProfileData, IProfile } from "../../../contracts";

import { ProfileEncrypter } from "./profile.encrypter";
import { IProfileImporter } from "../../../contracts/profiles/profile.importer";
import { IProfileValidator } from "../../../contracts/profiles/profile.validator";
import { ProfileValidator } from "./profile.validator";
import { container } from "../../../environment/container";
import { Identifiers } from "../../../environment/container.models";
import { Migrator } from "./migrator";

export class ProfileImporter implements IProfileImporter {
	readonly #profile: IProfile;
	readonly #validator: IProfileValidator;

	public constructor(profile: IProfile) {
		this.#profile = profile;
		this.#validator = new ProfileValidator(profile);
	}

	/** {@inheritDoc IProfileImporter.import} */
	public async import(password?: string): Promise<void> {
		let data: IProfileData | undefined = await this.unpack(password);

		if (container.has(Identifiers.MigrationSchemas) && container.has(Identifiers.MigrationVersion)) {
			await new Migrator(this.#profile).migrate(
				container.get(Identifiers.MigrationSchemas),
				container.get(Identifiers.MigrationVersion),
			);
		}

		data = await this.#validator.validate(data);

		this.#profile.peers().fill(data.peers);

		this.#profile.notifications().fill(data.notifications);

		this.#profile.data().fill(data.data);

		this.#profile.plugins().fill(data.plugins);

		this.#profile.settings().fill(data.settings);

		await this.#profile.wallets().fill(data.wallets);

		this.#profile.contacts().fill(data.contacts);

		this.gatherCoins(data);
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
	 * Gather all known coins through wallets and contacts.
	 *
	 * @private
	 * @param {IProfileData} data
	 * @memberof ProfileImporter
	 */
	private gatherCoins(data: IProfileData): void {
		for (const { coin, network } of Object.values(data.wallets)) {
			this.#profile.coins().set(coin, network);
		}

		for (const contact of Object.values(data.contacts) as any) {
			for (const { coin, network } of Object.values(contact.addresses) as { coin: string; network: string }[]) {
				this.#profile.coins().set(coin, network);
			}
		}
	}
}
