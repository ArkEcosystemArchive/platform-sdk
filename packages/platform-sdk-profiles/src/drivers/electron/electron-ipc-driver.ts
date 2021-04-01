import { Container } from "../../environment/container";
import { EnvironmentOptions } from "../../environment/env.models";
import { Driver, IProfile, IProfileRepository } from "../../contracts";
import { Identifiers } from "../../environment/container.models";
import { ProcessRender } from "./contracts";
import { Events } from "./events";
import { DriverFactory } from "../driver.factory";
import { DataRepository } from "../../repositories";
import { CoinService } from "../memory/services/coin-service";
import { DelegateService } from "../memory/services/delegate-service";
import { ExchangeRateService } from "../memory/services/exchange-rate-service";
import { FeeService } from "../memory/services/fee-service";
import { KnownWalletService } from "../memory/services/known-wallet-service";
import { PluginRegistry } from "../memory/plugins";
import { ProfileRepository } from "../memory/repositories/profile-repository";
import { WalletService } from "../memory/services/wallet-service";

export class ElectronIpcDriver implements Driver {
	/**
	 * The main process IPC listeners.
	 *
	 * @type {Record<string, Function>}
	 * @memberof ElectronDriver
	 */
	readonly #listeners: Record<string, Function> = {};

	public constructor(container: Container) {
		// TODO Extract this static mapping somewhere else
		this.#listeners[Events.ProfileFactory.fromName] = (name: string): IProfile | undefined => {
			console.log('received', Events.ProfileFactory.fromName, name);
			// TODO hydrate json profile to IProfile instance
			return undefined;
		}
		this.#listeners[Events.ProfileFactory.fromId] = (id: string): IProfile | undefined => {
			console.log('received', Events.ProfileFactory.fromId, id);
			// TODO hydrate json profile to IProfile instance
			return undefined;
		}
	}

	/**
	 * Create all necessary container bindings based on the given options.
	 *
	 * @param {Container} container
	 * @param {EnvironmentOptions} options
	 * @memberof MemoryDriver
	 */
	public make(container: Container, options: EnvironmentOptions): void {
		const ipcRenderer: ProcessRender | undefined = options.driverArguments?.ipcRenderer as unknown as ProcessRender;

		container.singleton(Identifiers.AppData, DataRepository);
		container.singleton(Identifiers.CoinService, CoinService);
		container.singleton(Identifiers.DelegateService, DelegateService);
		container.singleton(Identifiers.ExchangeRateService, ExchangeRateService);
		container.singleton(Identifiers.FeeService, FeeService);
		container.singleton(Identifiers.KnownWalletService, KnownWalletService);
		container.singleton(Identifiers.PluginRegistry, PluginRegistry);
		container.singleton(Identifiers.ProfileRepository, ProfileRepository);
		container.singleton(Identifiers.WalletService, WalletService);

		if (ipcRenderer !== undefined) {
			// @TODO: register classes that use `ipcRenderer.send` instead of in-memory constructs

			for (const [event, listener] of Object.entries(this.#listeners)) {
				console.log('registering client listener for event', event);
				ipcRenderer.on(event, listener);
			}

			// Expose the render process for any additional work
			container.bind(Identifiers.ProcessRenderer, ipcRenderer);
		}
	}

	public static registerSelf(): void {
		DriverFactory.registerDriver('electron-ipc-driver', (container) => new ElectronIpcDriver(container))
	}
}
