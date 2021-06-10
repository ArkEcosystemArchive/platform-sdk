"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribe = void 0;
const hapi_1 = __importDefault(require("@hapi/hapi"));
const joi_1 = __importDefault(require("joi"));
const helpers_1 = require("./helpers");
const PAGE_SIZE = 15;
const subscribe = async (flags) => {
	const logger = helpers_1.useLogger();
	const database = helpers_1.useDatabase();
	const server = hapi_1.default.server({
		host: flags.host || "0.0.0.0",
		port: flags.port || 3000,
	});
	server.route({
		method: "GET",
		path: "/signals",
		options: {
			validate: {
				query: joi_1.default
					.object({
						coins: joi_1.default.string().max(256).required(),
						query: joi_1.default.string().max(32),
						categories: joi_1.default.string().max(256),
						page: joi_1.default.number().optional().min(1).default(1),
					})
					.options({ stripUnknown: true }),
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
			const query = {
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
				data: (await database.signal.findMany(query)).map((signal) => ({
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
				params: joi_1.default
					.object({
						coin: joi_1.default.string(),
					})
					.options({ stripUnknown: true }),
				query: joi_1.default
					.object({
						page: joi_1.default.number().optional().min(1).default(1),
					})
					.options({ stripUnknown: true }),
			},
		},
		async handler(request) {
			const coin = await database.coin.findFirst({
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
exports.subscribe = subscribe;
//# sourceMappingURL=index.js.map
