import { Flags } from "./types";
/**
 * Launch the indexer and subscribe to updates for new data.
 *
 * @param {Flags} flags
 * @returns {Promise<void>}
 */
export declare const subscribe: (flags: Flags) => Promise<void>;
