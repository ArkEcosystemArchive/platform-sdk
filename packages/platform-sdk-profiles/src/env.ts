import { Coins } from "@arkecosystem/platform-sdk";
import { Container, interfaces } from "inversify";

import { container } from "./container";
import { EnvironmentOptions, Identifiers } from "./contracts";
import { Migrator } from "./migrator";
import { Profile } from "./profile";
import { ContactRepository } from "./repositories/contact-repository";
import { Data } from "./repositories/data-repository";
import { ProfileRepository } from "./repositories/profile-repository";
import { Settings } from "./repositories/setting-repository";
import { WalletRepository } from "./repositories/wallet-repository";
import { StorageFactory } from "./storage/factory";
import { Wallet } from "./wallet";

export class Environment {
	readonly #container: Container;

	public constructor(options: EnvironmentOptions) {
		this.#container = container;

		// It's important that the storage gets bound first because all data is persisted through it.
		this.#container
			.bind(Identifiers.Storage)
			.toConstantValue(
				typeof options.storage === "string" ? StorageFactory.make(options.storage) : options.storage,
			);

		// These are bindings to access and manipulate the underlying data.
		this.#container.bind(Identifiers.Data).to(Data);
		this.#container.bind(Identifiers.HttpClient).toConstantValue(options.httpClient);
		this.#container.bind(Identifiers.Migrator).to(Migrator).inSingletonScope();
		this.#container.bind(Identifiers.Settings).to(Settings);

		// These are bindings to access the underlying data like profiles, wallets and contacts.
		this.#container.bind(Identifiers.ContactRepository).to(ContactRepository);
		this.#container.bind(Identifiers.ProfileRepository).to(ProfileRepository).inSingletonScope();
		this.#container.bind(Identifiers.WalletRepository).to(WalletRepository);

		// These bindings are responsible for instantiating other bindings.
		this.#container
			.bind(Identifiers.ProfileFactory)
			.toFactory((context: interfaces.Context) => async (id: string, name: string) => {
				const profile: Profile = context.container.resolve(Profile);

				await profile.setId(id);

				return profile.setName(name);
			});

		this.#container
			.bind(Identifiers.WalletFactory)
			.toFactory(
				(context: interfaces.Context) => async (mnemonic: string, coin: Coins.CoinSpec, network: string) => {
					const wallet: Wallet = context.container.resolve<Wallet>(Wallet);

					await wallet.setCoin(coin, network);

					return wallet.setIdentity(mnemonic);
				},
			);
	}

	public profiles(): ProfileRepository {
		return this.#container.get<ProfileRepository>(Identifiers.ProfileRepository);
	}

	public data(): Data {
		return this.#container.get<Data>(Identifiers.Data);
	}

	public async migrate(migrations: object, versionToMigrate: string): Promise<void> {
		await this.#container.get<Migrator>(Identifiers.Migrator).migrate(migrations, versionToMigrate);
	}
}
