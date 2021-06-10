"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClient = exports.useLogger = exports.useDatabase = void 0;
const platform_sdk_http_got_1 = require("@arkecosystem/platform-sdk-http-got");
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const env_paths_1 = __importDefault(require("env-paths"));
const useDatabase = (flags) =>
	better_sqlite3_1.default(
		flags.database ||
			`${env_paths_1.default("@arkecosystem/platform-sdk-btc-indexer").data}/${flags.coin}/${flags.network}.db`,
	);
exports.useDatabase = useDatabase;
const useLogger = () => console;
exports.useLogger = useLogger;
const useClient = (host) => new platform_sdk_http_got_1.Request().baseUrl(host);
exports.useClient = useClient;
//# sourceMappingURL=helpers.js.map
