"use strict";
/**
 * Based on https://github.com/Dobby89/promise-all-settled-by-key.
 *
 * This implementation reflects the original result format of Promise.allSettled
 * by returning the status as "fulfilled" or "rejected" and returning the result
 * as "value". The value can be either "T" as specified or an "Error" instance.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseAllSettledByKey = void 0;
const promiseAllSettledByKey = async (promisesMap = {}, { onlyResolved = false, onlyRejected = false } = {}) => {
	const totalPromises = Object.keys(promisesMap).length;
	const settledPromises = {};
	if (!totalPromises) {
		return settledPromises;
	}
	const allPromisesSettled = () => Object.keys(settledPromises).length === totalPromises;
	const applyFilters = (settledPromises) => {
		const filteredPromises = {
			...settledPromises,
		};
		for (const key in filteredPromises) {
			if (onlyResolved && filteredPromises[key].status === "rejected") {
				delete filteredPromises[key];
			}
			if (onlyRejected && filteredPromises[key].status === "fulfilled") {
				delete filteredPromises[key];
			}
		}
		return Object.keys(filteredPromises).length ? filteredPromises : undefined;
	};
	return new Promise((resolve) => {
		for (const promiseKey of Object.keys(promisesMap)) {
			promisesMap[promiseKey]
				.then((data) => {
					settledPromises[promiseKey] = {
						status: "fulfilled",
						value: data,
					};
					if (allPromisesSettled()) {
						return resolve(applyFilters(settledPromises));
					}
				})
				.catch((error) => {
					settledPromises[promiseKey] = {
						status: "rejected",
						value: error,
					};
					if (allPromisesSettled()) {
						return resolve(applyFilters(settledPromises));
					}
				});
		}
	});
};
exports.promiseAllSettledByKey = promiseAllSettledByKey;
//# sourceMappingURL=promise.js.map
