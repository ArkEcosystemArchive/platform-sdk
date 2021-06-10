import PQueue from "p-queue";
import { Client } from "./client";
import { Database } from "./database";
import { Logger } from "./logger";
/**
 * Creates a new database instance.
 *
 * @param {*} flags
 * @param {*} logger
 * @returns {Database}
 */
export declare const useDatabase: (flags: any, logger: any) => Database;
/**
 * Creates a new logger instance.
 *
 * @returns {Logger}
 */
export declare const useLogger: () => Logger;
/**
 * Creates a new queue instance.
 *
 * @returns {PQueue}
 */
export declare const useQueue: () => PQueue;
/**
 * Creates a new API client instance.
 *
 * @param {string} host
 * @returns Zilliqa
 */
export declare const useClient: (host: string) => Client;
