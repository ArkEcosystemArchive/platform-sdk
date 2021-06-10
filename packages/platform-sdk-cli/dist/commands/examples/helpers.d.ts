import { Contracts, Environment } from "@arkecosystem/platform-sdk-profiles";
export declare const useLogger: () => Console;
export declare function createProfile(env: Environment, name: string, password: string): Promise<Contracts.IProfile>;
export declare function pollTransactionStatus(
	transactionId: string,
	wallet1: Contracts.IReadWriteWallet,
): Promise<void>;
