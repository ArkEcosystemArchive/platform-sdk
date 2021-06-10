"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClient = exports.useLogger = exports.useDatabase = void 0;
const client_1 = require("./client");
const database_1 = require("./database");
const logger_1 = require("./logger");
/**
 * Creates a new database instance.
 *
 * @param {Flags} flags
 * @param {Logger} logger
 * @returns {Database}
 */
const useDatabase = () => new database_1.Database();
exports.useDatabase = useDatabase;
/**
 * Creates a new logger instance.
 *
 * @returns {Logger}
 */
const useLogger = () => new logger_1.Logger();
exports.useLogger = useLogger;
/**
 * Creates a new API client instance.
 *
 * @param {Flags} flags
 * @param {Logger} logger
 * @param {Database} database
 * @returns {Client}
 */
const useClient = (flags) => new client_1.Client(flags);
exports.useClient = useClient;
//# sourceMappingURL=helpers.js.map
