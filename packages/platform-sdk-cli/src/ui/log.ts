const logger: Console = console;

export const logDebug = (message: string): void => logger.debug(message);

export const logError = (message: string): void => logger.error(message);

export const logInfo = (message: string): void => logger.info(message);

export const logWarning = (message: string): void => logger.warn(message);
