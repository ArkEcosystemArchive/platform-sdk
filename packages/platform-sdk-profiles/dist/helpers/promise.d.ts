/**
 * Based on https://github.com/Dobby89/promise-all-settled-by-key.
 *
 * This implementation reflects the original result format of Promise.allSettled
 * by returning the status as "fulfilled" or "rejected" and returning the result
 * as "value". The value can be either "T" as specified or an "Error" instance.
 */
export declare type SettledPromises<T> = Record<
	string,
	{
		status: "fulfilled" | "rejected";
		value: T | Error;
	}
>;
export declare const promiseAllSettledByKey: <T>(
	promisesMap?: object,
	{
		onlyResolved,
		onlyRejected,
	}?: {
		onlyResolved?: boolean | undefined;
		onlyRejected?: boolean | undefined;
	},
) => Promise<SettledPromises<T>>;
