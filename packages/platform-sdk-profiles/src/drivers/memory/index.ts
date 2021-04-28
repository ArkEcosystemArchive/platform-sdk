import EventEmitter from "eventemitter3";

import { Container } from "../../environment/container";
import { Events, Identifiers } from "../../environment/container.models";
import { EnvironmentOptions } from "../../environment/env.models";
import { Driver, IProfileRepository } from "../../contracts";
import { DataRepository } from "../../repositories/data-repository";
import { ProfileRepository } from "./repositories/profile-repository";
import { DelegateService } from "./services/delegate-service";
import { ExchangeRateService } from "./services/exchange-rate-service";
import { FeeService } from "./services/fee-service";
import { KnownWalletService } from "./services/known-wallet-service";
import { WalletService } from "./services/wallet-service";
import { PluginRegistry } from "./plugins";
import { emitter } from "./helpers";
import { ProfileExporter } from "./profiles/profile.exporter";
import { MemoryPassword } from "../../helpers";
import { StorageFactory } from "../../environment/storage/factory";

export class MemoryDriver implements Driver {
	/**
	 * Create all necessary container bindings based on the given options.
	 *
	 * @param {Container} container
	 * @param {EnvironmentOptions} options
	 * @memberof MemoryDriver
	 */
	public make(container: Container, options: EnvironmentOptions): void {
		if (typeof options.storage === "string") {
			container.constant(Identifiers.Storage, StorageFactory.make(options.storage));
		} else {
			container.constant(Identifiers.Storage, options.storage);
		}

		container.constant(Identifiers.HttpClient, options.httpClient);
		container.constant(Identifiers.Coins, options.coins);
		container.constant(Identifiers.EventEmitter, new EventEmitter());

		container.singleton(Identifiers.AppData, DataRepository);
		container.singleton(Identifiers.DelegateService, DelegateService);
		container.singleton(Identifiers.ExchangeRateService, ExchangeRateService);
		container.singleton(Identifiers.FeeService, FeeService);
		container.singleton(Identifiers.KnownWalletService, KnownWalletService);
		container.singleton(Identifiers.PluginRegistry, PluginRegistry);
		container.singleton(Identifiers.ProfileRepository, ProfileRepository);
		container.singleton(Identifiers.WalletService, WalletService);

		this.registerListeners(container);
	}

	private registerListeners(container: Container): void {
		emitter().on(Events.ProfileChanged, ({ id }) => {
			try {
				const profile = container.get<IProfileRepository>(Identifiers.ProfileRepository).findById(id);

				if (MemoryPassword.exists()) {
					profile.getAttributes().set("data", new ProfileExporter(profile).export(MemoryPassword.get()));
				} else {
					profile.getAttributes().set("data", new ProfileExporter(profile).export());
				}

				emitter().emit(Events.EnvironmentChanged);
			} catch (error) {
				if (process.env.NODE_ENV !== "test") {
					console.error(`[FATAL] Failed to encode or encrypt the profile. Reason: ${error.message}`);
				}
			}
		});
	}
}
