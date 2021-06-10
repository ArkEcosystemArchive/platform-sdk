"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverFactory = void 0;
const memory_1 = require("./memory");
/**
 * Creates a new driver instance based on a string identifier.
 *
 * @export
 * @class DriverFactory
 */
class DriverFactory {
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
	static make(name, container, options) {
		const driver = {
			memory: () => new memory_1.MemoryDriver(),
		}[name];
		if (driver === undefined) {
			throw new Error(`Driver [${name}] is not supported.`);
		}
		return driver().make(container, options);
	}
}
exports.DriverFactory = DriverFactory;
//# sourceMappingURL=driver.factory.js.map
