"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClient = exports.deriveKey = void 0;
const terra_js_1 = require("@terra-money/terra.js");
const deriveKey = (mnemonic) => new terra_js_1.MnemonicKey({ mnemonic });
exports.deriveKey = deriveKey;
const useClient = (URL, chainID) => new terra_js_1.LCDClient({ URL, chainID });
exports.useClient = useClient;
//# sourceMappingURL=helpers.js.map
