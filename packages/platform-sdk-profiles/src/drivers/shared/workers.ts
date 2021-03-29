import { spawn, Worker, Thread } from "threads";

export const spawnWorker = async <T>(file: string, callback: Function): Promise<T> => {
	const worker = await spawn(new Worker(file));
	const result: T = await callback(worker);

	Thread.terminate(worker);

	return result;
}
