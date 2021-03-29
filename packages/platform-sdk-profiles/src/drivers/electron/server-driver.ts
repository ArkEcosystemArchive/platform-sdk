import { Container } from "../../environment/container";
import { EnvironmentOptions } from "../../environment/env.models";
import { Driver, IProfile, IProfileRepository } from "../../contracts";
import { Identifiers } from "../../environment/container.models";
import { ProcessMain, ProcessRender } from "./contracts";
import { DriverFactory } from "../driver.factory";
import { Events } from "./events";

export class ElectronServerDriver implements Driver {
	/**
	 * The main process IPC listeners.
	 *
	 * @type {Record<string, Function>}
	 * @memberof ElectronDriver
	 */
	readonly #listeners: Record<string, Function> = {};

	readonly #container: Container;

	public constructor(container: Container) {
		this.#container = container;

		// TODO Extract this static mapping somewhere else
		this.#listeners[Events.ProfileFactory.fromName] = (name: string): IProfile | undefined => {
			return this.#container.get<IProfileRepository>(Identifiers.ProfileRepository).findByName(name);
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
		this.handleMainProcess(container, options);
	}

	/**
	 * Register the IPC listeners for the main process.
	 *
	 * @private
	 * @param {Container} container
	 * @param {EnvironmentOptions} options
	 * @memberof ElectronDriver
	 */
	private handleMainProcess(container: Container, options: EnvironmentOptions): void {
		const ipcMain: ProcessMain | undefined = options.driverArguments?.ipcMain as unknown as ProcessMain;

		if (ipcMain !== undefined) {
			// Register the in-memory adapters
			DriverFactory.make('memory', container, options);

			// Register all listeners
			for (const [event, listener] of Object.entries(this.#listeners)) {
				ipcMain.handle(event, listener)
			}

			// Expose the main process for any additional work
			container.bind(Identifiers.ProcessMain, ipcMain);
		}
	}
}
