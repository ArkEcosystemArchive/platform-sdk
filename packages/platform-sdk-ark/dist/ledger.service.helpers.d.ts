import { LedgerDerivationScheme } from "./ledger.service.types";
export declare const chunk: <T>(value: T[], size: number) => T[][];
export declare const formatLedgerDerivationPath: (scheme: LedgerDerivationScheme) => string;
export declare const createRange: (start: number, size: number) => number[];
