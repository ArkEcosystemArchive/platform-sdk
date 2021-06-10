"use strict";
var __classPrivateFieldSet =
	(this && this.__classPrivateFieldSet) ||
	function (receiver, state, value, kind, f) {
		if (kind === "m") throw new TypeError("Private method is not writable");
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot write private member to an object whose class did not declare it");
		return kind === "a" ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value;
	};
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
var _Database_instances,
	_Database_database,
	_Database_logger,
	_Database_storeBlock,
	_Database_storeTransaction,
	_Database_migrate;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const env_paths_1 = __importDefault(require("env-paths"));
const fs_extra_1 = require("fs-extra");
/**
 * Implements a database storage with SQLite.
 *
 * @export
 * @class Database
 */
class Database {
	/**
	 * Creates an instance of Database.
	 *
	 * @param {Record<string, string>} flags
	 * @param {pino.Logger} logger
	 * @memberof Database
	 */
	constructor(flags, logger) {
		_Database_instances.add(this);
		/**
		 * The sqlite storage instance.
		 *
		 * @type {sqlite3.Database}
		 * @memberof Database
		 */
		_Database_database.set(this, void 0);
		/**
		 * The logger instance.
		 *
		 * @type {pino.Logger}
		 * @memberof Database
		 */
		_Database_logger.set(this, void 0);
		const databaseFile =
			flags.database ||
			`${env_paths_1.default(require("../package.json").name).data}/${flags.coin}/${flags.network}.db`;
		fs_extra_1.ensureFileSync(databaseFile);
		logger.debug(`Using [${databaseFile}] as database`);
		__classPrivateFieldSet(this, _Database_database, better_sqlite3_1.default(databaseFile), "f");
		__classPrivateFieldSet(this, _Database_logger, logger, "f");
		__classPrivateFieldGet(this, _Database_instances, "m", _Database_migrate).call(this);
	}
	/**
	 * Returns the height of the last block stored.
	 *
	 * @returns {number}
	 * @memberof Database
	 */
	lastBlockNumber() {
		const lastBlock = __classPrivateFieldGet(this, _Database_database, "f")
			.prepare("SELECT number FROM blocks ORDER BY number DESC LIMIT 1")
			.get();
		if (lastBlock === undefined) {
			return 1;
		}
		return lastBlock.number;
	}
	/**
	 * Stores a block and all of its transactions.
	 *
	 * @param {{ hash: string; transactions: { id: string }[] }} block
	 * @memberof Database
	 */
	storeBlockWithTransactions(block) {
		__classPrivateFieldGet(this, _Database_logger, "f").info(
			`Storing block [${block.hash}] with [${block.transactions.length}] transaction(s)`,
		);
		__classPrivateFieldGet(this, _Database_instances, "m", _Database_storeBlock).call(this, block);
		for (const transaction of block.transactions) {
			__classPrivateFieldGet(this, _Database_logger, "f").info(`Storing transaction [${transaction.id}]`);
			__classPrivateFieldGet(this, _Database_instances, "m", _Database_storeTransaction).call(
				this,
				block,
				transaction,
			);
		}
	}
}
exports.Database = Database;
(_Database_database = new WeakMap()),
	(_Database_logger = new WeakMap()),
	(_Database_instances = new WeakSet()),
	(_Database_storeBlock = function _Database_storeBlock(block) {
		__classPrivateFieldGet(this, _Database_database, "f")
			.prepare(
				`INSERT OR IGNORE INTO blocks (
					id,
					digest,
					extrinsicsRoot,
					number,
					parentHash,
					stateRoot
				) VALUES (
					:id,
					:digest,
					:extrinsicsRoot,
					:number,
					:parentHash,
					:stateRoot
				 )`,
			)
			.run({
				id: block.id,
				digest: JSON.stringify(block.digest),
				extrinsicsRoot: block.extrinsicsRoot,
				number: block.number,
				parentHash: block.parentHash,
				stateRoot: block.stateRoot,
			});
	}),
	(_Database_storeTransaction = function _Database_storeTransaction(block, transaction) {
		var _a, _b;
		__classPrivateFieldGet(this, _Database_database, "f")
			.prepare(
				`INSERT INTO transactions (
					id,
					eraPeriod,
					eraPhase,
					isSigned,
					"method",
					blockNumber
				) VALUES (
					:id,
					:eraPeriod,
					:eraPhase,
					:isSigned,
					:method,
					:blockNumber
				)`,
			)
			.run({
				id: transaction.id,
				eraPeriod: (_a = transaction.era) === null || _a === void 0 ? void 0 : _a.period,
				eraPhase: (_b = transaction.era) === null || _b === void 0 ? void 0 : _b.phase,
				isSigned: transaction.isSigned ? 1 : 0,
				method: JSON.stringify(transaction.method),
				blockNumber: block.number,
			});
	}),
	(_Database_migrate = function _Database_migrate() {
		__classPrivateFieldGet(this, _Database_database, "f").exec(`
			PRAGMA journal_mode = WAL;

			CREATE TABLE IF NOT EXISTS blocks(
				id                 VARCHAR(66)   PRIMARY KEY,
				digest             TEXT          NOT NULL,
				extrinsicsRoot     VARCHAR(66)   NOT NULL,
				number             INTEGER       NOT NULL,
				parentHash         VARCHAR(66)   NOT NULL,
				stateRoot          VARCHAR(66)   NOT NULL
			);

			CREATE UNIQUE INDEX IF NOT EXISTS blocks_hash ON blocks (parentHash);

			CREATE TABLE IF NOT EXISTS transactions(
				id                 VARCHAR(66)   PRIMARY KEY,
				eraPeriod          VARCHAR(255),
				eraPhase           VARCHAR(255),
				isSigned           BOOLEAN       NOT NULL,
				"method"           TEXT,
				blockNumber        INTEGER       NOT NULL
			);

			CREATE INDEX IF NOT EXISTS transactions_block_number ON transactions (blockNumber);
		`);
	});
//# sourceMappingURL=database.js.map
