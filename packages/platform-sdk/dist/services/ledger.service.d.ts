/// <reference types="node" />
import { LedgerService, LedgerTransport, LedgerWalletList } from "./ledger.contract";
export declare class AbstractLedgerService implements LedgerService {
	__destruct(): Promise<void>;
	connect(transport: LedgerTransport): Promise<void>;
	disconnect(): Promise<void>;
	getVersion(): Promise<string>;
	getPublicKey(path: string): Promise<string>;
	getExtendedPublicKey(path: string): Promise<string>;
	signTransaction(path: string, payload: Buffer): Promise<string>;
	signMessage(path: string, payload: Buffer): Promise<string>;
	scan(options?: { useLegacy: boolean }): Promise<LedgerWalletList>;
}
