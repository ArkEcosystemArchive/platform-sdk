/// <reference types="node" />
import { WalletData } from "../contracts";
export interface LedgerOptions {
	transport: LedgerTransport;
}
export declare type LedgerTransport = any;
export declare type LedgerWalletList = Record<string, WalletData>;
export interface LedgerService {
	connect(transport: LedgerTransport): Promise<void>;
	disconnect(): Promise<void>;
	getVersion(): Promise<string>;
	getPublicKey(path: string): Promise<string>;
	getExtendedPublicKey(path: string): Promise<string>;
	signTransaction(path: string, payload: Buffer): Promise<string>;
	signMessage(path: string, payload: Buffer): Promise<string>;
	scan(options?: { useLegacy: boolean; startPath?: string }): Promise<Record<string, WalletData>>;
}
