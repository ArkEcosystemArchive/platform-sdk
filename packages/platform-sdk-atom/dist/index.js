"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ATOM = void 0;
const manifest_1 = require("./manifest");
const coin_schema_1 = require("./coin.schema");
const coin_provider_1 = require("./coin.provider");
const coin_dtos_1 = require("./coin.dtos");
exports.ATOM = {
	dataTransferObjects: coin_dtos_1.DataTransferObjects,
	// @TODO: consistent casing to avoid alias
	manifest: manifest_1.manifest,
	schema: coin_schema_1.schema,
	ServiceProvider: coin_provider_1.ServiceProvider,
};
//# sourceMappingURL=index.js.map
