/// <reference types="node" />
import { Services } from "@arkecosystem/platform-sdk";
export declare class LedgerService extends Services.AbstractLedgerService {
	#private;
	connect(transport: Services.LedgerTransport): Promise<void>;
	disconnect(): Promise<void>;
	getVersion(): Promise<string>;
	getPublicKey(path: string): Promise<string>;
	signTransaction(path: string, payload: Buffer): Promise<string>;
}
