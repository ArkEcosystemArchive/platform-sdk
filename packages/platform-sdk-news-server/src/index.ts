import Hapi from "@hapi/hapi";
import Joi from "joi";

import { useDatabase, useLogger } from "./helpers";

const PAGE_SIZE = 15;

export const subscribe = async (flags: {
	host: string;
	port: string;
	duration: string;
	whitelist: string;
	blacklist: string;
}): Promise<void> => {
	const logger = useLogger();
	const database = useDatabase();

	const server = Hapi.server({
		host: flags.host || "0.0.0.0",
		port: flags.port || 3000,
	});

	server.route({
		method: "GET",
		path: "/signals",
		options: {
			validate: {
				query: Joi.object({
					coins: Joi.string().max(256).required(),
					query: Joi.string().max(32),
					categories: Joi.string().max(256),
					page: Joi.number().optional().min(1).default(1),
				}).options({ stripUnknown: true }),
			},
		},
		async handler(request) {
			const coins = await database.coin.findMany({
				where: {
					symbol: {
						in: request.query.coins.toUpperCase().split(","),
					},
				},
			});

			const query: any = {
				where: {
					team: {
						coin_id: {
							in: coins.map(({ id }) => id),
						},
					},
				},
				orderBy: {
					date_created: "desc",
				},
				skip: (request.query.page - 1) * PAGE_SIZE,
				take: PAGE_SIZE,
			};

			if (request.query.query) {
				query.where.text = {
					contains: request.query.query,
				};
			}

			if (request.query.categories) {
				const categories = request.query.categories.split(",");

				if (categories.length === 1) {
					query.where.category = {
						path: ["description"],
						string_contains: categories[0],
					};
				} else {
					query.where.OR = [];

					for (const category of categories) {
						query.where.OR.push({
							category: {
								path: ["description"],
								string_contains: category,
							},
						});
					}
				}
			}

			return {
				data: (await database.signal.findMany(query)).map((signal: any) => ({
					id: signal.id,
					text: signal.rich_text.text,
					links: signal.rich_text.textItems
						.filter(({ textType }) => textType === "URL")
						.map(({ token }) => token),
					category: signal.category.description,
					author: {
						title: signal.attributed_author.title,
						name: signal.attributed_author.user.displayName,
						team: signal.attributed_author.signalTeam.name,
						coin: signal.attributed_author.signalTeam.coin.symbol,
					},
					is_featured: signal.is_featured,
					created_at: signal.date_created,
					updated_at: signal.date_updated,
				})),
			};
		},
	});

	server.route({
		method: "GET",
		path: "/{coin}",
		options: {
			validate: {
				params: Joi.object({
					coin: Joi.string(),
				}).options({ stripUnknown: true }),
				query: Joi.object({
					page: Joi.number().optional().min(1).default(1),
				}).options({ stripUnknown: true }),
			},
		},
		async handler(request) {
			const coin: any | null = await database.coin.findFirst({
				where: { symbol: request.params.coin.toUpperCase() },
			});

			if (!coin) {
				throw new Error("Failed to retrieve coin.");
			}

			const { data, name, symbol } = coin;

			return {
				data: {
					name: name,
					symbol: symbol,
					supply: {
						total: data.totalSupply,
						circulating: data.circulatingSupply,
					},
					volume: data.volume24hr,
					marketCap: data.marketCapExc,
					rank: data.rank,
					followers: data.followerCount,
				},
			};
		},
	});

	await server.start();

	logger.info(`Server running on ${server.info.uri}`);
};
