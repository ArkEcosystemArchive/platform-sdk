"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveLegacyAccount = exports.deriveAccount = void 0;
const nanocurrency_web_1 = require("nanocurrency-web");
const deriveAccount = (mnemonic, accountIndex = 0) =>
	nanocurrency_web_1.wallet.fromMnemonic(mnemonic).accounts[accountIndex];
exports.deriveAccount = deriveAccount;
const deriveLegacyAccount = (mnemonic, accountIndex = 0) =>
	nanocurrency_web_1.wallet.fromLegacyMnemonic(mnemonic).accounts[accountIndex];
exports.deriveLegacyAccount = deriveLegacyAccount;
//# sourceMappingURL=helpers.js.map
