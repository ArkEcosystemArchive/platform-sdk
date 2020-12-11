/**
 * Based on https://github.com/Dobby89/promise-all-settled-by-key.
 *
 * This implementation reflects the original result format of Promise.allSettled
 * by returning the status as "fulfilled" or "rejected" and returning the result
 * as "value". The value can be either "T" as specified or an "Error" instance.
 */

export type SettledPromises<T> = Record<string, { status: "fulfilled" | "rejected"; value: T | Error }>;

export const promiseAllSettledByKey = async <T>(
	promisesMap: object = {},
	{ onlyResolved = false, onlyRejected = false }: { onlyResolved?: boolean; onlyRejected?: boolean } = {},
): Promise<SettledPromises<T>> => {
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
