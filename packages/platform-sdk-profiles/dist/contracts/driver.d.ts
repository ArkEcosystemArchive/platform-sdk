import { IoC } from "@arkecosystem/platform-sdk";
import { EnvironmentOptions } from "../environment/env.models";
/**
 * Defines the implementation contract for drivers.
 *
 * @export
 * @interface Driver
 */
export interface Driver {
	/**
	 * Create all necessary container bindings based on the given options.
	 *
	 * @param {Container} container
	 * @param {EnvironmentOptions} options
	 * @memberof Driver
	 */
	make(container: IoC.Container, options: EnvironmentOptions): void;
}
