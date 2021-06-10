"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const platform_sdk_support_1 = require("@arkecosystem/platform-sdk-support");
exports.schema = platform_sdk_support_1.ValidatorSchema.object({
	// network: ValidatorSchema.string().valid("eth.mainnet", "eth.ropsten", "eth.rinkeby", "eth.goerli", "eth.kovan"),
	network: platform_sdk_support_1.ValidatorSchema.string().valid("eth.mainnet"),
	httpClient: platform_sdk_support_1.ValidatorSchema.object(),
});
//# sourceMappingURL=coin.schema.js.map
