import { Container } from "../../environment/container";
import { EnvironmentOptions } from "../../environment/env.models";
import { Driver, IProfile, IProfileRepository } from "../../contracts";
import { Identifiers } from "../../environment/container.models";
import { ProcessRender } from "./contracts";
import { Events } from "./events";
import { DriverFactory } from "../driver.factory";

export class ElectronClientDriver implements Driver {
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
			return container.get<IProfileRepository>(Identifiers.ProfileRepository).findByName(name);
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

		if (ipcRenderer !== undefined) {
			// @TODO: register classes that use `ipcRenderer.send` instead of in-memory constructs

			for (const [event, listener] of Object.entries(this.#listeners)) {
				ipcRenderer.on(event, listener(env));
			}

			// Expose the render process for any additional work
			container.bind(Identifiers.ProcessRenderer, ipcRenderer);
		}
	}

	public static registerSelf(): void {
		DriverFactory.registerDriver('electron-client', (container) => new ElectronClientDriver(container))
	}
}
