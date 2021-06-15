import { IoC } from "@arkecosystem/platform-sdk";

import { Identifiers } from "./container.models";
import { EnvironmentOptions } from "./env.models";
import { DataRepository } from "./data.repository";
import { ProfileRepository } from "./profile.repository";
import { DelegateService } from "./delegate.service";
import { ExchangeRateService } from "./exchange-rate.service";
import { FeeService } from "./fee.service";
import { KnownWalletService } from "./known-wallet.service";
import { WalletService } from "./wallet.service";
import { PluginRegistry } from "./plugin-registry.service";
import { StorageFactory } from "./factory.storage";

export class DriverFactory {
	public static make(container: IoC.Container, options: EnvironmentOptions): void {
		if (typeof options.storage === "string") {
			container.constant(Identifiers.Storage, StorageFactory.make(options.storage));
		} else {
			container.constant(Identifiers.Storage, options.storage);
		}

		container.constant(Identifiers.HttpClient, options.httpClient);
		container.constant(Identifiers.Coins, options.coins);

		container.singleton(Identifiers.AppData, DataRepository);
		container.singleton(Identifiers.DelegateService, DelegateService);
		container.singleton(Identifiers.ExchangeRateService, ExchangeRateService);
		container.singleton(Identifiers.FeeService, FeeService);
		container.singleton(Identifiers.KnownWalletService, KnownWalletService);
		container.singleton(Identifiers.PluginRegistry, PluginRegistry);
		container.singleton(Identifiers.ProfileRepository, ProfileRepository);
		container.singleton(Identifiers.WalletService, WalletService);
	}
}
