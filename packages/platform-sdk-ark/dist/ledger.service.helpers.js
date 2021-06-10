"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRange = exports.formatLedgerDerivationPath = exports.chunk = void 0;
const chunk = (value, size) =>
	Array.from({ length: Math.ceil(value.length / size) }, (v, i) => value.slice(i * size, i * size + size));
exports.chunk = chunk;
const formatLedgerDerivationPath = (scheme) =>
	`${scheme.purpose || 44}'/${scheme.coinType}'/${scheme.account || 0}'/${scheme.change || 0}/${scheme.address || 0}`;
exports.formatLedgerDerivationPath = formatLedgerDerivationPath;
const createRange = (start, size) => Array.from({ length: size }, (_, i) => i + size * start);
exports.createRange = createRange;
//# sourceMappingURL=ledger.service.helpers.js.map
