import { Client } from "./client";
import { Database } from "./database";
import { Logger } from "./logger";
import { Flags } from "./types";
/**
 * Creates a new database instance.
 *
 * @param {Flags} flags
 * @param {Logger} logger
 * @returns {Database}
 */
export declare const useDatabase: () => Database;
/**
 * Creates a new logger instance.
 *
 * @returns {Logger}
 */
export declare const useLogger: () => Logger;
/**
 * Creates a new API client instance.
 *
 * @param {Flags} flags
 * @param {Logger} logger
 * @param {Database} database
 * @returns {Client}
 */
export declare const useClient: (flags: Flags) => Client;
