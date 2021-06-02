Object.defineProperty(exports, "__esModule", { value: true });

const { Decimal } = require("./runtime/index-browser");

const Prisma = {};

exports.Prisma = Prisma;

/**
 * Prisma Client JS version: 2.24.0
 * Query Engine version: f3e341280d96d0abc068f97e959ddf01f321a858
 */
Prisma.prismaVersion = {
	client: "2.24.0",
	engine: "f3e341280d96d0abc068f97e959ddf01f321a858",
};

Prisma.PrismaClientKnownRequestError = () => {
	throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.PrismaClientUnknownRequestError = () => {
	throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.PrismaClientRustPanicError = () => {
	throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.PrismaClientInitializationError = () => {
	throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.PrismaClientValidationError = () => {
	throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.Decimal = Decimal;

/**
 * Re-export of sql-template-tag
 */

Prisma.sql = () => {
	throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.empty = () => {
	throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.join = () => {
	throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.raw = () => {
	throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.validator = () => (val) => val;

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) {
	return x;
}

exports.Prisma.CoinScalarFieldEnum = makeEnum({
	id: "id",
	uuid: "uuid",
	name: "name",
	symbol: "symbol",
	alias: "alias",
	data: "data",
});

exports.Prisma.TeamScalarFieldEnum = makeEnum({
	id: "id",
	coin_id: "coin_id",
	uuid: "uuid",
	name: "name",
	slug: "slug",
	symbol: "symbol",
	data: "data",
});

exports.Prisma.SignalScalarFieldEnum = makeEnum({
	id: "id",
	team_id: "team_id",
	uuid: "uuid",
	text: "text",
	rich_text: "rich_text",
	date_active: "date_active",
	date_created: "date_created",
	date_updated: "date_updated",
	attributed_author: "attributed_author",
	category: "category",
	is_featured: "is_featured",
	data: "data",
});

exports.Prisma.SortOrder = makeEnum({
	asc: "asc",
	desc: "desc",
});

exports.Prisma.QueryMode = makeEnum({
	default: "default",
	insensitive: "insensitive",
});

exports.Prisma.ModelName = makeEnum({
	Coin: "Coin",
	Team: "Team",
	Signal: "Signal",
});

/**
 * Create the Client
 */
class PrismaClient {
	constructor() {
		throw new Error(
			`PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
		);
	}
}
exports.PrismaClient = PrismaClient;

Object.assign(exports, Prisma);
