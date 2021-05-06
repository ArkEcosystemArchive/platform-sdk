import { Driver } from "../contracts";
import { Container } from "../environment/container";
import { EnvironmentOptions } from "../environment/env.models";
import { MemoryDriver } from "./memory";

/**
 * Creates a new driver instance based on a string identifier.
 *
 * @export
 * @class DriverFactory
 */
export class DriverFactory {
	/**
	 * Create a driver instance and all necessary container bindings.
	 *
	 * @static
	 * @param {string} name
	 * @param {Container} container
	 * @param {EnvironmentOptions} options
	 * @returns {void}
	 * @memberof DriverFactory
	 */
	public static make(name: string, container: Container, options: EnvironmentOptions): void {
		const driver: (() => Driver) | undefined = {
			memory: () => new MemoryDriver(),
		}[name];

		if (driver === undefined) {
			throw new Error(`Driver [${name}] is not supported.`);
		}

		return driver().make(container, options);
	}
}
