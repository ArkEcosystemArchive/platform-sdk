import { Services } from "@arkecosystem/platform-sdk";
export declare class FeeService extends Services.AbstractFeeService {
	#private;
	protected readonly bigNumberService: Services.BigNumberService;
	all(): Promise<Services.TransactionFees>;
}
