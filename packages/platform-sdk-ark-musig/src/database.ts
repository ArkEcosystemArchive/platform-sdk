import BetterSqlite3 from "better-sqlite3";
import { ensureFileSync } from "fs-extra";

import { IStoreTransaction } from "./contracts";

export class Storage {
	readonly #table: string = "transactions";
	#database: BetterSqlite3.Database;

	public connect(file: string) {
		ensureFileSync(file);

		this.#database = new BetterSqlite3(file);

		this.#database.exec(`
      PRAGMA journal_mode=WAL;
      CREATE TABLE IF NOT EXISTS ${this.#table} (
        "id" VARCHAR(64) PRIMARY KEY,
        "json" BLOB NOT NULL
      );
    `);
	}

	public disconnect(): void {
		this.#database.close();
		this.#database = undefined;
	}

	public bulkAdd(data: IStoreTransaction[]): void {
		if (data.length === 0) {
			return;
		}

		const insertStatement: BetterSqlite3.Statement = this.#database.prepare(
			`INSERT INTO ${this.#table} ` + "(id, json) VALUES " + "(:id, :json);",
		);

		try {
			this.#database.prepare("BEGIN;").run();

			for (const transaction of data) {
				insertStatement.run({ id: transaction.id, json: JSON.stringify(transaction) });
			}

			this.#database.prepare("COMMIT;").run();
		} finally {
			if (this.#database.inTransaction) {
				this.#database.prepare("ROLLBACK;").run();
			}
		}
	}

	public bulkRemoveById(ids: string[]): void {
		if (ids.length === 0) {
			return;
		}

		const deleteStatement: BetterSqlite3.Statement = this.#database.prepare(
			`DELETE FROM ${this.#table} WHERE id = :id;`,
		);

		this.#database.prepare("BEGIN;").run();

		for (const id of ids) {
			deleteStatement.run({ id });
		}

		this.#database.prepare("COMMIT;").run();
	}

	public loadAll(): IStoreTransaction[] {
		const rows: Array<{ id: string; json: string }> = this.#database
			.prepare(`SELECT id, json FROM ${this.#table};`)
			.all();

		const transactions: IStoreTransaction[] = [];

		const invalidIds: string[] = [];
		for (const row of rows) {
			try {
				const transaction: IStoreTransaction = JSON.parse(row.json);

				transactions.push(transaction);
			} catch {
				invalidIds.push(row.id);
			}
		}

		this.bulkRemoveById(invalidIds);

		return transactions;
	}

	public deleteAll(): void {
		this.#database.exec(`DELETE FROM ${this.#table};`);
	}
}
