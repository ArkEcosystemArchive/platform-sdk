import PQueue from "p-queue";

// Infinity is the default concurrency but we keep it at a reasonable 100 to limit resource usage.
export const pqueue = async <T>(promises: (() => Promise<T>)[], concurrency = 100): Promise<any> =>
	new PQueue({ concurrency }).addAll(promises);

export const pqueueSettled = async <T>(promises: (() => Promise<T>)[], concurrency = 100): Promise<any> =>
	Promise.allSettled(promises.map((promise: () => Promise<T>) => promise()));
