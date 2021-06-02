import { PrismaClient } from "../prisma/generated";

export class Database {
	readonly #prisma: PrismaClient;

	public constructor() {
		this.#prisma = new PrismaClient({
			log: ["info", "warn", "error"],
		});
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
