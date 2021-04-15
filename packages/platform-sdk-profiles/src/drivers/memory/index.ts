import { Container } from "../../environment/container";
import { Identifiers } from "../../environment/container.models";
import { EnvironmentOptions } from "../../environment/env.models";
import { Driver } from "../../contracts";
import { DataRepository } from "../../repositories/data-repository";
import { ProfileRepository } from "./repositories/profile-repository";
import { DelegateService } from "./services/delegate-service";
import { ExchangeRateService } from "./services/exchange-rate-service";
import { FeeService } from "./services/fee-service";
import { KnownWalletService } from "./services/known-wallet-service";
import { WalletService } from "./services/wallet-service";
import { PluginRegistry } from "./plugins";

export class MemoryDriver implements Driver {
	/**
	 * Create all necessary container bindings based on the given options.
	 *
	 * @param {Container} container
	 * @param {EnvironmentOptions} options
	 * @memberof MemoryDriver
	 */
	public make(container: Container, options: EnvironmentOptions): void {
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
