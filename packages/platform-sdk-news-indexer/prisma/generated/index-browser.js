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

exports.Prisma.BlockScalarFieldEnum = makeEnum({
	height: "height",
	hash: "hash",
});

exports.Prisma.TransactionScalarFieldEnum = makeEnum({
	hash: "hash",
	block_id: "block_id",
	time: "time",
	amount: "amount",
	fee: "fee",
});

exports.Prisma.TransactionPartScalarFieldEnum = makeEnum({
	output_hash: "output_hash",
	output_idx: "output_idx",
	input_hash: "input_hash",
	input_idx: "input_idx",
	amount: "amount",
	address: "address",
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
	Block: "Block",
	Transaction: "Transaction",
	TransactionPart: "TransactionPart",
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
