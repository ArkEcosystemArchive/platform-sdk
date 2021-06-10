/// <reference types="node" />
import { Services } from "@arkecosystem/platform-sdk";
export declare class LedgerService extends Services.AbstractLedgerService {
	#private;
	private readonly configRepository;
	private readonly clientService;
	connect(transport: Services.LedgerTransport): Promise<void>;
	disconnect(): Promise<void>;
	getVersion(): Promise<string>;
	getPublicKey(path: string): Promise<string>;
	signTransaction(path: string, payload: Buffer): Promise<string>;
	signMessage(path: string, payload: Buffer): Promise<string>;
	scan(options?: { useLegacy: boolean; startPath?: string }): Promise<Services.LedgerWalletList>;
}
