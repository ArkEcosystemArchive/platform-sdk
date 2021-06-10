import { Services } from "@arkecosystem/platform-sdk";
export declare class FeeService extends Services.AbstractFeeService {
	all(): Promise<Services.TransactionFees>;
}
