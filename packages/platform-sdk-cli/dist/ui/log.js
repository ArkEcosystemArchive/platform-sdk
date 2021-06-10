"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logWarning = exports.logInfo = exports.logError = exports.logDebug = void 0;
const logger = console;
const logDebug = (message) => logger.debug(message);
exports.logDebug = logDebug;
const logError = (message) => logger.error(message);
exports.logError = logError;
const logInfo = (message) => logger.info(message);
exports.logInfo = logInfo;
const logWarning = (message) => logger.warn(message);
exports.logWarning = logWarning;
//# sourceMappingURL=log.js.map
