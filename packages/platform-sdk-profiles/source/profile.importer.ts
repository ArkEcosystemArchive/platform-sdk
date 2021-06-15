import { Base64 } from "@arkecosystem/platform-sdk-crypto";
import { IProfileData, IProfile, WalletData } from "./contracts";

import { ProfileEncrypter } from "./profile.encrypter";
import { IProfileImporter } from "./contracts";
import { IProfileValidator } from "./contracts";
import { ProfileValidator } from "./profile.validator";
import { container } from "./container";
import { Identifiers } from "./container.models";
import { Migrator } from "./migrator";

export class ProfileImporter implements IProfileImporter {
	readonly #profile: IProfile;
	readonly #validator: IProfileValidator;

	public constructor(profile: IProfile) {
		this.#profile = profile;
		this.#validator = new ProfileValidator();
	}

	/** {@inheritDoc IProfileImporter.import} */
	public async import(password?: string): Promise<void> {
		let data: IProfileData | undefined = this.#unpack(password);

		if (container.has(Identifiers.MigrationSchemas) && container.has(Identifiers.MigrationVersion)) {
			await new Migrator(this.#profile).migrate(
				container.get(Identifiers.MigrationSchemas),
				container.get(Identifiers.MigrationVersion),
			);
		}

		data = this.#validator.validate(data);

		this.#profile.peers().fill(data.peers);

		this.#profile.notifications().fill(data.notifications);

		this.#profile.data().fill(data.data);

		this.#profile.plugins().fill(data.plugins);

		this.#profile.settings().fill(data.settings);

		await this.#profile.wallets().fill(data.wallets);

		this.#profile.contacts().fill(data.contacts);

		this.#gatherCoins(data);
	}

	/**
	 * Validate the profile data after decoding and/or decrypting it.
	 *
	 * @private
	 * @param {string} [password]
	 * @return {Promise<IProfileData>}
	 * @memberof Profile
	 */
	#unpack(password?: string): IProfileData {
		let data: IProfileData | undefined;
		let errorReason = "";

		try {
			if (typeof password === "string") {
				this.#profile.password().set(password);

				data = new ProfileEncrypter(this.#profile).decrypt(password);
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
	#gatherCoins(data: IProfileData): void {
		for (const wallet of Object.values(data.wallets)) {
			this.#profile.coins().set(wallet.data[WalletData.Coin], wallet.data[WalletData.Network]);
		}

		for (const contact of Object.values(data.contacts)) {
			for (const { coin, network } of Object.values(contact.addresses) as { coin: string; network: string }[]) {
				this.#profile.coins().set(coin, network);
			}
		}
	}
}
