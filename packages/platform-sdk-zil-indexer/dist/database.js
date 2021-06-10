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
	 * @param {Logger} logger
	 * @memberof Database
	 */
	constructor(flags, logger) {
		_Database_instances.add(this);
		_Database_database.set(this, void 0);
		_Database_logger.set(this, void 0);
		const databaseFile =
			flags.database || `${env_paths_1.default(require("../package.json").name).data}/zil/${flags.network}.db`;
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
			return 0;
		}
		return lastBlock.number;
	}
	/**
	 * Stores a block and all of its transactions.
	 *
	 * @param TxBlockObj block
	 * @param TransactionObj[] block
	 * @memberof Database
	 */
	storeBlockWithTransactions(block, transactions) {
		const hash = block.body.BlockHash;
		const number = block.header.BlockNum;
		__classPrivateFieldGet(this, _Database_logger, "f").info(
			`Storing block #${number} [${hash}] with ${transactions.length} transaction(s)`,
		);
		__classPrivateFieldGet(this, _Database_instances, "m", _Database_storeBlock).call(this, { hash, number });
		for (const transaction of transactions) {
			__classPrivateFieldGet(this, _Database_logger, "f").info(`Storing transaction [${transaction.ID}]`);
			__classPrivateFieldGet(this, _Database_instances, "m", _Database_storeTransaction).call(this, transaction);
		}
	}
}
exports.Database = Database;
(_Database_database = new WeakMap()),
	(_Database_logger = new WeakMap()),
	(_Database_instances = new WeakSet()),
	(_Database_storeBlock = function _Database_storeBlock(block) {
		__classPrivateFieldGet(this, _Database_database, "f")
			.prepare(`INSERT OR IGNORE INTO blocks (hash, number) VALUES (:hash, :number)`)
			.run(block);
	}),
	(_Database_storeTransaction = function _Database_storeTransaction(transaction) {
		__classPrivateFieldGet(this, _Database_database, "f")
			.prepare(
				`INSERT OR IGNORE INTO transactions (hash, sender, recipient, amount, gas, gasLimit, gasPrice, nonce) VALUES (:hash, :sender, :recipient, :amount, :gas, :gasLimit, :gasPrice, :nonce)`,
			)
			.run({
				hash: transaction.ID,
				sender: transaction.senderPubKey,
				recipient: transaction.toAddr,
				amount: transaction.amount,
				gas: transaction.receipt.cumulative_gas,
				gasLimit: transaction.gasLimit,
				gasPrice: transaction.gasPrice,
				nonce: transaction.nonce,
			});
	}),
	(_Database_migrate = function _Database_migrate() {
		__classPrivateFieldGet(this, _Database_database, "f").exec(`
			PRAGMA journal_mode = WAL;

			CREATE TABLE IF NOT EXISTS blocks(
				hash     VARCHAR(64)   PRIMARY KEY,
				number   INTEGER       NOT NULL
			);

			CREATE UNIQUE INDEX IF NOT EXISTS blocks_hash ON blocks (hash);
			CREATE UNIQUE INDEX IF NOT EXISTS blocks_number ON blocks (number);

			CREATE TABLE IF NOT EXISTS transactions(
				hash        VARCHAR(64)   PRIMARY KEY,
				sender      VARCHAR(68)   NOT NULL,
				recipient   VARCHAR(40)   NOT NULL,
				amount      INTEGER       NOT NULL,
				gas         INTEGER       NOT NULL,
				gasLimit    INTEGER       NOT NULL,
				gasPrice    INTEGER       NOT NULL,
				nonce       INTEGER       NOT NULL
			);

			CREATE UNIQUE INDEX IF NOT EXISTS transactions_hash ON transactions (hash);
			CREATE INDEX IF NOT EXISTS transactions_sender ON transactions (sender);
			CREATE INDEX IF NOT EXISTS transactions_recipient ON transactions (recipient);
		`);
	});
//# sourceMappingURL=database.js.map
