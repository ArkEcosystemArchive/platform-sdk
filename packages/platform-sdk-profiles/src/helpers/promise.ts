// Based on https://github.com/Dobby89/promise-all-settled-by-key.

export type SettledPromises<T> = Record<string, { status: "fulfilled" | "rejected"; value: T | Error }>;

export const promiseAllSettledByKey = async <T>(
	promisesMap: object = {},
	{ onlyResolved = false, onlyRejected = false }: { onlyResolved?: boolean; onlyRejected?: boolean } = {},
): Promise<SettledPromises<T> | void> => {
	const totalPromises = Object.keys(promisesMap).length;

	if (!totalPromises) {
		return Promise.resolve();
	}

	const settledPromises = {};

	function allPromisesSettled() {
		return Object.keys(settledPromises).length === totalPromises;
	}

	function applyFilters(settledPromises) {
		const filteredPromises = {
			...settledPromises,
		};

		for (const key in filteredPromises) {
			if (onlyResolved && !filteredPromises[key].resolved) {
				delete filteredPromises[key];
			}

			if (onlyRejected && filteredPromises[key].resolved) {
				delete filteredPromises[key];
			}
		}

		return Object.keys(filteredPromises).length ? filteredPromises : undefined;
	}

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
