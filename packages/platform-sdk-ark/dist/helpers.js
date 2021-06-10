"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyCryptoConfiguration = void 0;
const crypto_1 = require("@arkecosystem/crypto");
const applyCryptoConfiguration = ({ crypto, height }) => {
	crypto_1.Managers.configManager.setConfig(crypto);
	crypto_1.Managers.configManager.setHeight(height);
};
exports.applyCryptoConfiguration = applyCryptoConfiguration;
//# sourceMappingURL=helpers.js.map
