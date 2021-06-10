"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClient = exports.useQueue = exports.useLogger = exports.useDatabase = void 0;
const p_queue_1 = __importDefault(require("p-queue"));
const web3_1 = __importDefault(require("web3"));
const database_1 = require("./database");
const logger_1 = require("./logger");
/**
 * Creates a new database instance.
 *
 * @param {*} flags
 * @param {*} logger
 * @returns {Database}
 */
const useDatabase = (flags, logger) => new database_1.Database(flags, logger);
exports.useDatabase = useDatabase;
/**
 * Creates a new logger instance.
 *
 * @returns {Logger}
 */
const useLogger = () => new logger_1.Logger();
exports.useLogger = useLogger;
/**
 * Creates a new queue instance.
 *
 * @returns {PQueue}
 */
const useQueue = () => {
	const queue = new p_queue_1.default({ autoStart: false, concurrency: 10 });
	// queue.on("active", () => logger.debug(`Size: ${queue.size}  Pending: ${queue.pending}`));
	// queue.on("idle", () => logger.debug(`Queue is idle. Size: ${queue.size} | Pending: ${queue.pending}`));
	// queue.on("add", () => logger.debug(`Task is added. Size: ${queue.size} | Pending: ${queue.pending}`));
	// queue.on("next", () => logger.debug(`Task is completed. Size: ${queue.size} | Pending: ${queue.pending}`));
	return queue;
};
exports.useQueue = useQueue;
/**
 * Creates a new API client instance.
 *
 * @param {string} rpc
 * @param {string} wss
 * @returns {{ rpc: Web3; wss: Web3 }}
 */
const useClient = (rpc, wss) => ({
	wss: new web3_1.default(new web3_1.default.providers.WebsocketProvider(wss)),
	rpc: new web3_1.default(rpc),
});
exports.useClient = useClient;
//# sourceMappingURL=helpers.js.map
