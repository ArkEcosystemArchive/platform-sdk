"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeTransaction = exports.makeAccount = void 0;
const elrond_core_js_1 = require("@elrondnetwork/elrond-core-js");
const makeAccount = () => new elrond_core_js_1.account();
exports.makeAccount = makeAccount;
const makeTransaction = (data) => new elrond_core_js_1.transaction(data);
exports.makeTransaction = makeTransaction;
//# sourceMappingURL=helpers.js.map
