import { IoC } from "@arkecosystem/platform-sdk";
import { EnvironmentOptions } from "../environment/env.models";
/**
 * Creates a new driver instance based on a string identifier.
 *
 * @export
 * @class DriverFactory
 */
export declare class DriverFactory {
	/**
	 * Create a driver instance and all necessary container bindings.
	 *
	 * @static
	 * @param {string} name
	 * @param {IoC.Container} container
	 * @param {EnvironmentOptions} options
	 * @returns {void}
	 * @memberof DriverFactory
	 */
	static make(name: string, container: IoC.Container, options: EnvironmentOptions): void;
}
