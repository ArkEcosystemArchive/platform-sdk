import { IoC } from "@arkecosystem/platform-sdk";
import { EnvironmentOptions } from "../../environment/env.models";
import { Driver } from "../../contracts";
export declare class MemoryDriver implements Driver {
	/**
	 * Create all necessary container bindings based on the given options.
	 *
	 * @param {IoC.Container} container
	 * @param {EnvironmentOptions} options
	 * @memberof MemoryDriver
	 */
	make(container: IoC.Container, options: EnvironmentOptions): void;
}
