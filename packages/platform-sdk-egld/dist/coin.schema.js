"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const platform_sdk_support_1 = require("@arkecosystem/platform-sdk-support");
exports.schema = platform_sdk_support_1.ValidatorSchema.object({
	network: platform_sdk_support_1.ValidatorSchema.string().valid("egld.mainnet", "egld.testnet"),
	httpClient: platform_sdk_support_1.ValidatorSchema.object(),
});
//# sourceMappingURL=coin.schema.js.map
