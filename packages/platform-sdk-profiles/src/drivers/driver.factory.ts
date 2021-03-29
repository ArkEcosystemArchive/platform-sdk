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
	static registeredDrivers: Object = {
		memory: (container: Container) => new MemoryDriver(),
	};

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
		const driver: Driver | undefined = DriverFactory.registeredDrivers[name](container);

		if (driver === undefined) {
			throw new Error(`Driver [${name}] is not supported.`);
		}

		return driver.make(container, options);
	}

	public static registerDriver(name: string, makerFunction): void {
		if (DriverFactory.registeredDrivers[name] !== undefined) {
			throw Error(`Driver ${name} already registered`);
		}

		DriverFactory.registeredDrivers[name] = makerFunction;
	}
}
