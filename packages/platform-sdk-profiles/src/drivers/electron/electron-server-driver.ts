import { Container } from "../../environment/container";
import { EnvironmentOptions } from "../../environment/env.models";
import { Driver, IProfile } from "../../contracts";
import { Identifiers } from "../../environment/container.models";
import { ProcessMain } from "./contracts";
import { DriverFactory } from "../driver.factory";
import { Events } from "./events";
import { Environment } from "../../environment/env";

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
		this.#listeners[Events.ProfileFactory.fromName] = (env: Environment) => async (event, { name }) => {
			const profile: IProfile = env.profiles().findByName(name) || env.profiles().create(name);
			// TODO We may want to use a prefix for both request and response. Not needed but could help understand better.
			event.reply(Events.ProfileFactory.fromName, profile.toObject());
		};
	}

	/**
	 * Create all necessary container bindings based on the given options.
	 *
	 * @param {Container} container
	 * @param {EnvironmentOptions} options
	 * @memberof MemoryDriver
	 */
	public async make(container: Container, options: EnvironmentOptions): Promise<void> {
		const ipcMain: ProcessMain = options.driverArguments?.ipcMain as unknown as ProcessMain;

		// TODO Is this the best way to have an environment? Can be be found in container? Can it be injected as a param to make() instead?
		const env: Environment = new Environment(options);
		await env.verify();
		await env.boot();

		// Register the in-memory adapters
		DriverFactory.make("memory", container, options);

		// Register all listeners
		for (const [event, listener] of Object.entries(this.#listeners)) {
			ipcMain.handle(event, listener(env));
		}

		// Expose the main process for any additional work
		container.bind(Identifiers.ProcessMain, ipcMain);
	}

	public static registerSelf(): void {
		DriverFactory.registerDriver("electron-server", (container) => new ElectronServerDriver(container));
	}
}
