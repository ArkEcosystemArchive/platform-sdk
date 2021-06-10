"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValue = void 0;
const cardano_serialization_lib_nodejs_1 = require("@emurgo/cardano-serialization-lib-nodejs");
const createValue = (value) =>
	cardano_serialization_lib_nodejs_1.Value.new(cardano_serialization_lib_nodejs_1.BigNum.from_str(value));
exports.createValue = createValue;
//# sourceMappingURL=transaction.helpers.js.map
