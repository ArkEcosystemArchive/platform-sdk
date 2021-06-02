import { Prisma, PrismaClient } from "../prisma/generated";
import { Logger } from "./logger";
import { Flags } from "./types";

/**
 * Implements a database storage with SQLite.
 *
 * @export
 * @class Database
 */
export class Database {
	readonly #prisma: PrismaClient;

	/**
	 * The logger instance.
	 *
	 * @type {Logger}
	 * @memberof Database
	 */
	readonly #logger: Logger;

	/**
	 * Creates an instance of Database.
	 *
	 * @param {Flags} flags
	 * @param {Logger} logger
	 * @memberof Database
	 */
	public constructor(flags: Flags, logger: Logger) {
		this.#prisma = new PrismaClient({
			log: ["info", "warn", "error"],
		});

		this.#logger = logger;
	}

	public async storeCoin({ alias, symbol, coin }): Promise<any> {
		const data = {
			uuid: coin.id,
			name: coin.name,
			symbol,
			alias,
			data: coin,
		};

		return this.#prisma.coin.upsert({
			where: {
				uuid: coin.id,
			},
			update: data,
			create: data,
		});
	}

	public async storeTeam({ coin, symbol, team }): Promise<any> {
		const data = {
			coin_id: coin.id,
			uuid: team.id,
			name: team.name,
			slug: team.slug,
			symbol,
			data: team,
		};

		return this.#prisma.team.upsert({
			where: {
				uuid: team.id,
			},
			update: data,
			create: data,
		});
	}

	public async storeSignal({ team, signal }): Promise<any> {
		const data = {
			team_id: team.id,
			uuid: signal.id,
			text: signal.text,
			rich_text: signal.richText,
			date_active: new Date(signal.dateActive),
			date_created: new Date(signal.dateCreated),
			date_updated: new Date(signal.dateUpdated),
			attributed_author: signal.attributedAuthor,
			category: signal.category,
			is_featured: signal.featured,
			data: signal,
		};

		return this.#prisma.signal.upsert({
			where: {
				uuid: signal.id,
			},
			update: data,
			create: data,
		});
	}
}
