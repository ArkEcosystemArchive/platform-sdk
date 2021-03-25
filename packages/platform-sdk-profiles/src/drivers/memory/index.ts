import { Container } from "../../environment/container";
import { Identifiers } from "../../environment/container.models";
import { EnvironmentOptions } from "../../environment/env.models";
import { Driver } from "../../contracts";
import { DataRepository } from "./repositories/data-repository";
import { ProfileRepository } from "./repositories/profile-repository";
import { CoinService } from "./services/coin-service";
import { DelegateService } from "./services/delegate-service";
import { ExchangeRateService } from "./services/exchange-rate-service";
import { FeeService } from "./services/fee-service";
import { KnownWalletService } from "./services/known-wallet-service";
import { WalletService } from "./services/wallet-service";

export class MemoryDriver implements Driver {
	/**
	 * Create all necessary container bindings based on the given options.
	 *
	 * @param {Container} container
	 * @param {EnvironmentOptions} options
	 * @memberof MemoryDriver
	 */
	public make(container: Container, options: EnvironmentOptions): void {
		container.bind(Identifiers.AppData, new DataRepository());
		container.bind(Identifiers.ProfileRepository, new ProfileRepository());
		container.bind(Identifiers.CoinService, new CoinService());
		container.bind(Identifiers.DelegateService, new DelegateService());
		container.bind(Identifiers.ExchangeRateService, new ExchangeRateService());
		container.bind(Identifiers.FeeService, new FeeService());
		container.bind(Identifiers.KnownWalletService, new KnownWalletService());
		container.bind(Identifiers.WalletService, new WalletService());
	}
}
