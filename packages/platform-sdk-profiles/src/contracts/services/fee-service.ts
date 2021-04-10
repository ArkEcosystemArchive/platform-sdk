import { Contracts } from "@arkecosystem/platform-sdk";

export interface IFeeService {
	all(coin: string, network: string): Contracts.TransactionFees;
	findByType(coin: string, network: string, type: string): Contracts.TransactionFee;
	sync(coin: string, network: string): Promise<void>;
	syncAll(): Promise<void>;
}
