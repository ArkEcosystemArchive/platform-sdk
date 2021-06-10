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
var _Storage_table, _Storage_database;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const fs_extra_1 = require("fs-extra");
class Storage {
	constructor() {
		_Storage_table.set(this, "transactions");
		_Storage_database.set(this, void 0);
	}
	connect(file) {
		fs_extra_1.ensureFileSync(file);
		__classPrivateFieldSet(this, _Storage_database, new better_sqlite3_1.default(file), "f");
		__classPrivateFieldGet(this, _Storage_database, "f").exec(`
      PRAGMA journal_mode=WAL;
      CREATE TABLE IF NOT EXISTS ${__classPrivateFieldGet(this, _Storage_table, "f")} (
        "id" VARCHAR(64) PRIMARY KEY,
        "json" BLOB NOT NULL
      );
    `);
	}
	disconnect() {
		__classPrivateFieldGet(this, _Storage_database, "f").close();
		__classPrivateFieldSet(this, _Storage_database, undefined, "f");
	}
	bulkAdd(data) {
		if (data.length === 0) {
			return;
		}
		const insertStatement = __classPrivateFieldGet(this, _Storage_database, "f").prepare(
			`INSERT INTO ${__classPrivateFieldGet(this, _Storage_table, "f")} ` +
				"(id, json) VALUES " +
				"(:id, :json);",
		);
		try {
			__classPrivateFieldGet(this, _Storage_database, "f").prepare("BEGIN;").run();
			for (const transaction of data) {
				insertStatement.run({ id: transaction.id, json: JSON.stringify(transaction) });
			}
			__classPrivateFieldGet(this, _Storage_database, "f").prepare("COMMIT;").run();
		} finally {
			if (__classPrivateFieldGet(this, _Storage_database, "f").inTransaction) {
				__classPrivateFieldGet(this, _Storage_database, "f").prepare("ROLLBACK;").run();
			}
		}
	}
	bulkRemoveById(ids) {
		if (ids.length === 0) {
			return;
		}
		const deleteStatement = __classPrivateFieldGet(this, _Storage_database, "f").prepare(
			`DELETE FROM ${__classPrivateFieldGet(this, _Storage_table, "f")} WHERE id = :id;`,
		);
		__classPrivateFieldGet(this, _Storage_database, "f").prepare("BEGIN;").run();
		for (const id of ids) {
			deleteStatement.run({ id });
		}
		__classPrivateFieldGet(this, _Storage_database, "f").prepare("COMMIT;").run();
	}
	loadAll() {
		const rows = __classPrivateFieldGet(this, _Storage_database, "f")
			.prepare(`SELECT id, json FROM ${__classPrivateFieldGet(this, _Storage_table, "f")};`)
			.all();
		const transactions = [];
		const invalidIds = [];
		for (const row of rows) {
			try {
				const transaction = JSON.parse(row.json);
				transactions.push(transaction);
			} catch {
				invalidIds.push(row.id);
			}
		}
		this.bulkRemoveById(invalidIds);
		return transactions;
	}
	deleteAll() {
		__classPrivateFieldGet(this, _Storage_database, "f").exec(
			`DELETE FROM ${__classPrivateFieldGet(this, _Storage_table, "f")};`,
		);
	}
}
exports.Storage = Storage;
(_Storage_table = new WeakMap()), (_Storage_database = new WeakMap());
//# sourceMappingURL=database.js.map
