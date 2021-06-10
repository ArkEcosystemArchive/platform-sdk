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
var _Database_prisma;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const generated_1 = require("../prisma/generated");
class Database {
	constructor() {
		_Database_prisma.set(this, void 0);
		__classPrivateFieldSet(
			this,
			_Database_prisma,
			new generated_1.PrismaClient({
				log: ["info", "warn", "error"],
			}),
			"f",
		);
	}
	async storeCoin({ alias, symbol, coin }) {
		const data = {
			uuid: coin.id,
			name: coin.name,
			symbol,
			alias,
			data: coin,
		};
		return __classPrivateFieldGet(this, _Database_prisma, "f").coin.upsert({
			where: {
				uuid: coin.id,
			},
			update: data,
			create: data,
		});
	}
	async storeTeam({ coin, symbol, team }) {
		const data = {
			coin_id: coin.id,
			uuid: team.id,
			name: team.name,
			slug: team.slug,
			symbol,
			data: team,
		};
		return __classPrivateFieldGet(this, _Database_prisma, "f").team.upsert({
			where: {
				uuid: team.id,
			},
			update: data,
			create: data,
		});
	}
	async storeSignal({ team, signal }) {
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
		return __classPrivateFieldGet(this, _Database_prisma, "f").signal.upsert({
			where: {
				uuid: signal.id,
			},
			update: data,
			create: data,
		});
	}
}
exports.Database = Database;
_Database_prisma = new WeakMap();
//# sourceMappingURL=database.js.map
