"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLogger = exports.useDatabase = void 0;
const generated_1 = require("../prisma/generated");
const useDatabase = () =>
	new generated_1.PrismaClient({
		log: ["info", "warn", "error"],
	});
exports.useDatabase = useDatabase;
const useLogger = () => console;
exports.useLogger = useLogger;
//# sourceMappingURL=helpers.js.map
