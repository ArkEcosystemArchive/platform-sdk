import { Primitive } from "type-fest";

/**
 *
 *
 * @export
 * @interface ProcessMain
 */
export interface ProcessMain {
	/**
	 *
	 * @see https://www.electronjs.org/docs/api/ipc-main#ipcmainhandlechannel-listener
	 *
	 * @param {string} channel
	 * @param {Function} listener
	 * @memberof ProcessMain
	 */
	handle(channel: string, listener: Function): void;
}

/**
 *
 *
 * @export
 * @interface ProcessRender
 */
export interface ProcessRender {
	/**
	 *
	 * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererinvokechannel-args
	 *
	 * @param {string} channel
	 * @param {Record<string, Primitive>} args
	 * @returns {*}
	 * @memberof ProcessRender
	 */
	invoke(channel: string, args: Record<string, Primitive>): any;
}
